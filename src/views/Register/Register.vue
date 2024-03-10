<script setup lang="ts">
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import instagramLogo from '../../assets/instagram-logo.png'
	import { MainButton, UnloggedInput } from '../../components';
	import { Notifications, useNotification } from '@kyvg/vue3-notification';
	import { useRegister } from '../../utils/useRegister';
	import { useLogin } from '../../utils/useLogin';

	const router = useRouter();
	const { notify } = useNotification();
	const { checkEmail, checkUsername, checkPassword, checkName, registerUser } = useRegister();
	const { login } = useLogin();

	
	const loadingRegister = ref(false);

	const registerFormValues = ref({
		confirmPassword: '',
		email: '',
		name: '',
		password: '',
		username: '',
		profileImg: '',
	});
	
	const saveData = () => {
		registerUser(registerFormValues.value)
		.then((response) => {
			if( response.type === 'error' ) throw new Error(response.message);
			
			login({
				email: (registerFormValues.value.email).toLocaleLowerCase(),
				name: registerFormValues.value.name,
				profileImg: registerFormValues.value.profileImg,
				username: registerFormValues.value.username,
			})		
		})
		.catch(error => {
			notify({ type: 'error', title: 'Error', text: error.message});
		})
	}

	
	const handleSubmit = async (e: any) => {
		e.preventDefault();

		loadingRegister.value = true;

		const checkNameResp = checkName(registerFormValues.value.name)
		if( checkNameResp.type === 'error' ) {
			loadingRegister.value = false;
			notify({ type: 'error', title: 'Error', text: checkNameResp.message});
			return;
		}
		
		const checkPasswordResp = checkPassword(registerFormValues.value.password, registerFormValues.value.confirmPassword)
		if( checkPasswordResp.type === 'error' ) {
			loadingRegister.value = false;
			notify({ type: 'error', title: 'Error', text: checkPasswordResp.message});
			return;
		}
		
		await checkEmail(registerFormValues.value.email)
			.then(response => {
				if(response.type === 'error') throw new Error(response.message);
			})
			.catch(( error ) => {
				notify({ type: 'error', title: 'Error', text: error.message || "Ocurrió un error al procesar la solicitud"})
				return;
			})
			.finally(() => {
				loadingRegister.value = false;
			})
		
		
		await checkUsername(registerFormValues.value.username)
			.then(response => {
				if(response.type === 'error') throw new Error(response.message);
			})
			.catch(( error ) => {
				notify({ type: 'error', title: 'Error', text: error.message || "Ocurrió un error al procesar la solicitud",})
				return;
			})
			.finally(() => {
				loadingRegister.value = false;
			})

		saveData();
	}

</script>

<template>
	<Notifications close-on-click position="top right" classes="my-notification" />

	<form class="flex h-min flex-col justify-center items-center p-14 bg-gray-50 rounded-3xl shadow-md gap-8 w-[95%] max-w-96">
		<img :src="instagramLogo" class="w-12" />

		<div class="flex flex-col gap-4 w-full">
			<UnloggedInput v-model="registerFormValues.email" placeholder="Correo electrónico" type="email" />
			<UnloggedInput v-model="registerFormValues.name" placeholder="Nombre completo" type="text" />
			<UnloggedInput v-model="registerFormValues.username" placeholder="Ingrese su usuario (sin @)" type="text" />
			<UnloggedInput v-model="registerFormValues.password" placeholder="Contraseña" type="password" />
			<UnloggedInput v-model="registerFormValues.confirmPassword" placeholder="Confirmar contraseña" type="password" />
		</div>

		<div class="flex flex-col gap-4 w-full">
			<MainButton :disabled="loadingRegister" nameColor="coral" @click="handleSubmit">Crear cuenta</MainButton>
			<MainButton nameColor="yellow" @click="router.push('/login')">Iniciar sesión</MainButton>
		</div>
	</form>
</template>

<style scoped>
</style>
../../components../../../firebase/firestoreconfig
