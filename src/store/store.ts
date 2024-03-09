import { reactive } from 'vue'

export const store = reactive({
  isAuthenticated: window.localStorage.getItem("accessToken") ? true : false,
	setAuthenticatedState(status: boolean) {
		this.isAuthenticated = status;
	}
})