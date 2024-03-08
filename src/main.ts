import { createApp, } from 'vue'
import { privateRoutes, publicRoutes } from './router';
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import './style.css'
import App from './App.vue'
import { store } from './store/store';

const app = createApp(App);

app.use(store.isAuthenticated ? privateRoutes : publicRoutes);

app.mount("#app");
