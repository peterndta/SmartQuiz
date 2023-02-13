import { get, post } from '~/utils/ApiCaller'

const useStudySet = () => {
    const getStudySetList = (filters, signal) => get({ endpoint: `/api/StudySets/filter${filters}`, signal })

    const getStudySet = (id, signal) =>
        get({
            endpoint: `/api/StudySets/${id}`,
            signal: signal,
        })
    const getMyStudySets = (userId, pageNumber, signal) =>
        get({
            endpoint: `/api/StudySets/my-studyset`,
            signal: signal,
            params: { userId: userId, pageNumber: pageNumber, pageSize: 8 },
        })
    const createStudySet = (studySet) => post({ endpoint: '/api/studySets', body: studySet })
    return { getStudySetList, getStudySet, getMyStudySets, createStudySet }
}

export default useStudySet
