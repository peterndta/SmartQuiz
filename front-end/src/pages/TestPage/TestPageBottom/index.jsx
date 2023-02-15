import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { Grid } from '@mui/material'

import Loading from '../../Loading'
import QuestionList from './QuestionList'
import SubmitCard from './SubmitCard'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { useStudySet } from '~/actions/study-set'

const TestPageBottom = () => {
    const { id } = useParams()
    const { getStudySet } = useStudySet()
    const showSnackbar = useSnackbar()
    const [studySetDetail, setStudySetDetail] = useState({})
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [selectQuestionAnswers, setSelectQuestionAnswers] = useState([])
    const [checkAnswers, setCheckAnswers] = useState({ isSubmit: false, questions: [] })

    const handleSelectQuestion = (question) => {
        if (selectQuestionAnswers.length === 0) {
            setSelectQuestionAnswers([{ id: question.id, ans: [question.answer] }])
        } else {
            const position = selectQuestionAnswers.findIndex((quest) => quest.id === question.id)
            if (position === -1) {
                const newQuest = { id: question.id, ans: [question.answer] }
                setSelectQuestionAnswers((prev) => [...prev, newQuest])
            } else {
                const quest = JSON.parse(JSON.stringify(selectQuestionAnswers[position]))

                const answerPosition = quest.ans.findIndex((answer) => answer.id === question.answer.id)
                if (answerPosition === -1) {
                    quest.ans.push(question.answer)
                    const updatedQuestions = JSON.parse(JSON.stringify(selectQuestionAnswers))
                    updatedQuestions.splice(position, 1, quest)
                    setSelectQuestionAnswers(updatedQuestions)
                } else {
                    quest.ans.splice(answerPosition, 1)
                    if (quest.ans.length === 0) {
                        const updatedQuestions = selectQuestionAnswers.filter((item) => item.id !== quest.id)
                        setSelectQuestionAnswers(updatedQuestions)
                    } else {
                        const updatedQuestions = JSON.parse(JSON.stringify(selectQuestionAnswers))
                        updatedQuestions.splice(position, 1, quest)
                        setSelectQuestionAnswers(updatedQuestions)
                    }
                }
            }
        }
    }

    const handleSubmit = () => {
        const result = []
        studySetDetail.questions.forEach((item) => {
            const exists = selectQuestionAnswers.find((quest) => quest.id === item.id)
            if (!exists) result.push({ ...item, isCorrect: false })
            else {
                const correctAnswers = item.answers.filter((ans) => ans.isCorrectAnswer === true)

                if (correctAnswers.length !== selectQuestionAnswers.ans.length) {
                    result.push({ ...item, isCorrect: false })
                } else {
                    const isCorrect = correctAnswers.every((correctAns) =>
                        selectQuestionAnswers.ans.some((choice) => choice.id === correctAns.id)
                    )
                    result.push({ ...item, isCorrect: isCorrect })
                }
            }
        })

        console.log(result)
    }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        getStudySet(id, signal)
            .then((response) => {
                const data = response.data.data

                setStudySetDetail(data)
                setIsFirstRender(false)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
                setIsFirstRender(false)
            })
        return () => {
            controller.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return isFirstRender ? (
        <Loading />
    ) : (
        <Grid maxWidth={1390} container spacing={4} sx={{ m: '0 auto', mt: 2, mb: 5 }}>
            <Grid item xs={5} md={5} lg={7}>
                <QuestionList
                    questions={studySetDetail.questions}
                    handleSelectQuestion={handleSelectQuestion}
                    selectQuestionAnswers={selectQuestionAnswers}
                />
            </Grid>
            <Grid item xs={5} md={5} lg={5}>
                <SubmitCard
                    questionLength={studySetDetail.questions.length}
                    selectedLength={selectQuestionAnswers.length}
                    handleSubmit={handleSubmit}
                />
            </Grid>
        </Grid>
    )
}

export default TestPageBottom

// [
//     {
//         id: 1,
//         value: 1,
//         ans: [
//             {
//                 id:1,
//                 isCorrect: false
//             },
//             {
//                 id:2,
//                 isCorrect: true
//             }
//         ]
//     }
//     {
//         id: 2,
//         value: 2,
//         ans: [
//             {
//                 id:1,
//                 isCorrect: true
//             },
//             {
//                 id:2,
//                 isCorrect: false
//             },
//             {
//                 id:3,
//                 isCorrect: false
//             }
//         ]
//     }
// ]

// [
//     {
//         id: 1,
//         value: 1,
//         ans: [
//             {
//                 id:1,
//                 isCorrect: false
//             },
//             {
//                 id:2,
//                 isCorrect: true
//             },
//             {
//                 id:3,
//                 isCorrect: false
//             }
//         ]
//     }
//     {
//         id: 2,
//         value: 2,
//         ans: [
//             {
//                 id:1,
//                 isCorrect: true
//             },
//             {
//                 id:2,
//                 isCorrect: false
//             },
//             {
//                 id:3,
//                 isCorrect: false
//             }
//         ]
//     }
// ]

// [
//     {
//         id: 1,
//         value: 1,
//         ans: [
//             {
//                 id:1,
//                 isCorrect: false
//             },
//             {
//                 id:2,
//                 isCorrect: true
//             }
//         ]
//     }
// ]
