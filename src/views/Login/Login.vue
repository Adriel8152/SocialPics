<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import instagramLogo from '../../assets/instagram-logo.png'
	import { MainButton, UnloggedInput } from '../../components';

	const router = useRouter();


</script>

<template>
	<div class="flex h-min flex-col justify-center items-center p-14 bg-gray-50 rounded-3xl shadow-md gap-8 w-[95%] max-w-96">
		<img :src="instagramLogo" class="w-12" />

		<div class="flex flex-col gap-4 w-full">
			<UnloggedInput placeholder="Correo o @usuario" type="email" />
			<UnloggedInput placeholder="Contraseña" type="password" />
		</div>

		<div class="flex flex-col gap-4 w-full">
			<MainButton nameColor="coral">Iniciar sesión</MainButton>
			<MainButton nameColor="yellow" @click="router.push('/register')">Crear cuenta</MainButton>
		</div>
	</div>
</template>

<style scoped>
</style>
../../components