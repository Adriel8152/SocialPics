<script setup lang="ts">
	import instagramLogo from '../../assets/instagram-logo.png';
	import profileImg from '../../assets/profile-img.png'

	import { ref } from 'vue';
	import { useToken } from '../../utils/useToken';
	import { useLogin } from '../../utils/useLogin';
import { useRouter } from 'vue-router';

	const { decodeToken } = useToken();
	const { logout } = useLogin();
	const router = useRouter();

	const userData = decodeToken(window.localStorage.getItem("accessToken") || '');

	const submenuActive = ref(false);
</script>

<template>
	<header class="flex flex-row justify-between items-center border border-gray-300 shadow px-12 py-4 w-full h-[var(--header-height)] fixed top-0 bg-gray-50 z-10">
		<div>
			<span @click="router.push('/home')" class="flex flex-row gap-4 items-center cursor-pointer">
				<img :src="instagramLogo" class="w-8" />
				<span class="text-gray-800 text-xl font-semibold">Social Media</span>
			</span>
		</div>
		<div class="flex items-center gap-2 cursor-pointer relative" @click="submenuActive = !submenuActive">
			<img class="w-8" v-if="userData.profileImg !== ''" :src="userData.profileImg" />
			<img class="w-8" v-if="userData.profileImg === ''" :src="profileImg" />
			<span> <i class="bi bi-caret-down-fill"></i> </span>

			<div :style="{ display: submenuActive ? 'flex' : 'none' }" class="absolute top-[100%] right-0 flex-col bg-slate-50 w-40 border shadow-md hidden">
				<span @click="router.push('/profile')" class="px-4 py-2 hover:bg-slate-200">Perfil</span>
				<span @click="logout" class="px-4 py-2 hover:bg-slate-200">Salir</span>
			</div>
		</div>
	</header>
</template>

<style scope>
</style>