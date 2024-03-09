interface UserData {
	id: string,
	name: string,
	username: string,
	email: string,
	profileImg: string,
}

export const useToken = () => {
	const generateToken = (data: UserData) => {
		return JSON.stringify(data);
	}

	const decodeToken = (data: string): UserData => {
		return JSON.parse(data);
	}

	const saveToken = (token: string) => {
		window.localStorage.setItem("accessToken", token);
	}

	return {
		generateToken,
		decodeToken,
		saveToken
	}
}