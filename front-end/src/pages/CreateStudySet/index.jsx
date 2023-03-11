import React, { useCallback, useEffect, useRef, useState } from 'react'

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { cloneDeep } from 'lodash'
import { useHistory, useLocation } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { AddBox, ImportExport } from '@mui/icons-material'
import { Box, Container, IconButton, LinearProgress, Tooltip, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'
import ProgressActionLoading from '~/components/ProgressActionLoading'

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
import { storage } from '~/utils/Firebase'
import LocalStorageUtils from '~/utils/LocalStorageUtils'

const CreateStudySet = () => {
    const grades = useAppSelector((state) => state.grades)
    const { state } = useLocation()
    const showSnackbar = useSnackbar()
    const isSubmitSuccessfully = useRef(false)
    const openId = useRef(uuid())
    const history = useHistory()
    const { createStudySet } = useStudySet()
    const { userId } = useAppSelector((state) => state.auth)
    const { importQuestion } = useQuestion()
    const [classLevel, setClassLevel] = useState(state ? state.classLevel : grades[0])
    const [subject, setSubject] = useState(state ? state.subject : initialValue)
    const [title, setTitle] = useState(state ? state.title : '')
    const [questions, setQuestions] = useState(state ? state.questions : [])
    const [openModal, setOpenModal] = useState(false)
    const [modalMode, setModalMode] = useState('create')
    const [question, setQuestion] = useState({})
    const [openImportExport, setOpenImportExport] = useState(false)
    const [files, setFiles] = useState()
    const [images, setImages] = useState([])
    const [poster, setPoster] = useState({ src: null, file: null })
    const [load, setLoad] = useState(false)

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

    const onImageChange = (e, id) => {
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

        const imageUrl = URL.createObjectURL(e.target.files[0])

        const updatedQuestions = cloneDeep(questions)
        const position = updatedQuestions.findIndex((quest) => quest.id === id)
        const updatedQuestion = updatedQuestions.find((quest) => quest.id === id)
        updatedQuestion.image = imageUrl
        updatedQuestions.splice(position, 1, updatedQuestion)

        if (images.length === 0) {
            setImages((prev) => [...prev, { questionId: id, file: file }])
        } else if (images.length > 0) {
            const imageIndex = images.findIndex((image) => image.questionId === id)
            if (imageIndex === -1) {
                setImages((prev) => [...prev, { questionId: id, file: file }])
            } else {
                const updatedImages = cloneDeep(images)
                updatedImages.splice(imageIndex, 1, { questionId: id, file: file })
                setImages(updatedImages)
            }
        }
        setPoster({ src: imageUrl, file: file })
        setQuestions(updatedQuestions)
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
        setLoad(true)
        event.preventDefault()
        if (images.length > 0) {
            const imageUrls = []

            images.forEach((image) => {
                let fileType = 'png'
                if (image.file.type.endsWith('jpg')) fileType = 'jpg'
                else if (image.file.type.endsWith('jpeg')) fileType = 'jpeg'
                const storageRef = ref(storage, `images/${image.file.name + uuid()}.${fileType}`)
                const uploadTask = uploadBytesResumable(storageRef, image.file)
                uploadTask.on(
                    'state_changed',
                    () => {},
                    () => {
                        showSnackbar({
                            severity: 'error',
                            children: 'Something went wrong, cannot upload question image.',
                        })
                        setLoad(false)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            imageUrls.push({ imageUrl: url, questId: image.questionId })
                            if (imageUrls.length === images.length) {
                                const updatedQuestion = questions.map((question) => {
                                    imageUrls.forEach((image) => {
                                        if (question.id === image.questId) {
                                            question.image = image.imageUrl
                                        }
                                    })
                                    return question
                                })
                                const formatQuestions = updatedQuestion.map((item) => {
                                    return {
                                        name: item.quest,
                                        imageUrl: item.image,
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
                                createStudySet(studySet)
                                    .then((res) => {
                                        const id = res.data.data
                                        isSubmitSuccessfully.current = true
                                        if (state) {
                                            const drafts = LocalStorageUtils.getItem('create')
                                            const updateDrafts = drafts.studySet.filter(
                                                (draft) => draft.id !== state.id
                                            )

                                            LocalStorageUtils.setItem('create', {
                                                path: '/create',
                                                studySet: updateDrafts,
                                            })
                                        }
                                        setLoad(false)
                                        history.replace(`/study-sets/${id}`)
                                    })
                                    .catch(() => {
                                        showSnackbar({
                                            severity: 'error',
                                            children: 'Something went wrong, cannot upload question image.',
                                        })
                                        setLoad(false)
                                    })
                            }
                        })
                    }
                )
            })
        } else {
            const formatQuestions = questions.map((item) => {
                return {
                    name: item.quest,
                    imageUrl: null,
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
            createStudySet(studySet)
                .then((res) => {
                    const id = res.data.data
                    isSubmitSuccessfully.current = true
                    if (state) {
                        const drafts = LocalStorageUtils.getItem('create')
                        const updateDrafts = drafts.studySet.filter((draft) => draft.id !== state.id)

                        LocalStorageUtils.setItem('create', {
                            path: '/create',
                            studySet: updateDrafts,
                        })
                    }
                    setLoad(false)
                    history.replace(`/study-sets/${id}`)
                })
                .catch(() => {
                    showSnackbar({
                        severity: 'error',
                        children: 'Something went wrong, cannot upload question image.',
                    })
                    setLoad(false)
                })
        }
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
            poster.src && URL.revokeObjectURL(poster.src)
        }
    }, [poster.src])

    useEffect(() => {
        return () => {
            if (history.location.pathname !== '/create' && !isSubmitSuccessfully.current) {
                saveDraft()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, subject.value, JSON.stringify(questions)])

    return (
        <React.Fragment>
            {load && <ProgressActionLoading />}
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
                                    <Modal
                                        onClose={closeModalHandler}
                                        submitQuestionHandler={mutateQuestionHandler}
                                        open={openModal}
                                        openId={openId}
                                    />
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
                            images={images}
                            onImageChange={onImageChange}
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
        </React.Fragment>
    )
}

export default CreateStudySet
