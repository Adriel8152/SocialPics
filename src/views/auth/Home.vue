<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { MainButton, PublicationCard, SkeletonCard } from '../../components';

  const router = useRouter();

</script>

<template>
  <div class="w-11/12 max-w-[1000px] shadow justify-center items-center pt-8 overflow-hidden _container">

    <div class="flex flex-col items-center justify-center gap-4">
      <span class="text-gray-500 text-3xl">Publicaciones</span>
      <MainButton @click="router.push('/create')" name-color="coral" class="min-w-80">Agregar publicación</MainButton>
    </div>
    
    <div class="overflow-y-scroll w-full h-full mt-12 pb-48">
      <div class="flex flex-col px-8 m-auto w-full gap-8">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>

  </div>

</template>

<style scoped>
  ._container {
    height: calc(100vh - var(--header-height));
  }
</style>
