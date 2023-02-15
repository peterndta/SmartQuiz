import authMiddleware from '~/middleware/auth-middleware'
import { post, put, remove } from '~/utils/ApiCaller'

const useQuestion = () => {
    const createQuestion = (question) => {
        const isAuth = authMiddleware()

        if (isAuth) return post({ endpoint: '/api/questions', body: question })
        else window.location.reload(false)
    }

    const updateQuestion = (question) => {
        const isAuth = authMiddleware()

        if (isAuth) return put({ endpoint: '/api/questions', body: question })
        else window.location.reload(false)
    }

    const removeQuestion = (id) => {
        const isAuth = authMiddleware()

        if (isAuth) return remove({ endpoint: `/api/questions/${id}` })
        else window.location.reload(false)
    }

    return { createQuestion, updateQuestion, removeQuestion }
}

export default useQuestion
