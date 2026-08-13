import { createRouter, createWebHistory } from 'vue-router';
import loginView from './view/auth/content/loginPage/index.vue';
import AuthenticatedView from './view/index.vue';
import store from './store.js';

const routes = [{ 
        path: '/login',
        name: 'login',
        component: loginView
    },
    { 
        path: '/admin',
        name: 'admin',
        component: AuthenticatedView,
        meta: { requiresAuth: true }
    },
    {
        path: '/user',
        name: 'user',
        component:AuthenticatedView,
        meta: { requiresAuth: true }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/admin',
    },
];

    const router = createRouter ({
        history: createWebHistory(),
        routes
    });

    router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('authToken');
    const nextPath = to.path.toLowerCase();
    const currentUser = store.getters['authUser/currentUser'];

    if (to.meta.requiresAuth && !token) { 
        return next('/login');
    } 

    if (nextPath === '/login' && token) {
        if (currentUser?.account_type === 'admin') {
        return next('/admin');
        } else if (currentUser?.account_type === 'user') {
        return next('/user');
        } else {
        return next('/standardUser');
        }
    } 

    return next();
    });

export default router;