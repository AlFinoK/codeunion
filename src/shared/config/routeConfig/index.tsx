import { RouteProps } from 'react-router-dom'
import { UsersPage } from 'pages/UsersPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { MyAccountPage } from 'pages/MyAccountPage'

export enum AppRoutes {
    MAIN = 'main',
    NOT_FOUND = 'not_found',
    MY_ACCOUNT = 'my_account',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.NOT_FOUND]: '*',
    [AppRoutes.MY_ACCOUNT]: 'my_account',
}
export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <UsersPage />,
    },

    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },

    [AppRoutes.MY_ACCOUNT]: {
        path: RoutePath.my_account,
        element: <MyAccountPage />,
    },
}
