import { createRouter, createWebHistory } from 'vue-router';
import loginView from './view/auth/content/loginPage/index.vue';
import AuthenticatedView from './view/index.vue';

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
        path: '/:pathMatch(.*)*',
        redirect: '/admin',
    },
    {
        path: '/standardUser',
        name: '/standardUser',
        meta:{ requireAuth: true}
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
        next('/login');
    } else if (nextPath === '/login' && token) {
        if (currentUser?.account_type === 'admin') {
        next('/admin');
        } else {
        next('/standardUser');
        }
    } else { 
        next();
    }
}) 

export default router;