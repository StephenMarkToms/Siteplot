import { createWebHistory, createRouter } from 'vue-router'

import About from '../pages/About'
import Register from '../pages/Register'
import Error from '../pages/Error'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import SitesIndex from '../pages/Sites/Index'
import SitesCreate from '../pages/Sites/Create'
import SitesEdit from '../pages/Sites/Edit'
import SitesSettings from '../pages/Sites/Settings'
import SitesDelete from '../pages/Sites/Delete'
import BlocksIndex from '../pages/Blocks/Index'
import BlocksCreate from '../pages/Blocks/Create'
import BlocksView from '../pages/Blocks/View'
import BlocksEdit from '../pages/Blocks/Edit'
import RepositoriesCreate from '../pages/Repositories/Create'
import RepositoriesIndex from '../pages/Repositories/Index'

export const routes = [
    {
        props: true,
        name: 'known-error',
        path: '/error',
        component: Error,
        meta: {
            title: 'Error',
        },
    },
    {
        props: true,
        name: 'error',
        path: '/:catchAll(.*)',
        component: Error,
        meta: {
            title: 'Error',
        },
    },
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
        name: 'sites-create',
        path: '/sites/create',
        component: SitesCreate,
        meta: {
            title: 'Create Site',
        },
    },
    {
        name: 'sites-settings',
        path: '/sites/settings/:id',
        component: SitesSettings,
        meta: {
            title: 'Site Settings',
        },
    },
    {
        name: 'sites-edit',
        path: '/sites/edit/:id',
        component: SitesEdit,
        meta: {
            title: 'Edit Site',
        },
    },
    {
        name: 'sites-delete',
        path: '/sites/delete/:id',
        component: SitesDelete,
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
    {
        name: 'blocks-create',
        path: '/blocks/create',
        component: BlocksCreate,
        meta: {
            title: 'Create Block',
        },
    },
    {
        name: 'blocks-view',
        path: '/blocks/view/:id',
        component: BlocksView,
        meta: {
            title: 'View Block',
        },
    },
    {
        name: 'blocks-edit',
        path: '/blocks/edit/:id',
        component: BlocksEdit,
        meta: {
            title: 'Edit Block',
        },
    },
    {
        name: 'repositories',
        path: '/repositories',
        component: RepositoriesIndex,
        meta: {
            title: 'Repositories',
        },
    },
    {
        name: 'repositories-create',
        path: '/repositories/create',
        component: RepositoriesCreate,
        meta: {
            title: 'Create Repository',
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
