import { useRouter } from "vue-router";
import { store } from "../store/store";
import { useToken } from "./useToken";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firestoreconfig";
import { UserData } from "./interfaces";

interface Response {
	type: 'error' | 'success' ,
	message: string,
	data: object,
}

export const useLogin = () => {
	const router = useRouter();
	const { generateToken } = useToken();

	const login = (data: UserData) => {
		const token = generateToken({
			id: data.id,
			name: data.name,
			email: data.email,
			username: data.username,
			profileImg: data.profileImg,
		})

		window.localStorage.setItem('accessToken', token);

		store.setAuthenticatedState(true);

		router.push('/home')
	}

	const logout = () => {
		window.localStorage.removeItem('accessToken');

		store.setAuthenticatedState(false);

		router.push('/')
	}


	const checkEmail = async (email: string): Promise<Response>  => {
		try {
			const q = query(collection(db, 'users'), where('email', '==', email));

			const querySnapshot = await getDocs(q);

			if(!querySnapshot.empty) {
				return {
					type: 'success',
					message: 'Usuario encontrado',
					data: {
						id: querySnapshot.docs[0].id,
						...querySnapshot?.docs[0].data()
					},
				}
			}
		} catch(error: Response | any) {
			if(error instanceof Error) throw {type: 'error', message: error.message, data: {}}
			
			throw {type: 'error', message: "Ocurrió un error al procesar la solicitud", data: {}}
		}

		return {
			type: 'error',
			message: 'Usuario no encontrado',
			data: {},
		}
	}
	

	const checkUsername = async (username: string): Promise<Response> => {
		try {
			const q = query(collection(db, 'users'), where('username', '==', `@${username}`));

			const querySnapshot = await getDocs(q);

			if(!querySnapshot.empty) {
				return {
					type: 'success',
					message: 'Usuario encontrado',
					data: querySnapshot?.docs[0]?.data(),
				}
			}

		} catch(error: Response | any) {
			if(error instanceof Error) throw {type: 'error', message: error.message, data: {}}

			throw {type: 'error', message: "Ocurrió un error al procesar la solicitud", data: {}}
		}

		return {
			type: 'error',
			message: 'Usuario no encontrado',
			data: {},
		}
	}
	
	
	// const checkPassword = (password: string, rePassword: string): Response => {
	// 	if(password === "" || rePassword === "") return {type: 'error', message: 'El campo contraseña no puede estar vacío'};
		
	// 	if(password !== rePassword) return {type: 'error', message: 'Las contraseñas no coinciden'};

	// 	return { type: 'success', message: '' };
	// }





	return {
		login,
		logout,
		checkEmail,
		checkUsername,
		// checkPassword,
	}
}
