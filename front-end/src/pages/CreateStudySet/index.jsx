import { useCallback, useEffect, useState } from 'react'

import { useHistory, useLocation } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { AddBox, Article, ImportExport } from '@mui/icons-material'
import { Box, Button, Container, IconButton, LinearProgress, Tooltip, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'

import QuestionsExample from './Example'
import ImportExportModal from './ImportExportModal'
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
    const history = useHistory()
    const { createStudySet } = useStudySet()
    const { importQuestion } = useQuestion()
    const [openImportExport, setOpenImportExport] = useState(false)
    const [files, setFiles] = useState()
    const [load, setLoad] = useState(false)
    const showSnackbar = useSnackbar()
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

    const onInputChange = (e) => {
        setFiles(e.target.files[0])
    }
    const handleUpload = () => {
        setOpenImportExport(false)
        setLoad(true)
        closeModalHandler()
        const formData = new FormData()
        formData.append('formFile', files)
        importQuestion(formData)
            .then((response) => {
                const data = response.data.data
                const formatQuestions = data.map((item) => {
                    return {
                        quest: item.name,
                        id: uuid(),
                        ans: item.answers.map((answer) => {
                            return {
                                id: uuid(),
                                name: answer.name,
                                isCorrect: answer.isCorrectAnswer,
                            }
                        }),
                    }
                })
                setQuestions(formatQuestions)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
            .finally(() => {
                setLoad(false)
            })
    }

    const handleOpenImportExport = () => setOpenImportExport(true)

    const handleCloseImportExport = () => setOpenImportExport(false)

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
                const drafts = LocalStorageUtils.getItem('drafts')
                const updateDrafts = drafts.studySet.filter((draft) => draft.id !== state.id)
                LocalStorageUtils.setItem('drafts', {
                    path: '/create',
                    studySet: updateDrafts,
                })
            }
            history.push('/')
        })
    }

    const saveDraft = () => {
        const drafts = LocalStorageUtils.getItem('drafts') || { path: history.location.pathname, studySet: [] }
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
            if (history.location.pathname !== '/create') {
                saveDraft()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, subject.value, JSON.stringify(questions)])

    return (
        <Box component="form" onSubmit={submitStudySetHandler}>
            <ImportExportModal
                open={openImportExport}
                handleClose={handleCloseImportExport}
                handleUpload={handleUpload}
                onInputChange={onInputChange}
                files={files}
            />
            <Container maxWidth="xl">
                <NewStudySet infoStudySetHandler={infoStudySetHandler} infoStudySet={infoStudySet} />
                <Box display="flex" justifyContent="flex-end" mt={2} alignItems="center">
                    {load && (
                        <Box mr={1}>
                            <Typography sx={{ fontSize: 16, color: AppStyles.colors['#333333'], fontWeight: 500 }}>
                                Tệp đang được tải lên
                            </Typography>
                            <Box display="flex" justifyContent="flex-end" mt={1}>
                                <LinearProgress sx={{ width: 120 }} />
                            </Box>
                        </Box>
                    )}

                    <Tooltip title="Tải lên câu hỏi bằng Excel">
                        <IconButton
                            aria-label="create"
                            size="medium"
                            sx={{ border: '1px solid #767680' }}
                            onClick={handleOpenImportExport}
                        >
                            <ImportExport fontSize="medium" sx={{ color: AppStyles.colors['#767680'] }} />
                        </IconButton>
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
