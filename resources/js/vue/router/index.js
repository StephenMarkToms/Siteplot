import { createWebHistory, createRouter } from 'vue-router'

import About from '../pages/About'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import SitesIndex from '../pages/Sites/Index'
import CreateSite from '../pages/Sites/Create'
import EditSite from '../pages/Sites/Edit'
import SiteSettings from '../pages/Sites/Settings'
import DeleteSite from '../pages/Sites/Delete'
import BlocksIndex from '../pages/Blocks/Index'

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
        component: SitesIndex,
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
        name: 'site-settings',
        path: '/sites/settings/:id',
        component: SiteSettings,
        meta: {
            title: 'Site Settings',
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
    {
        name: 'delete-site',
        path: '/sites/delete/:id',
        component: DeleteSite,
        meta: {
            title: 'Delete Site',
        },
    },
    {
        name: 'blocks',
        path: '/blocks',
        component: BlocksIndex,
        meta: {
            title: 'Blocks',
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
