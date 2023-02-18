import { Suspense, lazy } from 'react'

import { Route, Switch } from 'react-router-dom'

import { CommonLayout } from '~/components/layout'

import HybridRoute from './HyBridRoute'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

import Loading from '~/pages/Loading'

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
    },
    {
        component: lazy(() => import('~/pages/CreateStudySet')),
        path: '/create',
        name: 'create-study-set',
        layout: 'common',
        role: 'user',
    },
    {
        component: lazy(() => import('~/pages/Draft')),
        path: '/drafts',
        name: 'drafts',
        layout: 'common',
    },
    {
        component: lazy(() => import('~/pages/MyLibrary')),
        path: '/my-library',
        name: 'my-library',
        layout: 'common',
    },
    {
        component: lazy(() => import('~/pages/UpgradeAccount')),
        path: '/upgrade',
        name: 'upgrade',
        layout: 'common',
    },
    {
        component: lazy(() => import('~/pages/Checkout')),
        path: '/checkout/:id',
        name: 'checkout',
        layout: 'common',
    },
    {
        component: lazy(() => import('~/pages/UpdateStudySet')),
        path: '/study-sets/:id/update',
        name: 'update',
        layout: 'common',
    },
    {
        component: lazy(() => import('~/pages/TestPage')),
        path: '/study-sets/:id/test',
        name: 'test',
        layout: 'common',
    },
    {
        component: lazy(() => import('~/pages/LearnPage')),
        path: '/study-sets/:id/learn',
        name: 'learn',
        layout: 'common',
    },
]

const RouteList = (
    <Suspense fallback={<Loading />}>
        <Switch>
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
                        </Switch>
                    </Suspense>
                    {/* <Redirect to="/" /> */}
                </CommonLayout>
            </Route>
            <Route path="/admin"></Route>
        </Switch>
    </Suspense>
)

export default RouteList
