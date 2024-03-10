<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { MainButton, PublicationCard, SkeletonCard } from '../../components';
  import { onMounted, ref } from 'vue';
  import { collection, getDocs, query } from 'firebase/firestore';
  import { db } from '../../../firebase/firestoreconfig';

  const router = useRouter();

  const loadingPosts = ref(true);
  const posts: any = ref([]);

  async function getPosts() {
    try {
      // Obtener una referencia a la colección "posts"
      const postsRef = collection(db, "posts");

      // Obtener una consulta de todos los documentos en la colección
      const queryRef = query(postsRef);

      // Obtener los documentos de la consulta
      const querySnapshot = await getDocs(queryRef);

      // Recorrer los documentos y mostrar sus datos
      querySnapshot.forEach((doc) => {
        console.log(doc.id)

        posts.value.push({
          id: doc.id,
          ...doc.data()
        })
      });

    } catch(error) {
      console.log(error);
    } finally {
      loadingPosts.value = false;
    }
  }

  onMounted(() => {
    getPosts();
  })

</script>

<template>
  <div class="w-11/12 max-w-[1000px] shadow justify-center items-center overflow-hidden _container">

    <div class="flex flex-col items-center justify-center my-4 gap-4">
      <span class="text-gray-500 text-3xl">Publicaciones</span>
      <MainButton @click="router.push('/create')" name-color="coral" class="min-w-80">Agregar publicación</MainButton>
    </div>

    <hr />
    
    <div class="overflow-y-scroll w-full h-full pb-48">
      <div v-if="loadingPosts" class="flex flex-col px-8 m-auto w-full gap-8">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
  
      <div class="text-center text-gray-500 font-semibold" v-if="!loadingPosts && posts.length === 0">
        ¡Se el primero en publicar algo!
      </div>
      
      <div v-if="!loadingPosts" class="flex flex-col px-8 m-auto w-full gap-8 mt-8">
        <template v-for="post in posts">
          <PublicationCard :userImg="post.userImg" :postImg="post.picture" :username="post.username" :description="post.description" :likes="0" :seconds="post.createdAt.seconds" :id="post.id" />
        </template>
      </div>
    </div>

  </div>

</template>

<style scoped>
  ._container {
    height: calc(100vh - var(--header-height));
  }
</style>
