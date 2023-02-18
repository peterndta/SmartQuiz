import { useCallback, useEffect, useRef, useState } from 'react'

import { useHistory, useLocation } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { AddBox, Article, FileDownload } from '@mui/icons-material'
import { Box, Button, Container, Tooltip, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'

import template from '../../assets/files/Template.xlsx'
import QuestionsExample from './Example'
import Modal from './Modal'
import ModalUpdate from './ModalUpdate'
import NewStudySet from './NewStudySet'
import Questions from './Questions'

import { initialValue } from '~/Mock'
import { useStudySet } from '~/actions/study-set'
import { AppStyles } from '~/constants/styles'
import { useAppSelector } from '~/hooks/redux-hooks'
import LocalStorageUtils from '~/utils/LocalStorageUtils'

const CreateStudySet = () => {
    const grades = useAppSelector((state) => state.grades)
    const { state } = useLocation()
    const [classLevel, setClassLevel] = useState(state ? state.classLevel : grades[0])
    const [subject, setSubject] = useState(state ? state.subject : initialValue)
    const [title, setTitle] = useState(state ? state.title : '')
    const [questions, setQuestions] = useState(state ? state.questions : [])
    const [openModal, setOpenModal] = useState(false)
    const { userId } = useAppSelector((state) => state.auth)
    const [modalMode, setModalMode] = useState('create')
    const [question, setQuestion] = useState({})
    const isSubmitSuccessfully = useRef(false)
    const history = useHistory()
    const { createStudySet } = useStudySet()

    const mutateQuestionHandler = (question) => {
        if (modalMode === 'create') setQuestions((prev) => [...prev, { ...question }])
        else if (modalMode === 'edit') {
            const questionIndex = questions.findIndex((quest) => quest.id === question.id)
            const updatedQuestions = JSON.parse(JSON.stringify(questions))
            updatedQuestions.splice(questionIndex, 1, question)
            setQuestions(updatedQuestions)
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

    const titleChangeHandler = ({ target: { value } }) => setTitle(value)

    const classChangeHandler = (name, value) => setClassLevel(() => ({ label: name, value: value }))

    const subjectChangeHandler = (name, value) => setSubject(() => ({ label: name, value: value }))

    const deleteQuestionDraft = useCallback(
        (id) => {
            const cloneQuestions = JSON.parse(JSON.stringify(questions))
            const updatedQuestion = cloneQuestions.filter((question) => question.id !== id)
            setQuestions(updatedQuestion)
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
        event.preventDefault()

        const formatQuestions = questions.map((item) => {
            return {
                name: item.quest,
                answers: item.ans.map((ans) => {
                    return {
                        name: ans.name,
                        isCorrectAnswer: ans.isCorrect,
                    }
                }),
            }
        })

        const studySet = {
            name: title,
            userId: +userId,
            gradeId: classLevel.value,
            subjectId: subject.value,
            classId: null,
            isPublic: true,
            questions: formatQuestions,
        }
        createStudySet(studySet).then(() => {
            if (state) {
                const drafts = LocalStorageUtils.getItem('create')
                const updateDrafts = drafts.studySet.filter((draft) => draft.id !== state.id)
                isSubmitSuccessfully.current = true

                LocalStorageUtils.setItem('create', {
                    path: '/create',
                    studySet: updateDrafts,
                })
            }
            history.replace('/')
        })
    }

    const saveDraft = () => {
        const drafts = LocalStorageUtils.getItem('create') || { path: history.location.pathname, studySet: [] }
        const draft = {
            id: uuid(),
            title,
            classLevel,
            subject,
            questions,
        }
        if (state) {
            const draftIndex = drafts.studySet.findIndex((draft) => draft.id === state.id)
            const updateDrafts = JSON.parse(JSON.stringify(drafts.studySet))
            updateDrafts.splice(draftIndex, 1, draft)
            LocalStorageUtils.setItem('create', {
                path: '/create',
                studySet: updateDrafts,
            })
        } else {
            drafts.studySet.push(draft)
            LocalStorageUtils.setItem('create', {
                path: '/create',
                studySet: drafts.studySet,
            })
        }
    }

    useEffect(() => {
        if (classLevel.value < 3 && subject.label === 'Hóa học') setSubject(initialValue)
        else if (classLevel.value <= 7 && subject.value > 7) setSubject(initialValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classLevel.value])

    useEffect(() => {
        return () => {
            if (history.location.pathname !== '/create' && !isSubmitSuccessfully.current) {
                saveDraft()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, subject.value, JSON.stringify(questions)])

    return (
        <Box component="form" onSubmit={submitStudySetHandler}>
            <Container maxWidth="xl">
                <NewStudySet infoStudySetHandler={infoStudySetHandler} infoStudySet={infoStudySet} />
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Tooltip
                        title="Tải template"
                        component="a"
                        href={template}
                        download="Template.xlsx"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Button variant="contained" sx={{ px: 5, py: 2 }}>
                            <FileDownload />
                        </Button>
                    </Tooltip>
                </Box>
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
                {questions.length > 0 ? (
                    <Questions
                        quest={JSON.stringify(questions)}
                        deleteQuestionDraft={deleteQuestionDraft}
                        openEditModal={openEditModal}
                    />
                ) : (
                    <QuestionsExample />
                )}
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
                        <Typography fontWeight={600} variant="h6" sx={{ ml: 1, color: AppStyles.colors['#FFFFFF'] }}>
                            Thêm thẻ mới
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{ borderRadius: 3, px: 5, mt: 3, backgroundColor: AppStyles.colors['#CCDBFF'] }}
                        color="primary"
                    >
                        <Article sx={{ color: AppStyles.colors['#000F33'] }} />
                    </Button>
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
                                variant="outlined"
                                style={{ backgroundColor: AppStyles.colors['#CCDBFF'], mr: 2 }}
                                onClick={saveDraft}
                            >
                                Lưu nháp
                            </ButtonCompo>
                            <ButtonCompo
                                variant="contained"
                                style={{ backgroundColor: AppStyles.colors['#004DFF'] }}
                                type="submit"
                                disable={questions.length === 0}
                            >
                                Tạo học phần
                            </ButtonCompo>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}

export default CreateStudySet
