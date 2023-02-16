import React, { useEffect, useRef, useState } from 'react'

import { useParams } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'

import { Settings } from '@mui/icons-material'
import { Box, IconButton, Skeleton, Tooltip } from '@mui/material'

import NumberQuestionModal from './NumberQuestionModal'
import QuestionCard from './QuestionCard'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { useStudySet } from '~/actions/study-set'
import { AppStyles } from '~/constants/styles'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const LearnPageBottom = ({ start }) => {
    const { id } = useParams()
    const { getStudySet } = useStudySet()
    const showSnackbar = useSnackbar()
    const [selectedChoices, setSelectedChoices] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState({ isSubmit: false, ans: [] })
    const [studySetDetail, setStudySetDetail] = useState({})
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(start)
    const timeout = useRef(1)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const checkAnswer = async () => {
        const getQuestion = { ...studySetDetail.questions[index] }
        const getAnswers = [...getQuestion.answers]
        const correctAnswers = getAnswers.filter((ans) => ans.isCorrectAnswer === true)

        if (selectedChoices.length === 0) {
            updateStudySetQuestion(getQuestion)
            showSnackbar({
                severity: 'error',
                children: 'Bạn chưa lựa chọn đáp án nào!',
            })
        } else if (selectedChoices.length !== correctAnswers.length) {
            setCorrectAnswers({ isSubmit: true, ans: [...correctAnswers] })
            updateStudySetQuestion(getQuestion)
            showSnackbar({
                severity: 'error',
                children: 'Bạn đã lựa chọn đáp án sai!',
            })
            timeout.current = setTimeout(() => {
                setSelectedChoices([])
                setCorrectAnswers({ isSubmit: false, ans: [] })
                setIndex((prev) => prev + 1)
            }, 2000)
        } else if (selectedChoices.length === correctAnswers.length) {
            setCorrectAnswers({ isSubmit: true, ans: [...correctAnswers] })
            const isCorrect = correctAnswers.every((correctAns) =>
                selectedChoices.some((choice) => choice.id === correctAns.id)
            )
            const severity = isCorrect ? 'success' : 'error'
            const children = isCorrect ? 'Chúc mừng bạn đã vượt qua!' : 'Bạn đã lựa chọn đáp án sai!'
            showSnackbar({ severity, children })
            await delay(2000)
            setSelectedChoices([])
            setCorrectAnswers({ isSubmit: false, ans: [] })
            setIndex((prevIndex) => prevIndex + 1)
        }
    }

    const updateStudySetQuestion = (question) => {
        const updatedStudySet = JSON.parse(JSON.stringify(studySetDetail))
        updatedStudySet.questions.push(question)
        setStudySetDetail(updatedStudySet)
    }

    const handleSelectedChoices = (answer) => {
        if (selectedChoices.length === 0) {
            setSelectedChoices([answer])
        } else {
            const position = selectedChoices.findIndex((ans) => ans.id === answer.id)
            if (position === -1) {
                setSelectedChoices([...selectedChoices, answer])
            } else {
                setSelectedChoices(selectedChoices.filter((ans) => ans.id !== answer.id))
            }
        }
    }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        getStudySet(id, signal)
            .then((response) => {
                const data = response.data.data
                data.questions.forEach((question, index) => (question.index = index))
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

    useEffect(() => {
        setIndex(start - 1)
        return () => {
            clearTimeout(timeout.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start])

    const disableButton = correctAnswers.isSubmit ? true : false

    return (
        <Box maxWidth={850} sx={{ m: '0 auto', mt: 3, mb: 5 }}>
            <NumberQuestionModal
                open={open}
                handleClose={handleClose}
                numberOfQuestion={studySetDetail?.questions?.length}
            />
            <Box display="flex" justifyContent="right" mb={2}>
                <Tooltip title="Tùy chọn" placement="bottom">
                    <IconButton
                        aria-label="create"
                        size="medium"
                        sx={{ border: '1px solid #767680' }}
                        onClick={handleOpen}
                    >
                        <Settings fontSize="small" sx={{ color: AppStyles.colors['#767680'] }} />
                    </IconButton>
                </Tooltip>
            </Box>
            {isFirstRender ? (
                <React.Fragment>
                    <Skeleton sx={{ height: 425, mb: 2, mt: 6 }} animation="wave" variant="rounded" />
                </React.Fragment>
            ) : (
                <SwipeableViews index={index} style={{ height: 'auto' }}>
                    {studySetDetail.questions.map((question, index) => (
                        <QuestionCard
                            question={question}
                            key={index}
                            handleSelectedChoices={handleSelectedChoices}
                            correctAnswers={correctAnswers}
                            selectedChoices={selectedChoices}
                            checkAnswer={checkAnswer}
                            disableButton={disableButton}
                            id={id}
                        />
                    ))}
                </SwipeableViews>
            )}
        </Box>
    )
}

export default LearnPageBottom
