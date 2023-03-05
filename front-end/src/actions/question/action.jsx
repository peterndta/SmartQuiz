import { logout } from '~/features/authSlice'
import { useAppDispatch } from '~/hooks/redux-hooks'
import authMiddleware from '~/middleware/auth-middleware'
import { post, put, remove } from '~/utils/ApiCaller'

const useQuestion = () => {
    const dispatch = useAppDispatch()

    const createQuestion = (question) => {
        const isAuth = authMiddleware()

        if (isAuth) return post({ endpoint: '/api/questions', body: question })
        else {
            dispatch(logout())
            window.location.reload(false)
        }
    }

    const updateQuestion = (question) => {
        const isAuth = authMiddleware()

        if (isAuth) return put({ endpoint: '/api/questions', body: question })
        else {
            dispatch(logout())
            window.location.reload(false)
        }
    }

    const removeQuestion = (id) => {
        const isAuth = authMiddleware()

        if (isAuth) return remove({ endpoint: `/api/questions/${id}` })
        else {
            dispatch(logout())
            window.location.reload(false)
        }
    }
    const importQuestion = (formData) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return post({
                endpoint: '/api/questions/import',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            })
        else {
            dispatch(logout())
            window.location.reload(false)
        }
    }

    return { createQuestion, updateQuestion, removeQuestion, importQuestion }
}

export default useQuestion
