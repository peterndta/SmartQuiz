import { logout } from '~/features/authSlice'
import { useAppDispatch } from '~/hooks/redux-hooks'
import authMiddleware from '~/middleware/auth-middleware'
import { get, post } from '~/utils/ApiCaller'

const useBookmark = () => {
    const dispatch = useAppDispatch()
    const bookmark = (bookmark) => {
        const isAuth = authMiddleware()

        if (isAuth) return post({ endpoint: '/api/users/mark-study-set', params: bookmark })
        else {
            dispatch(logout())
        }
    }

    const unBookmark = (bookmark) => {
        const isAuth = authMiddleware()

        if (isAuth) return post({ endpoint: '/api/users/un-mark-study-set', params: bookmark })
        else {
            dispatch(logout())
        }
    }

    const getMyBookmarks = (userId, signal) => {
        const isAuth = authMiddleware()

        if (isAuth) return get({ endpoint: `/api/studySets/bookmark/${userId}`, signal })
        else {
            dispatch(logout())
        }
    }

    return { bookmark, unBookmark, getMyBookmarks }
}

export default useBookmark
