import { createRouter, createWebHistory } from 'vue-router';
import loginView from './view/auth/content/loginPage/index.vue';
import AuthenticatedView from './view/index.vue';
import store from './store.js';
import loginUser from './view/auth/content/loginUser/index.vue'

const routes = [{ 
        path: '/login',
        name: 'login',
        component: loginView
    },
    { 
        path: '/admin',
        name: 'admin',
        component: AuthenticatedView,
        meta: { requiresAuth: true, requiresAdmin: true}
    },
    {
        path: '/user',
        name: 'user',
        component:loginUser,
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
        }
        else {
        return next('/user');
        }
    }
    if (to.meta.requiresAdmin && currentUser?.account_type !== 'admin') {
    return next('/user');
}

    return next();
    });

export default router;