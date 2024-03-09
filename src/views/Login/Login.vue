<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import instagramLogo from '../../assets/instagram-logo.png'
	import { MainButton, UnloggedInput } from '../../components';
	import { ref } from 'vue';
	import { useLogin } from '../../utils/useLogin';
import { UserData } from '../../utils/interfaces';
import { Notifications, useNotification } from '@kyvg/vue3-notification';

	const router = useRouter();
	const username = ref('');
	const password = ref('');

	const { login, checkEmail, checkUsername } = useLogin();
	const { notify } = useNotification();

	const handleLogin = async (e: any) => {

		e.preventDefault();

		const isValidEmail = await checkEmail(username.value)

		const isValidUsername = await checkUsername(username.value)

		let isValidPassword = false;

		if( isValidEmail.type === 'success' ) {
			const userData = isValidEmail?.data as UserData;
  		isValidPassword = userData.password === password.value;
		}
		
		if( isValidUsername.type === 'success' ) {
			const userData = isValidUsername?.data as UserData;
			isValidPassword = userData.password === password.value;
		}
		
		if( ( isValidEmail || isValidUsername ) && isValidPassword ) {
			const emailData = isValidEmail?.data as UserData;
			const userData = isValidUsername?.data as UserData;
			
			login( emailData || userData );
			return;
		}

		notify({ type: 'error', title: 'Error', text: 'No se encontró al usuario ingresado'});
	}


</script>

<template>
	<Notifications close-on-click position="top right" classes="my-notification" />

	<form class="flex h-min flex-col justify-center items-center p-14 bg-gray-50 rounded-3xl shadow-md gap-8 w-[95%] max-w-96">
		<img :src="instagramLogo" class="w-12" />

		<div class="flex flex-col gap-4 w-full">
			<UnloggedInput v-model="username" placeholder="Correo o @usuario" type="email" />
			<UnloggedInput v-model="password" placeholder="Contraseña" type="password" />
		</div>

		<div class="flex flex-col gap-4 w-full">
			<MainButton type="submit" nameColor="coral" @click="handleLogin">Iniciar sesión</MainButton>
			<MainButton nameColor="yellow" @click="router.push('/register')">Crear cuenta</MainButton>
		</div>
	</form>
</template>

<style scoped>
</style>