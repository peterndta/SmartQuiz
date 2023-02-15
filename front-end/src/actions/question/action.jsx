import { post, put, remove } from '~/utils/ApiCaller'

const useQuestion = () => {
    const createQuestion = (question) => post({ endpoint: '/api/questions', body: question })

    const updateQuestion = (question) => put({ endpoint: '/api/questions', body: question })

    const removeQuestion = (id) => remove({ endpoint: `/api/questions/${id}` })

    return { createQuestion, updateQuestion, removeQuestion }
}

export default useQuestion
