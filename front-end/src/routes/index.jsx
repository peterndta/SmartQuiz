import { Suspense, lazy } from 'react'

import { Route, Switch } from 'react-router-dom'

import { AdminLayout, CommonLayout } from '~/components/layout'

import HybridRoute from './HyBridRoute'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

import Loading from '~/pages/Loading'
import NotFound from '~/pages/Notfound'

const publicRoutes = [
    {
        component: lazy(() => import('~/pages/Login')),
        path: '/login',
        name: 'login',
        layout: 'common',
    },
]

const hyBridRoutes = [
    {
        component: lazy(() => import('~/pages/SearchPage')),
        path: '/study-sets',
        name: 'search',
        layout: 'common',
    },
    {
        component: lazy(() => import('~/pages/StudySetDetail')),
        path: '/study-sets/:id',
        name: 'detail',
        layout: 'common',
    },
]

const privateRoutes = [
    {
        component: lazy(() => import('../pages/Home')),
        path: '/',
        name: 'home',
        layout: 'common',
        role: 'user',
    },
    {
        component: lazy(() => import('~/pages/CreateStudySet')),
        path: '/create',
        name: 'create-study-set',
        layout: 'common',
        role: 'user',
    },
    {
        component: lazy(() => import('~/pages/MyLibrary')),
        path: '/my-library',
        name: 'my-library',
        layout: 'common',
        role: 'user',
    },
    {
        component: lazy(() => import('~/pages/UpgradeAccount')),
        path: '/upgrade',
        name: 'upgrade',
        layout: 'common',
        role: 'user',
    },
    {
        component: lazy(() => import('~/pages/Checkout')),
        path: '/checkout',
        name: 'checkout',
        layout: 'common',
        role: 'user',
    },
    {
        component: lazy(() => import('~/pages/Settings')),
        path: '/settings',
        name: 'settings',
        layout: 'common',
        role: 'user',
    },
    {
        component: lazy(() => import('~/pages/UpdateStudySet')),
        path: '/study-sets/:id/update',
        name: 'update',
        layout: 'common',
        role: 'user',
    },
    {
        component: lazy(() => import('~/pages/TestPage')),
        path: '/study-sets/:id/test',
        name: 'test',
        layout: 'common',
        role: 'user',
    },
    {
        component: lazy(() => import('~/pages/LearnPage')),
        path: '/study-sets/:id/learn',
        name: 'learn',
        layout: 'common',
        role: 'user',
    },
    {
        component: lazy(() => import('~/pages/Join')),
        path: '/join/:id',
        name: 'join',
        layout: 'common',
        role: 'user',
    },
    {
        component: lazy(() => import('~/pages/ClassDetail')),
        path: '/class/:id',
        name: 'settings',
        layout: 'common',
    },
    {
        component: lazy(() => import('~/pages/Dashboard')),
        path: '/admin',
        name: 'dashboard',
        layout: 'admin',
        role: 'admin',
    },
]

const RouteList = (
    <Suspense fallback={<Loading />}>
        <Switch>
            <Route path="/admin">
                <AdminLayout>
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            {publicRoutes.map(
                                ({ layout, ...route }) =>
                                    layout === 'admin' && <PublicRoute key={route.name} exact={true} {...route} />
                            )}
                            {hyBridRoutes.map(
                                ({ layout, ...route }) =>
                                    layout === 'admin' && <HybridRoute key={route.name} exact={true} {...route} />
                            )}
                            {privateRoutes.map(
                                ({ layout, ...route }) =>
                                    layout === 'admin' && <PrivateRoute key={route.name} exact={true} {...route} />
                            )}
                            <Route path="*">
                                <NotFound />
                            </Route>
                        </Switch>
                    </Suspense>
                </AdminLayout>
            </Route>
            <Route>
                <CommonLayout>
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            {publicRoutes.map(
                                ({ layout, ...route }) =>
                                    layout === 'common' && <PublicRoute key={route.name} exact={true} {...route} />
                            )}
                            {hyBridRoutes.map(
                                ({ layout, ...route }) =>
                                    layout === 'common' && <HybridRoute key={route.name} exact={true} {...route} />
                            )}
                            {privateRoutes.map(
                                ({ layout, ...route }) =>
                                    layout === 'common' && <PrivateRoute key={route.name} exact={true} {...route} />
                            )}
                            <Route path="*">
                                <NotFound />
                            </Route>
                        </Switch>
                    </Suspense>
                </CommonLayout>
            </Route>
        </Switch>
    </Suspense>
)

export default RouteList
