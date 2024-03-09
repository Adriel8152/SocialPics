<script setup lang="ts">
  import profileImg from '../../assets/profile-img.png';
  import { useRouter } from 'vue-router';
  import { useToken } from '../../utils/useToken';

	const router = useRouter();

	const { decodeToken } = useToken();

	const userData = decodeToken(window.localStorage.getItem("accessToken") || '');

</script>

<template>
  <div class="w-11/12 max-w-[1000px] shadow justify-center items-center pt-8 overflow-hidden _container">

    <div class="flex flex-col items-center justify-center gap-4">
      <span class="text-gray-500 text-3xl mb-2">Perfil</span>

      <div class="flex flex-row gap-3 items-center justify-center">
        <img class="w-12" v-if="userData.profileImg !== ''" :src="userData.profileImg" />
			  <img class="w-12" v-if="userData.profileImg === ''" :src="profileImg" />
        <span>{{ userData.username }}</span>
      </div>

      <hr />

      <div class="grid grid-cols-3 gap-4 w-full px-8">
				<div class="flex rounded-lg w-auto aspect-square animate-pulse bg-slate-400"></div>
				<div class="flex rounded-lg w-auto aspect-square animate-pulse bg-slate-400"></div>
				<div class="flex rounded-lg w-auto aspect-square animate-pulse bg-slate-400"></div>
			</div>

    </div>
  </div>

</template>

<style scoped>
  ._container {
    height: calc(100vh - var(--header-height));
  }
</style>
