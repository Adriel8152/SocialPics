<script setup lang="ts">
	import { ref } from 'vue';
import instagramLogo from '../../assets/instagram-logo.png';
	import profileImg from '../../assets/profile-img.png'
	import { useToken } from '../../utils/useToken';
import { useLogin } from '../../utils/useLogin';

	const { decodeToken } = useToken();
	const { logout } = useLogin();

	const userData = decodeToken(window.localStorage.getItem("accessToken") || '');

	const submenuActive = ref(false);
</script>

<template>
	<div class="bg-[#fdfdfd]">
		<header class="flex flex-row justify-between items-center border border-gray-300 shadow px-12 py-4">
			<div>
				<span class="flex flex-row gap-4 items-center">
					<img :src="instagramLogo" class="w-8" />
					<span>Social Media</span>
				</span>
			</div>
			<div class="flex items-center gap-2 cursor-pointer relative">
				<img class="w-8" v-if="userData.profileImg !== ''" :src="userData.profileImg" />
				<img class="w-8" v-if="userData.profileImg === ''" :src="profileImg" />
				<span @click="submenuActive = !submenuActive"> <i class="bi bi-caret-down-fill"></i> </span>

				<div :style="{ display: submenuActive ? 'flex' : 'none' }" class="absolute top-[100%] right-0 flex-col bg-slate-50 w-40 border shadow-md hidden">
					<span class="px-4 py-2 hover:bg-slate-200">Perfil</span>
					<span @click="logout" class="px-4 py-2 hover:bg-slate-200">Salir</span>
				</div>
			</div>
		</header>
		<router-view />
	</div>
</template>

<style scoped>
	div {
		min-width: inherit;
		min-height: inherit;
	}
</style>
