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

    return {
        getStatistic,
    }
}

export default useAdmin
