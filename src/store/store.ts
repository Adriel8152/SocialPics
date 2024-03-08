import { reactive } from 'vue'

export const store = reactive({
  isAuthenticated: false,
	changeStatus() {
		this.isAuthenticated = !this.isAuthenticated;
	}
})