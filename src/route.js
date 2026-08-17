import { createRouter, createWebHistory } from 'vue-router';
import loginView from './view/auth/content/loginPage/index.vue';
import AuthenticatedView from './view/admin/index.vue';
import store from './store.js';
import loginUser from './view/user/index.vue'

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
];

    const router = createRouter ({
        history: createWebHistory(),
        routes
    });

    router.beforeEach((to, from, next) => {
        const token = localStorage.getItem('authToken');
        const nextPath = to.path.toLowerCase();
        const currentUser = store.getters['authUser/currentUser'];

        if (!token && nextPath == '/') { 
            return next('/login');
        }

        if (to.meta.requiresAuth && !token) { 
            return next('/login');
        }

        if (token && (nextPath == '/' || nextPath == '/login'))
        {
            if (currentUser?.account_type === 'admin') {
                return next('/admin');
            } else if (currentUser?.account_type === 'user') {
                return next('/user');
            }
        }
 
        if (token)
        {
            if (nextPath == '/' || nextPath == '/login')
            {
            if (currentUser?.account_type === 'admin') {
                return next('/admin');
            } else if (currentUser?.account_type === 'user') {
                return next('/user');
            }
            }
            else if (nextPath == '/admin' && currentUser?.account_type === 'user')
            {
                return next('/user');
            }
            else if (nextPath == '/user' && currentUser?.account_type === 'admin')
            {
                return next('/admin');
            }
        }

        return next();

    });

export default router;