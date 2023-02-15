import { get, post, remove } from '~/utils/ApiCaller'

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
    const deleteStudySet = (studySetId) =>
        remove({
            endpoint: `/api/StudySets/${studySetId}`,
        })
    const createStudySet = (studySet) => post({ endpoint: '/api/studySets', body: studySet })
    return { getStudySetList, getStudySet, getMyStudySets, createStudySet, deleteStudySet }
}

export default useStudySet
