import { logout } from '~/features/authSlice'
import { useAppDispatch } from '~/hooks/redux-hooks'
import authMiddleware from '~/middleware/auth-middleware'
import { post } from '~/utils/ApiCaller'

const usePayment = () => {
    const dispatch = useAppDispatch()
    const createBill = (info) => {
        const isAuth = authMiddleware()

        if (isAuth) return post({ endpoint: '/api/Bills', body: info })
        else {
            dispatch(logout())
        }
    }
    return { createBill }
}

export default usePayment
