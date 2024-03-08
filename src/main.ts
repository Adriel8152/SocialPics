import { createApp, ref, } from 'vue'
import { privateRoutes, publicRoutes } from './router';
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import './style.css'
import App from './App.vue'

const isAuthenticated = ref(false);

const app = createApp(App);

app.use(isAuthenticated.value ? privateRoutes : publicRoutes);

app.mount("#app");
