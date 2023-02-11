import { useCallback, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { AddBox } from '@mui/icons-material'
import { Box, Container, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'

import Loading from '../Loading'
import QuestionsExample from './Example'
import Modal from './Modal'
import ModalUpdate from './ModalUpdate'
import NewStudySet from './NewStudySet'
import Questions from './Questions'

import { initialValue, level, levelSchool } from '~/Mock'
import { useStudySet } from '~/actions/study-set'
import { AppStyles } from '~/constants/styles'

const UpdateStudySet = () => {
    const { id } = useParams()
    const { getStudySet } = useStudySet()
    const [loading, setIsLoading] = useState(true)
    const [schoolLevel, setSchoolLevel] = useState(initialValue)
    const [isUniversity, setIsUniversity] = useState(false)
    const [universityName, setUniversityName] = useState(initialValue)
    const [classLevel, setClassLevel] = useState(initialValue)
    const [subject, setSubject] = useState(initialValue)
    const [title, setTitle] = useState('')
    const [questions, setQuestions] = useState([])
    const [openModal, setOpenModal] = useState(false)
    // const { userId } = useAppSelector((state) => state.auth)
    const [modalMode, setModalMode] = useState('create')
    const [question, setQuestion] = useState({})

    const mutateQuestionHandler = (question) => {
        if (modalMode === 'create') setQuestions((prev) => [...prev, question])
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

    const levelChangeHandler = (name, value) => setSchoolLevel(() => ({ label: name, value: value }))

    const universityNameChangeHandler = (name, value) => setUniversityName(() => ({ label: name, value: value }))

    const classChangeHandler = (name, value) => setClassLevel(() => ({ label: name, value: value }))

    const subjectChangeHandler = (name, value) => setSubject(() => ({ label: name, value: value }))

    const deleteQuestionDraft = useCallback(
        (id) => {
            const cloneQuestions = JSON.parse(JSON.stringify(questions))
            const updatedQuestion = cloneQuestions.filter((question) => question.id !== id)
            setQuestions(updatedQuestion)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [JSON.stringify(questions)]
    )

    const infoStudySetHandler = {
        titleChangeHandler,
        levelChangeHandler,
        universityNameChangeHandler,
        classChangeHandler,
        subjectChangeHandler,
    }

    const infoStudySet = {
        schoolLevel,
        isUniversity,
        universityName,
        classLevel,
        subject,
        title,
        questions,
    }

    useEffect(() => {
        if (schoolLevel.label === level.university) {
            setIsUniversity(true)
        } else {
            setIsUniversity(false)
            if (classLevel.value < 3 && subject.label === 'Hóa') setSubject(initialValue)
        }
        setClassLevel(initialValue)
        setSubject(initialValue)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schoolLevel.value])

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        getStudySet(id, signal).then((res) => {
            const studySet = res.data.data
            setTitle(studySet.name)
            if (studySet.schoolId) {
                setIsUniversity(true)
                setSchoolLevel(levelSchool[2])
                setUniversityName({ value: studySet.schoolId, label: studySet.schoolName })
            } else {
                setIsUniversity(false)
                if (studySet.gradeId > 5) {
                    setSchoolLevel(levelSchool[1])
                } else {
                    setSchoolLevel(levelSchool[0])
                }
                setClassLevel({ value: studySet.gradeId, label: studySet.gradeName })
                setSubject({ value: studySet.subjectId, label: studySet.subjectName })
            }
            setIsLoading(false)
        })
        return () => {
            controller.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return loading ? (
        <Loading />
    ) : (
        <Box component="form">
            <Container maxWidth="xl">
                <NewStudySet infoStudySetHandler={infoStudySetHandler} infoStudySet={infoStudySet} />
                {(() => {
                    switch (modalMode) {
                        case 'create':
                            return (
                                <Modal
                                    onClose={closeModalHandler}
                                    submitQuestionHandler={mutateQuestionHandler}
                                    open={openModal}
                                />
                            )
                        case 'edit':
                            return (
                                <ModalUpdate
                                    onClose={closeModalHandler}
                                    submitQuestionHandler={mutateQuestionHandler}
                                    open={openModal}
                                    question={question}
                                />
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
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mt={3}
                    py={4}
                    sx={{
                        borderRadius: 4,
                        backgroundColor: AppStyles.colors['#CCDBFF'],
                        transition: 'all 0.3s linear',
                        cursor: 'pointer',
                        '&:hover': {
                            opacity: 0.75,
                        },
                    }}
                    onClick={openModalHandler}
                >
                    <AddBox sx={{ color: AppStyles.colors['#000F33'] }} />
                    <Typography fontWeight={600} variant="h6" sx={{ color: AppStyles.colors['#000F33'], ml: 1 }}>
                        Thêm thẻ mới
                    </Typography>
                </Box>
            </Container>
            <Box
                sx={{
                    backgroundColor: AppStyles.colors['#FAFBFF'],
                    mt: 3,
                }}
            >
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

export default UpdateStudySet
