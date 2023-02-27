import { useEffect, useState } from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { Grid } from '@mui/material'

import Loading from '../../Loading'
import QuestionList from './QuestionList'
import SubmitCard from './SubmitCard'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { useStudySet } from '~/actions/study-set'

const TestPageBottom = () => {
    const { id } = useParams()
    const { getStudySetExam } = useStudySet()
    const showSnackbar = useSnackbar()
    const [studySetDetail, setStudySetDetail] = useState({})
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [selectQuestionAnswers, setSelectQuestionAnswers] = useState([])
    const [checkAnswers, setCheckAnswers] = useState({ isSubmit: false, questions: [], correctCount: 0, wrongCount: 0 })
    const { state } = useLocation()
    const exam = { time: state ? state.time : 30, quantity: state ? state.quantity : 20 }

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
        let correctAns = 0
        let wrongAns = 0
        studySetDetail.questions.forEach((item) => {
            const existsQuest = selectQuestionAnswers.find((quest) => quest.id === item.id)
            if (!existsQuest) {
                result.push({ ...item, isCorrect: false })
                wrongAns += 1
            } else {
                const correctAnswers = item.answers.filter((ans) => ans.isCorrectAnswer === true)

                if (correctAnswers.length !== existsQuest.ans.length) {
                    result.push({ ...item, isCorrect: false })
                    wrongAns += 1
                } else {
                    const isCorrect = correctAnswers.every((correctAns) =>
                        existsQuest.ans.some((choice) => choice.id === correctAns.id)
                    )
                    if (isCorrect) correctAns += 1
                    else wrongAns += 1
                    result.push({ ...item, isCorrect: isCorrect })
                }
            }
        })
        setCheckAnswers({ isSubmit: true, questions: result, correctCount: correctAns, wrongCount: wrongAns })
    }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        getStudySetExam(id, exam.quantity, signal)
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
                    checkAnswers={checkAnswers}
                />
            </Grid>
            <Grid item xs={5} md={5} lg={5}>
                <SubmitCard
                    questionLength={studySetDetail.questions.length}
                    selectedLength={selectQuestionAnswers.length}
                    handleSubmit={handleSubmit}
                    time={exam.time}
                    correctAns={checkAnswers.correctCount}
                    isSubmit={checkAnswers.isSubmit}
                />
            </Grid>
        </Grid>
    )
}

export default TestPageBottom
