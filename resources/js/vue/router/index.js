import { createWebHistory, createRouter } from 'vue-router'

import About from '../pages/About'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Sites from '../pages/Sites/Index'
import CreateSite from '../pages/Sites/Create'
import EditSite from '../pages/Sites/Edit'
import ViewSite from '../pages/Sites/View'

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
    {
        name: 'sites',
        path: '/sites',
        component: Sites,
        meta: {
            title: 'Sites',
        },
    },
    {
        name: 'create-sites',
        path: '/sites/create',
        component: CreateSite,
        meta: {
            title: 'Create Site',
        },
    },
    {
        name: 'view-site',
        path: '/sites/view/:id',
        component: ViewSite,
        meta: {
            title: 'View Site',
        },
    },
    {
        name: 'edit-site',
        path: '/sites/edit/:id',
        component: EditSite,
        meta: {
            title: 'Edit Site',
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
