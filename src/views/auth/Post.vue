<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { MainButton, SkeletonCard } from '../../components';

	const router = useRouter();

</script>

<template>
  <div class="w-11/12 max-w-[1000px] shadow justify-center items-center pt-8 overflow-hidden _container">

    <div class="flex flex-col items-center justify-center gap-4">
      <SkeletonCard />
    </div>
  </div>

</template>

<style scoped>
  ._container {
    height: calc(100vh - var(--header-height));
  }
</style>
