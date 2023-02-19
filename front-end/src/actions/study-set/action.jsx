import authMiddleware from '~/middleware/auth-middleware'
import { get, post, put, remove } from '~/utils/ApiCaller'

const useStudySet = () => {
    const getStudySetList = (filters, signal) => get({ endpoint: `/api/StudySets/filter${filters}`, signal })

    const getStudySet = (id, userId, signal) =>
        get({
            endpoint: `/api/StudySets/${id}?userId=${userId}`,
            signal: signal,
        })

    const getMyStudySets = (userId, pageNumber, signal) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return get({
                endpoint: `/api/StudySets/my-studyset`,
                signal: signal,
                params: { userId: userId, pageNumber: pageNumber, pageSize: 4 },
            })
        else window.location.reload(false)
    }

    const deleteStudySet = (studySetId) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return remove({
                endpoint: `/api/StudySets/${studySetId}`,
            })
        else window.location.reload(false)
    }

    const createStudySet = (studySet) => {
        const isAuth = authMiddleware()

        if (isAuth) return post({ endpoint: '/api/studySets', body: studySet })
        else window.location.reload(false)
    }

    const updateStudySet = (studySet) => {
        const isAuth = authMiddleware()

        if (isAuth) return put({ endpoint: '/api/studySets', body: studySet })
        else window.location.reload(false)
    }

    const getStudySetExam = (id, amount, signal) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return get({
                endpoint: `/api/StudySets/${id}/exam`,
                signal: signal,
                params: { amount: amount },
            })
        else window.location.reload(false)
    }

    const getRecentStudySets = (userId, amount, signal) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return get({
                endpoint: `/api/StudySets`,
                signal: signal,
                params: { userId: userId, amount: amount },
            })
        else window.location.reload(false)
    }

    const getRecommendStudySets = (userId, amount, signal) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return get({
                endpoint: `/api/StudySets/recommend`,
                signal: signal,
                params: { userId: userId, amount: amount },
            })
        else window.location.reload(false)
    }

    return {
        getStudySetList,
        getStudySet,
        getMyStudySets,
        createStudySet,
        deleteStudySet,
        updateStudySet,
        getStudySetExam,
        getRecentStudySets,
        getRecommendStudySets,
    }
}

export default useStudySet
