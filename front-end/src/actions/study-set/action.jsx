import { get, post } from '~/utils/ApiCaller'

const useStudySet = () => {
    const getStudySetList = (signal) => get({ endpoint: '/api/StudySets', signal })
    const getStudySet = (id, signal) =>
        get({
            endpoint: `/api/StudySets/${id}?userId=1`,
            signal: signal,
        })
    const createStudySet = (studySet) => post({ endpoint: '/api/studySets', body: studySet })
    return { getStudySetList, getStudySet, createStudySet }
}

export default useStudySet
