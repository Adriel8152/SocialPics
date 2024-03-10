<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router';
  import { MainButton, SkeletonCard } from '../../components';
  import { onMounted, ref } from 'vue';
  import { db } from '../../../firebase/firestoreconfig';
  import { doc, getDoc, updateDoc } from 'firebase/firestore';
  import { useToken } from '../../utils/useToken';

  const { decodeToken } = useToken();

  const loadingPostData = ref(true);
  const postData: any = ref({});
  const isViewerOwner = ref(false);

  const description = ref('');

  const route = useRoute();
  const router = useRouter();

  onMounted(async () => {
    postData.value = (await getDoc(doc(db, "posts", `${route.params.id}`))).data();

    const userData = decodeToken(window.localStorage.getItem("accessToken") || '');

    description.value = postData.value.description;

    isViewerOwner.value = userData.username === postData.value.username;

    loadingPostData.value = false;
  })

  const handleUpdate = async () => {
    const docRef = doc(db, "posts", `${route.params.id}`);

    await updateDoc(docRef, {
      description: description.value,
    });

    router.go(-1);
  }
</script>

<template>
  <div class="w-11/12 max-w-[1000px] shadow justify-center items-center pt-8">

    <SkeletonCard v-if="loadingPostData" />

    <div v-if="isViewerOwner && !loadingPostData" class="flex flex-col items-center justify-center gap-4 mb-8">
      <span class="text-gray-500 text-3xl mb-2">Editar publicación</span>
      <img class="w-11/12 max-w-80" :src="postData.picture" alt="Vista previa de la imagen">
			<textarea v-model="description" class="w-11/12 max-w-80 border border-gray-200 rounded-lg p-2" placeholder="Ingrese una descripción"></textarea>
      <MainButton @click="handleUpdate" name-color="coral" class="min-w-80">Editar publicación</MainButton>
      <MainButton @click="router.go(-1)" name-color="gray" class="min-w-80">Cancelar</MainButton>
    </div>
  </div>

  <div v-if="!isViewerOwner && !loadingPostData">
    <span>No tiene permisos para editar esta publicación</span>
  </div>

</template>

<style scoped>
</style>
