<script setup lang="ts">
	import instagramLogo from '../assets/instagram-logo.png'
	import { MainButton, UnloggedInput } from '../components';
</script>

<template>
	<div class="flex w-min h-min flex-col justify-center items-center p-14 bg-gray-50 rounded-3xl shadow-md gap-8">
		<img :src="instagramLogo" class="w-12" />

		<div class="flex flex-col gap-4 w-full">
			<UnloggedInput placeholder="Correo electrónico" type="text" />
			<UnloggedInput placeholder="Contraseña" type="password" />
		</div>

		<div class="flex flex-col gap-4 w-full">
			<MainButton nameColor="coral">Iniciar sesión</MainButton>
			<MainButton nameColor="yellow">Crear una cuenta</MainButton>
		</div>
	</div>
</template>

<style scoped>
</style>
