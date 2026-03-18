import { createRouter, createBrowserHistory, createRootRoute, createRoute } from '@tanstack/react-router'
import Home from './Home'
import Login from './Login'
import Dashboard from './Dashboard'

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

const routeTree = rootRoute.addChildren([indexRoute, loginRoute, dashboardRoute])

const router = createRouter({routeTree})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

export default router