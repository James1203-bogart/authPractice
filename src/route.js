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
        path: '/:pathMatch (.*)*',
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

    if(to.meta.requiresAuth && !token) { 
        next('/login');
    }else if (nextPath === '/login' && token){
        next('/admin')
    }else if(nextPath === '/' && !token){
        next('/login')
    }else{ 
        next();
    }
}) 

export default router;