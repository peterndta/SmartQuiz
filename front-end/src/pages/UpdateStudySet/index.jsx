import React, { useCallback, useEffect, useRef, useState } from 'react'

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useHistory, useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { AddBox } from '@mui/icons-material'
import { Box, Container, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'
import ProgressActionLoading from '~/components/ProgressActionLoading'

import Loading from '../Loading'
import Modal from './Modal'
import ModalUpdate from './ModalUpdate'
import NewStudySet from './NewStudySet'
import Questions from './Questions'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { initialValue } from '~/Mock'
import { useQuestion } from '~/actions/question'
import { useStudySet } from '~/actions/study-set'
import { AppStyles } from '~/constants/styles'
import { useAppSelector } from '~/hooks/redux-hooks'
import { storage } from '~/utils/Firebase'

const UpdateStudySet = () => {
    const { id } = useParams()
    const [classLevel, setClassLevel] = useState(initialValue)
    const [subject, setSubject] = useState(initialValue)
    const [title, setTitle] = useState('')
    const [questions, setQuestions] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [modalMode, setModalMode] = useState('create')
    const [question, setQuestion] = useState({})
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const { userId } = useAppSelector((state) => state.auth)
    const { getStudySet, updateStudySet } = useStudySet()
    const { updateQuestion, createQuestion, removeQuestion } = useQuestion()
    const showSnackbar = useSnackbar()
    const isFirstRender = useRef(true)

    const mutateQuestionHandler = (question) => {
        setIsLoading(true)
        const { id: questId, quest, image } = question
        const formatAnswers = question.ans.map((answer) => ({
            name: answer.name,
            isCorrectAnswer: answer.isCorrect,
        }))
        if (modalMode === 'create') {
            const formatQuestion = { name: quest, answers: formatAnswers, studySetId: id, imageUrl: null }
            createQuestion(formatQuestion)
                .then((res) => {
                    const newQuestion = res.data.data

                    const formattedAnswers = newQuestion.answers.map((answer) => {
                        return {
                            name: answer.name,
                            isCorrect: answer.isCorrectAnswer,
                            id: answer.id,
                        }
                    })
                    const formattedQuestion = {
                        quest: newQuestion.name,
                        id: newQuestion.id,
                        ans: formattedAnswers,
                        image: null,
                    }

                    setQuestions((prev) => [...prev, { ...formattedQuestion }])
                    showSnackbar({
                        severity: 'success',
                        children: 'Tạo câu hỏi thành công!',
                    })
                })
                .catch(() => {
                    showSnackbar({
                        severity: 'error',
                        children: 'Học phần này có thể đã bị xóa, vui lòng tải lại trang!',
                    })
                })
                .finally(() => {
                    setIsLoading(false)
                })
        } else if (modalMode === 'edit') {
            const formatQuestion = { id: questId, name: quest, answers: formatAnswers, imageUrl: image }
            updateQuestion(formatQuestion)
                .then((res) => {
                    const updatedQuestion = res.data.data
                    const questionIndex = questions.findIndex((quest) => quest.id === question.id)
                    const updatedQuestions = JSON.parse(JSON.stringify(questions))
                    const formattedAnswers = updatedQuestion.answers.map((answer) => {
                        return {
                            name: answer.name,
                            isCorrect: answer.isCorrectAnswer,
                            id: answer.id,
                        }
                    })
                    const formattedQuestion = {
                        quest: updatedQuestion.name,
                        id: updatedQuestion.id,
                        ans: formattedAnswers,
                        image,
                    }
                    updatedQuestions.splice(questionIndex, 1, formattedQuestion)
                    setQuestions(updatedQuestions)
                    showSnackbar({
                        severity: 'success',
                        children: 'Thay đổi câu hỏi thành công!',
                    })
                })
                .catch(() => {
                    showSnackbar({
                        severity: 'error',
                        children: 'Học phần này có thể đã bị xóa, vui lòng tải lại trang!',
                    })
                })
                .finally(() => {
                    setIsLoading(false)
                })
            setQuestion({})
            closeModalHandler()
        }
    }

    const openModalHandler = () => {
        setModalMode('create')
        setOpenModal(true)
    }

    const closeModalHandler = () => {
        setOpenModal(false)
    }

    const openEditModal = (id) => {
        const questionSelected = questions.find((quest) => quest.id === id)
        setQuestion(questionSelected)
        setModalMode('edit')
        setOpenModal(true)
    }

    const updateImageHandler = (e, question) => {
        const file = e.target.files[0]
        if (!file) return

        const { type } = file
        if (!(type.endsWith('jpeg') || !type.endsWith('png') || !type.endsWith('jpg'))) {
            showSnackbar({
                severity: 'error',
                children: 'Event poster can only be jpeg, png and jpg file.',
            })
            return
        }

        if (file) {
            setIsLoading(true)
            let fileType = 'png'
            if (file.type.endsWith('jpg')) fileType = 'jpg'
            else if (file.type.endsWith('jpeg')) fileType = 'jpeg'
            const storageRef = ref(storage, `images/${file.name + uuid()}.${fileType}`)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on(
                'state_changed',
                () => {},
                () => {
                    showSnackbar({
                        severity: 'error',
                        children: 'Something went wrong, cannot upload question image.',
                    })
                    setIsLoading(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        const { id: questId, quest } = question
                        const formatAnswers = question.ans.map((answer) => ({
                            name: answer.name,
                            isCorrectAnswer: answer.isCorrect,
                        }))
                        const formatQuestion = { id: questId, name: quest, answers: formatAnswers, imageUrl: url }
                        updateQuestion(formatQuestion)
                            .then((res) => {
                                const updatedQuestion = res.data.data
                                const questionIndex = questions.findIndex((quest) => quest.id === question.id)
                                const updatedQuestions = JSON.parse(JSON.stringify(questions))
                                const formattedAnswers = updatedQuestion.answers.map((answer) => {
                                    return {
                                        name: answer.name,
                                        isCorrect: answer.isCorrectAnswer,
                                        id: answer.id,
                                    }
                                })
                                const formattedQuestion = {
                                    quest: updatedQuestion.name,
                                    id: updatedQuestion.id,
                                    ans: formattedAnswers,
                                    image: updatedQuestion.imageUrl,
                                }
                                updatedQuestions.splice(questionIndex, 1, formattedQuestion)
                                setQuestions(updatedQuestions)
                                showSnackbar({
                                    severity: 'success',
                                    children: 'Thay đổi hình ảnh thành công!',
                                })
                            })
                            .finally(() => {
                                setIsLoading(false)
                            })
                    })
                }
            )
        }
    }

    const titleChangeHandler = ({ target: { value } }) => setTitle(value)

    const classChangeHandler = (name, value) => setClassLevel(() => ({ label: name, value: value }))

    const subjectChangeHandler = (name, value) => setSubject(() => ({ label: name, value: value }))

    const deleteQuestionDraft = useCallback(
        (id) => {
            removeQuestion(id)
                .then(() => {
                    const cloneQuestions = JSON.parse(JSON.stringify(questions))

                    const updatedQuestion = cloneQuestions.filter((question) => question.id !== id)
                    setQuestions(updatedQuestion)
                })
                .catch(() => {
                    showSnackbar({
                        severity: 'error',
                        children: 'Học phần này có thể đã bị xóa, vui lòng tải lại trang!',
                    })
                })
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [JSON.stringify(questions.length)]
    )

    const infoStudySetHandler = {
        titleChangeHandler,
        classChangeHandler,
        subjectChangeHandler,
    }

    const infoStudySet = {
        classLevel,
        subject,
        title,
        questions,
    }

    const submitStudySetHandler = (event) => {
        setIsLoading(true)
        event.preventDefault()
        const studySet = {
            id: id,
            name: title,
            subjectId: subject.value,
            gradeId: classLevel.value,
            classId: null,
            isPublic: true,
        }
        updateStudySet(studySet)
            .then(() => {
                history.push(`/study-sets/${id}`)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Học phần này có thể đã bị xóa, vui lòng tải lại trang!',
                })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        const userIdd = userId ? userId : null
        getStudySet(id, userIdd, signal)
            .then((res) => {
                const studySet = res.data.data
                const formatQuestions = studySet.questions.map((question) => {
                    return {
                        quest: question.name,
                        id: question.id,
                        image: question.imageUrl,
                        ans: question.answers.map((answer) => {
                            return {
                                name: answer.name,
                                isCorrect: answer.isCorrectAnswer,
                                id: answer.id,
                            }
                        }),
                    }
                })
                setTitle(studySet.name)
                setClassLevel({ label: studySet.gradeName, value: studySet.gradeId })
                setSubject({ label: studySet.subjectName, value: studySet.subjectId })
                setQuestions(formatQuestions)
            })
            .finally(() => {
                setIsLoading(false)
                isFirstRender.current = false
            })
        return () => {
            controller.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (classLevel.value < 3 && subject.label === 'Hóa học') setSubject(initialValue)
        else if (classLevel.value <= 7 && subject.value > 7) setSubject(initialValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classLevel.value])

    return isLoading && isFirstRender.current ? (
        <Loading />
    ) : (
        <React.Fragment>
            {isLoading && !isFirstRender.current && <ProgressActionLoading />}
            <Box component="form" onSubmit={submitStudySetHandler}>
                <Container maxWidth="xl">
                    <NewStudySet infoStudySetHandler={infoStudySetHandler} infoStudySet={infoStudySet} />
                    {(() => {
                        switch (modalMode) {
                            case 'create':
                                return (
                                    openModal && (
                                        <Modal
                                            onClose={closeModalHandler}
                                            submitQuestionHandler={mutateQuestionHandler}
                                            open={openModal}
                                        />
                                    )
                                )
                            case 'edit':
                                return (
                                    openModal && (
                                        <ModalUpdate
                                            onClose={closeModalHandler}
                                            submitQuestionHandler={mutateQuestionHandler}
                                            open={openModal}
                                            question={question}
                                        />
                                    )
                                )
                        }
                    })()}
                    <Questions
                        quest={JSON.stringify(questions)}
                        deleteQuestionDraft={deleteQuestionDraft}
                        openEditModal={openEditModal}
                        updateImageHandler={updateImageHandler}
                    />
                    <Box display="flex">
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            mt={3}
                            py={4}
                            sx={{
                                borderRadius: 4,
                                backgroundColor: AppStyles.colors['#185CFF'],
                                transition: 'all 0.3s linear',
                                cursor: 'pointer',
                                '&:hover': {
                                    opacity: 0.75,
                                },
                                flex: 1,
                                mr: 2,
                            }}
                            onClick={openModalHandler}
                        >
                            <AddBox sx={{ color: AppStyles.colors['#FFFFFF'] }} />
                            <Typography
                                fontWeight={600}
                                variant="h6"
                                sx={{ ml: 1, color: AppStyles.colors['#FFFFFF'] }}
                            >
                                Thêm thẻ mới
                            </Typography>
                        </Box>
                    </Box>
                </Container>
                <Box sx={{ backgroundColor: AppStyles.colors['#FAFBFF'], mt: 3 }}>
                    <Container maxWidth="xl">
                        <Box display="flex" justifyContent="space-between" py={3} alignItems="center">
                            <Box display="flex" alignItems="baseline">
                                <Typography variant="h6" sx={{ color: '#000000', mr: 2, fontWeight: 600 }}>
                                    Tổng câu hỏi
                                </Typography>
                                <Typography variant="h5" sx={{ color: '#000000', fontWeight: 600 }}>
                                    {questions.length}
                                </Typography>
                            </Box>
                            <Box display="flex">
                                <ButtonCompo
                                    variant="contained"
                                    style={{ backgroundColor: AppStyles.colors['#004DFF'] }}
                                    type="submit"
                                    disable={questions.length === 0}
                                >
                                    Lưu học phần
                                </ButtonCompo>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default UpdateStudySet
