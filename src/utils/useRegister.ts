import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firestoreconfig';
import { UserData } from './interfaces';

interface Response {
	type: 'error' | 'success' ,
	message: string,
}

export const useRegister = () => {
	const checkEmail = async (email: string): Promise<Response>  => {
		try {
			const q = query(collection(db, 'users'), where('email', '==', email));

			const querySnapshot = await getDocs(q);
			querySnapshot.forEach(() => {
				throw new Error('El correo ingresado ya está en uso');
			});

		} catch(error: Response | any) {
			if(error instanceof Error) throw {type: 'error', message: error.message}

			throw {type: 'error', message: "Ocurrió un error al procesar la solicitud"}
		}

		return { type: 'success', message: '' };
	}
	

	const checkUsername = async (userName: string): Promise<Response> => {
		try {
			const q = query(collection(db, 'users'), where('userName', '==', userName));

			const querySnapshot = await getDocs(q);
			querySnapshot.forEach(() => {
				throw new Error('El nombre de usuario ingresado ya está en uso');
			});

		} catch(error: Response | any) {
			if(error instanceof Error) throw {type: 'error', message: error.message}

			throw {type: 'error', message: "Ocurrió un error al procesar la solicitud"}
		}

		return { type: 'success', message: '' };
	}

	const checkName = (name: string): Response => {
		if(name === "") return { type: 'error', message: 'El campo nombre no puede estar vacío' };


		return { type: 'success', message: '' };
	}
	
	
	const checkPassword = (password: string, rePassword: string): Response => {
		if(password === "" || rePassword === "") return {type: 'error', message: 'El campo contraseña no puede estar vacío'};
		
		if(password !== rePassword) return {type: 'error', message: 'Las contraseñas no coinciden'};

		return { type: 'success', message: '' };
	}

	const registerUser = async (userData: UserData): Promise<Response> => {

		const userDataDb = {
			name: userData.name,
			email: userData.email,
			username: `@${userData.username}`,
			password: userData.password,
			profileImg: '',
		}

		try {
			await addDoc(collection(db, "users"), userDataDb);
			
			return {type: 'success', message: ''}
		} catch(error: Response | any) {

			throw {type: 'error', message: "Ocurrió un error al crear el usuario"}
		}
	}
	
	return {
		checkEmail,
		checkName,
		checkPassword,
		checkUsername,
		registerUser
	}
}