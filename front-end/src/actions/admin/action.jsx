import { logout } from '~/features/authSlice'
import { useAppDispatch } from '~/hooks/redux-hooks'
import authMiddleware from '~/middleware/auth-middleware'
import { get } from '~/utils/ApiCaller'

const useAdmin = () => {
    const dispatch = useAppDispatch()

    const getStatistic = (signal) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return get({
                endpoint: '/api/Admins',
                signal: signal,
            })
        else {
            dispatch(logout())
        }
    }

    const getTopUsers = (signal) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return get({
                endpoint: '/api/Admins/top-user',
                signal: signal,
            })
        else {
            dispatch(logout())
        }
    }

    const getTopClasses = (signal) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return get({
                endpoint: '/api/Admins/top-class',
                signal: signal,
            })
        else {
            dispatch(logout())
        }
    }

    const getTopStudySet = (signal) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return get({
                endpoint: '/api/Admins/top-study-set',
                signal: signal,
            })
        else {
            dispatch(logout())
        }
    }

    return {
        getStatistic,
        getTopUsers,
        getTopClasses,
        getTopStudySet,
    }
}

export default useAdmin
