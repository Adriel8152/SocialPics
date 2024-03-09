<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { MainButton } from '../../components';

	const router = useRouter();

</script>

<template>
  <div class="w-11/12 max-w-[1000px] shadow justify-center items-center pt-8 overflow-hidden _container">

    <div class="flex flex-col items-center justify-center gap-4">
      <span class="text-gray-500 text-3xl mb-2">Editar publicación</span>
			<input type="file" />
			<div class="w-11/12 max-w-80 min-h-40 animate-pulse bg-slate-400 flex space-x-4 rounded-lg"></div>
			<textarea class="w-11/12 max-w-80 border border-gray-200 rounded-lg" placeholder="Ingrese una descripción"></textarea>
      <MainButton name-color="yellow" class="min-w-80">Confirmar cambios</MainButton>
      <MainButton @click="router.push('/home')" name-color="gray" class="min-w-80">Cancelar</MainButton>
    </div>
  </div>

</template>

<style scoped>
  ._container {
    height: calc(100vh - var(--header-height));
  }
</style>
