import { createRouter, createWebHistory } from 'vue-router';
import { Home } from '../views/auth';
import { PrivateLayout } from '../views/layout';

const routes =  [
	{
		path: "/",
		component: PrivateLayout,
		redirect: "home",
		children: [
			{ path: "home", component: Home },
			{ path: ':pathMatch(.*)*', redirect: '/', },
		],
	},
];

export const privateRoutes = createRouter({
	history: createWebHistory(),
	routes: routes,
});