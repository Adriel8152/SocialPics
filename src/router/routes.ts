import { createRouter, createWebHistory } from 'vue-router';
import { Create, Edit, Home, Post, Profile } from '../views/auth';
// import { PrivateLayout } from '../views/layout';
import { store } from '../store/store';
import { Login, Register } from '../views';
import { PublicLayout } from '../views/layout';
import PrivateLayout from '../views/layout/PrivateLayout.vue';

const routes =  [
	{
		path: '/',
		name: 'Root',
		component: PublicLayout,
		redirect: '/login',
		meta: {
			requiresAuth: false,
		},
		children: [
			{
				path: '/login',
				name: 'Login',
				component: Login,
				meta: {
					requiresAuth: false,
				}
			},
			{
				path: '/register',
				name: 'Register',
				component: Register,
				meta: {
					requiresAuth: false,
				}
			},
			{
				path: '/:pathMatch(.*)*',
				redirect: '/',
			},
		],
	},
	{
		path: '/',
		component: PrivateLayout,
		meta: {
			requiresAuth: true,
		},
		children: [
			{
				path: '/home',
				name: 'Home',
				component: Home,
				
			},
			{
				path: '/create',
				name: 'Create',
				component: Create
			},
			{
				path: '/edit:id',
				name: 'Edit',
				component: Edit
			},
			{
				path: '/post/:id',
				name: 'Post',
				component: Post,
			},
			{
				path: '/profile',
				name: 'Profile',
				component: Profile
			},
			{
				path: '/:pathMatch(.*)*',
				redirect: '/',
			},
		]
	},
	
];



const router = createRouter({
	history: createWebHistory(),
	routes: routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next({ name: 'Root' });
  } else if(!to.meta.requiresAuth && store.isAuthenticated) {
    next({ name: 'Home' });
  } else {
		next()
	}
});

export { router };