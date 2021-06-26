import { createWebHistory, createRouter } from 'vue-router'

import About from '../pages/About'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'

export const routes = [
    {
        name: 'about',
        path: '/about',
        component: About,
        meta: {
            title: 'About',
        },
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
        meta: {
            title: 'Register',
        },
    },
    {
        name: 'login',
        path: '/login',
        alias: '/',
        component: Login,
        meta: {
            title: 'Login',
        },
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        component: Dashboard,
        meta: {
            title: 'Dashboard',
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !window.Laravel.isLoggedin)
        next({ name: 'login' })
    else next()
})

const DEFAULT_TITLE = 'SP | '

router.beforeEach((toRoute, fromRoute, next) => {
    window.document.title =
        toRoute.meta && toRoute.meta.title
            ? DEFAULT_TITLE + toRoute.meta.title
            : 'Login'

    next()
})

export default router
