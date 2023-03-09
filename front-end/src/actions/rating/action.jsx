import { logout } from '~/features/authSlice'
import { useAppDispatch } from '~/hooks/redux-hooks'
import authMiddleware from '~/middleware/auth-middleware'
import { post } from '~/utils/ApiCaller'

const useRating = () => {
    const dispatch = useAppDispatch()
    const rating = (info) => {
        const isAuth = authMiddleware()

        if (isAuth) return post({ endpoint: '/api/rating', body: info })
        else {
            dispatch(logout())
        }
    }
    return { rating }
}

export default useRating
