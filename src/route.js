import { createRouter, createWebHistory } from 'vue-router';
import loginView from './view/auth/content/loginPage/index.vue';
import AuthenticatedView from './view/index.vue';

const routes = [{ 
        path: '/login',
        name: 'login',
        component: loginView
    },
    { 
        path: '/Authenticated',
        name: 'Authenticated',
        component: AuthenticatedView,
        meta: { requiresAuth: true }
    },
    {
        path: '/:pathMatch (.*)*',
        redirect: '/Authenticated',
    },
];

const router = createRouter ({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('authToken');

    if(to.meta.requiresAuth && !token) { 
        next('/login');
    }else if (to.path  === 'login' && token){
        next('/')
    }else{ 
        next();
    }
}) 

export default router;