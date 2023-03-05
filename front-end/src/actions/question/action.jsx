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
        }
    }

    const updateQuestion = (question) => {
        const isAuth = authMiddleware()

        if (isAuth) return put({ endpoint: '/api/questions', body: question })
        else {
            dispatch(logout())
        }
    }

    const removeQuestion = (id) => {
        const isAuth = authMiddleware()

        if (isAuth) return remove({ endpoint: `/api/questions/${id}` })
        else {
            dispatch(logout())
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
        }
    }

    return { createQuestion, updateQuestion, removeQuestion, importQuestion }
}

export default useQuestion
