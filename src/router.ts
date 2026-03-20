import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import Login from './Login'
import Dashboard from './Dashboard'
import { ProductDetail } from './components/product-detail'
import {z} from 'zod'

const rootRoute = createRootRoute()

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Login,
})

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login,
})

const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: Dashboard,
})

const productDetailRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard/product',
    component: ProductDetail,
    validateSearch: z.object({
        id: z.string(),
    }),
})

const routeTree = rootRoute.addChildren([
    indexRoute,      
    loginRoute,      
    dashboardRoute,   
    productDetailRoute, 
])

const router = createRouter({routeTree})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

export default router