import { logout } from '~/features/authSlice'
import { useAppDispatch } from '~/hooks/redux-hooks'
import authMiddleware from '~/middleware/auth-middleware'
import { get, post, put, remove } from '~/utils/ApiCaller'

const useClass = () => {
    const dispatch = useAppDispatch()

    const createClass = (classes) => {
        const isAuth = authMiddleware()

        if (isAuth) return post({ endpoint: '/api/classes', body: classes })
        else {
            dispatch(logout())
        }
    }

    const updateClass = (classes) => {
        const isAuth = authMiddleware()

        if (isAuth) return put({ endpoint: '/api/classes', body: classes })
        else {
            dispatch(logout())
        }
    }

    const getMyClass = (userId, signal) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return get({
                endpoint: '/api/Classes/my-class',
                params: {
                    userId: userId,
                },
                signal: signal,
            })
        else {
            dispatch(logout())
        }
    }

    const addStudySetToClass = (studySet) => {
        const isAuth = authMiddleware()

        if (isAuth) return post({ endpoint: '/api/classes/add-study-set', body: studySet })
        else {
            dispatch(logout())
        }
    }

    const checkStudySetToAdd = (studySetId, userId, signal) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return get({
                endpoint: '/api/classes/check-to-add',
                params: {
                    studySetId: studySetId,
                    userId: userId,
                    signal: signal,
                },
            })
        else {
            dispatch(logout())
        }
    }

    const getClassDetail = (classId, userId, signal) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return get({
                endpoint: `/api/classes/class-detail/${classId}`,
                params: {
                    userId: userId,
                },
                signal: signal,
            })
        else {
            dispatch(logout())
        }
    }

    const joinClass = (join) => {
        const isAuth = authMiddleware()

        if (isAuth) return post({ endpoint: '/api/classes/join', body: join })
        else {
            dispatch(logout())
        }
    }

    const leaveClass = (classId, userId) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return remove({
                endpoint: '/api/classes/leave-class',
                params: {
                    classId: classId,
                    userId: userId,
                },
            })
        else {
            dispatch(logout())
        }
    }

    const removeClass = (classId, userId) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return remove({
                endpoint: '/api/classes/remove-class',
                params: {
                    classId: classId,
                    userId: userId,
                },
            })
        else {
            dispatch(logout())
        }
    }

    const removeStudySetOfClass = (classId, studySetId) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return remove({
                endpoint: '/api/classes/remove-study-set',
                params: {
                    classId: classId,
                    studySetId: studySetId,
                },
            })
        else {
            dispatch(logout())
        }
    }

    const getClassMember = (classId, signal) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return get({
                endpoint: `/api/classes/class-member/${classId}`,
                signal: signal,
            })
        else {
            dispatch(logout())
        }
    }

    const getClassHasJoined = (userId, signal) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return get({
                endpoint: `/api/classes/joined-class`,
                params: {
                    userId: userId,
                },
                signal: signal,
            })
        else {
            dispatch(logout())
        }
    }

    const getClassIdByJoinedCode = (joinedCode, signal) =>
        get({
            endpoint: `/api/classes/get-class-id/${joinedCode}`,
            signal: signal,
        })

    const getStudySetOfClass = (classId, filter) => {
        const isAuth = authMiddleware()

        if (isAuth)
            return get({
                endpoint: `/api/studySets/class/${classId}${filter}`,
            })
        else {
            dispatch(logout())
        }
    }

    return {
        createClass,
        updateClass,
        getMyClass,
        addStudySetToClass,
        checkStudySetToAdd,
        getClassDetail,
        joinClass,
        leaveClass,
        removeClass,
        removeStudySetOfClass,
        getClassMember,
        getClassHasJoined,
        getClassIdByJoinedCode,
        getStudySetOfClass,
    }
}

export default useClass
