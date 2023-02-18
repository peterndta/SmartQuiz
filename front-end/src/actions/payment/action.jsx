import authMiddleware from '~/middleware/auth-middleware'
import { post } from '~/utils/ApiCaller'

const usePayment = () => {
    const createBill = (info) => {
        const isAuth = authMiddleware()

        if (isAuth) return post({ endpoint: '/api/Bills', body: info })
        else window.location.reload(false)
    }
    return { createBill }
}

export default usePayment
