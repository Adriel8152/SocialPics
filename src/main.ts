import { createApp, } from 'vue';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './style.css';
import App from './App.vue';
import { router } from './router/routes';

const app = createApp(App);

app.use(router);

app.mount("#app");
