import React, { useEffect, useState } from 'react'

import { clone, cloneDeep } from 'lodash'
import { useHistory, useParams } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'

import { Settings } from '@mui/icons-material'
import { Box, CardContent, IconButton, Skeleton, Tooltip, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'
import CardLayout from '~/components/CardLayout'

import NumberQuestionModal from './NumberQuestionModal'
import QuestionCard from './QuestionCard'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { useStudySet } from '~/actions/study-set'
import { AppStyles } from '~/constants/styles'
import { useAppSelector } from '~/hooks/redux-hooks'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const CardLayoutStyle = {
    mb: 2,
    borderRadius: 3,
    p: 1,
    height: 400,
    width: 850,
}

const ButtonStyle = {
    color: AppStyles.colors['#000F33'],
    textTransform: 'none',
    height: 56,
    backgroundColor: AppStyles.colors['#CCDBFF'],
    ':hover': {
        bgcolor: AppStyles.colors['#004DFF'],
        color: 'white',
    },
}

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
    const { userId } = useAppSelector((state) => state.auth)
    const [setIds, setSetIds] = useState(new Set([]))
    const history = useHistory()

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const checkAnswer = async () => {
        const getQuestion = { ...studySetDetail.questions[index] }
        const getAnswers = [...getQuestion.answers]
        const correctAnswers = getAnswers.filter((ans) => ans.isCorrectAnswer === true)

        if (index > 0 && index % 3 === 0) {
            const updatedSetIds = clone(setIds)

            let random = Math.floor(Math.random() * index)
            let getQuestionAtPosition = cloneDeep(studySetDetail.questions[random])
            let flag = true

            while (flag) {
                if (updatedSetIds.has(getQuestionAtPosition.id)) {
                    random = Math.floor(Math.random() * index)
                    getQuestionAtPosition = cloneDeep(studySetDetail.questions[random])
                } else {
                    updatedSetIds.add(getQuestionAtPosition.id)
                    flag = false
                    setSetIds(updatedSetIds)
                }
            }
            const updatedStudySet = cloneDeep(studySetDetail)
            updatedStudySet.questions.splice(index + 1, 0, getQuestionAtPosition)
            setStudySetDetail(updatedStudySet)
        }

        if (selectedChoices.length === 0) {
            showSnackbar({
                severity: 'error',
                children: 'Bạn chưa lựa chọn đáp án nào!',
            })
        } else if (selectedChoices.length !== correctAnswers.length) {
            setCorrectAnswers({ isSubmit: true, ans: [...correctAnswers] })
            showSnackbar({
                severity: 'error',
                children: 'Bạn đã lựa chọn đáp án sai!',
            })

            await delay(2000)
            setSelectedChoices([])
            setCorrectAnswers({ isSubmit: false, ans: [] })
            setIndex((prev) => prev + 1)
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
        const userIdd = userId ? userId : null
        getStudySet(id, userIdd, signal)
            .then((response) => {
                const data = response.data.data
                data.questions.forEach((question, index) => (question.index = index + 1))
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
                    {index === studySetDetail.questions.length && (
                        <CardLayout style={CardLayoutStyle}>
                            <CardContent
                                sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Box>
                                    <Typography align="center" variant="h5">
                                        Chúc mừng bạn đã học phần này.
                                    </Typography>
                                    <Box mt={3} display="flex" justifyContent="center">
                                        <ButtonCompo
                                            style={{ ...ButtonStyle, marginRight: 3 }}
                                            fullWidth={false}
                                            onClick={() => history.push(`/study-sets/${id}`)}
                                        >
                                            Trở về học phần
                                        </ButtonCompo>
                                        <ButtonCompo
                                            style={{ ...ButtonStyle }}
                                            fullWidth={false}
                                            onClick={() => history.push(`/study-sets/${id}/test`)}
                                        >
                                            Làm kiểm tra
                                        </ButtonCompo>
                                    </Box>
                                </Box>
                            </CardContent>
                        </CardLayout>
                    )}
                </SwipeableViews>
            )}
        </Box>
    )
}

export default LearnPageBottom
