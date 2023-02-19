import authMiddleware from '~/middleware/auth-middleware'
import { get } from '~/utils/ApiCaller'

const useUser = () => {
    const getUserInfo = (id, signal) => {
        const isAuth = authMiddleware()

        if (isAuth) return get({ endpoint: `/api/users/${id}`, signal })
        else window.location.reload(false)
    }

    return { getUserInfo }
}

export default useUser
