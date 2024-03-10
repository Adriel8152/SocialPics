<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { deleteDoc, doc, getDoc } from 'firebase/firestore';
  import { db } from '../../../firebase/firestoreconfig';
  import { useRoute, useRouter } from 'vue-router';
import { useToken } from '../../utils/useToken';
import { SkeletonCard } from '../../components';

  const { decodeToken } = useToken();

  const loadingPostData = ref(true);
  const postData: any = ref({});
  const isViewerOwner = ref(false);

  const route = useRoute();
  const router = useRouter();

  onMounted(async () => {
    postData.value = (await getDoc(doc(db, "posts", `${route.params.id}`))).data();

    const userData = decodeToken(window.localStorage.getItem("accessToken") || '');

    isViewerOwner.value = userData.username === postData.value.username;

    loadingPostData.value = false;
  })

  const handleEdit = () => {
		router.push( {name: 'Edit', params: { id: postData.value.id } } );
	}
  
  const handleDelete = async () => {
    await deleteDoc(doc(db, "posts", `${route.params.id}`));

    router.push( {name: 'Edit', params: { id: postData.value.id } } );
  }
</script>

<template>
  <div class="w-11/12 max-w-[1000px] shadow justify-center items-center pt-8 overflow-hidden _container">

    <div class="flex flex-col items-center justify-center gap-4">
      <SkeletonCard v-if="loadingPostData" />

      <figure v-if="!loadingPostData" class="border border-gray-100 shadow rounded-lg max-w-lg w-full mx-auto overflow-hidden">
        <div class="w-full min-h-40 flex space-x-4 overflow-hidden cursor-pointer">
          <img class="hover:scale-110 transition-all" :src="postData.picture"  />
        </div>
        <figcaption class="flex flex-col p-4 gap-4">
          <div class="grid gap-5 space-x- grid-cols-4">
            <span class="rounded-lg col-span-2">{{ postData.username }}</span>
            <span class="rounded-lg col-span-1 col-start-4 flex justify-end items-center gap-2 cursor-pointer"><i class="bi bi-heart"></i> {{ postData.likes }}</span>
          </div>
          <hr />
          <div class="flex flex-col gap-2">
            <span>{{ postData.description }}</span>
            
            <div class="flex flex-row justify-between items-center">
              <p class="text-gray-500 text-sm font-semibold">{{ new Date(postData.createdAt.seconds * 1000).toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '/') }}</p>
              
              <div v-if="isViewerOwner" class="flex flex-row gap-2">
                <span @click="handleEdit" class="flex justify-center items-center p-1 cursor-pointer hover:bg-slate-100 aspect-square w-8 rounded-lg"><i class="bi bi-pencil-square text-amber-500 text-lg"></i></span>
                <span @click="handleDelete" class="flex justify-center items-center p-1 cursor-pointer hover:bg-slate-100 aspect-square w-8 rounded-lg"><i class="bi bi-trash3 text-rose-500 text-lg"></i></span>
              </div>
            </div>
          </div>
        </figcaption>
      </figure>
    </div>

  </div>

</template>

<style scoped>
  ._container {
    height: calc(100vh - var(--header-height));
  }
</style>
