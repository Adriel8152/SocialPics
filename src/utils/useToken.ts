interface UserData {
	name: string,
	username: string,
	email: string,
	profileImg: string,
}

export const useToken = () => {
	const generateToken = (data: UserData) => {
		return JSON.stringify(data);
	}

	return {
		generateToken,
	}
}