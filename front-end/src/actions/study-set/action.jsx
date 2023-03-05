import { logout } from '~/features/authSlice'
import { useAppDispatch } from '~/hooks/redux-hooks'
import authMiddleware from '~/middleware/auth-middleware'
import { get, post, put, remove } from '~/utils/ApiCaller'

const useStudySet = () => {
    const dispatch = useAppDispatch()
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
        else {
            dispatch(logout())
        }
    }

    const deleteStudySet = (studySetId) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return remove({
                endpoint: `/api/StudySets/${studySetId}`,
            })
        else {
            dispatch(logout())
        }
    }

    const createStudySet = (studySet) => {
        const isAuth = authMiddleware()

        if (isAuth) return post({ endpoint: '/api/studySets', body: studySet })
        else {
            dispatch(logout())
        }
    }

    const updateStudySet = (studySet) => {
        const isAuth = authMiddleware()

        if (isAuth) return put({ endpoint: '/api/studySets', body: studySet })
        else {
            dispatch(logout())
        }
    }

    const getStudySetExam = (id, amount, signal) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return get({
                endpoint: `/api/StudySets/${id}/exam`,
                signal: signal,
                params: { amount: amount },
            })
        else {
            dispatch(logout())
        }
    }

    const getRecentStudySets = (userId, amount, signal) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return get({
                endpoint: `/api/StudySets`,
                signal: signal,
                params: { userId: userId, amount: amount },
            })
        else {
            dispatch(logout())
        }
    }

    const getRecommendStudySets = (userId, amount, signal) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return get({
                endpoint: `/api/StudySets/recommend`,
                signal: signal,
                params: { userId: userId, amount: amount },
            })
        else {
            dispatch(logout())
        }
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
