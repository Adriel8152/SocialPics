import { createRouter, createWebHistory } from 'vue-router'
import { Login, Register } from '../views';
import { PublicLayout } from '../views/layout';

const routes =  [
	{
		path: "/",
		component: PublicLayout,
		redirect: "login",
		children: [
			{ path: "login", component: Login },
			{ path: "register", component: Register },
			{ path: ':pathMatch(.*)*', redirect: '/', },
		],
	},
]

export const publicRoutes = createRouter( {
	history: createWebHistory(),
	routes: routes,
} );
