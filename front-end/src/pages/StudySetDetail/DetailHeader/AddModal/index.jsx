import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { HighlightOffOutlined } from '@mui/icons-material'
import { Box, IconButton, Modal, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'
import LoadingClasses from '~/components/LoadingClasses'

import Classes from './Classes'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { useClass } from '~/actions/class'
import { AppStyles } from '~/constants/styles'
import { useAppSelector } from '~/hooks/redux-hooks'

const EndButton = {
    width: '100%',
    height: 50,
    textTransform: 'none',
    fontSize: 16,
    fontWeight: 500,
    border: 'none',
    color: AppStyles.colors['#004DFF'],
    ':hover': {
        bgcolor: AppStyles.colors['#0045e5'],
        color: 'white',
        border: 'none',
    },
}
const AddModal = ({ open, handleClose, handleOpenAddClass }) => {
    const { checkStudySetToAdd, addStudySetToClass, removeStudySetOfClass } = useClass()
    const { id } = useParams()
    const { userId } = useAppSelector((state) => state.auth)
    const [isFirstLoading, setIsFirstLoading] = useState(true)
    const [classes, setClasses] = useState([])
    const [classesAdded, setClassesAdded] = useState([])
    const [actionLoading, setActionLoading] = useState({ classId: '', loading: false })
    const showSnackbar = useSnackbar()

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        checkStudySetToAdd(id, userId, signal)
            .then((res) => {
                const getClasses = res.data.data
                const addedClasses = getClasses.filter((currentClass) => currentClass.alreadyAdd)
                const addedClassesId = addedClasses.map((currentClass) => currentClass.id)
                setClassesAdded(addedClassesId)
                setClasses(getClasses)
            })
            .finally(() => {
                setIsFirstLoading(false)
            })

        return () => {
            controller.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addStudySet = (classId, studySetId) => {
        const newStudySet = { classId: classId, studySetId: studySetId }
        setActionLoading({ classId: classId, loading: true })
        addStudySetToClass(newStudySet)
            .then(() => {
                showSnackbar({
                    severity: 'success',
                    children: 'Bạn đã thêm học phần vào lớp học này thành công',
                })
                setClassesAdded((prev) => [...prev, classId])
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
            .finally(() => {
                setActionLoading({ classId: '', loading: false })
            })
    }

    const removeStudySet = (classId, studySetId) => {
        setActionLoading({ classId: classId, loading: true })
        removeStudySetOfClass(classId, studySetId)
            .then(() => {
                const updatedAddedClass = classesAdded.filter((currentClass) => currentClass !== classId)
                setClassesAdded(updatedAddedClass)
                showSnackbar({
                    severity: 'success',
                    children: 'Bạn đã xóa học phần vào lớp học này thành công',
                })
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
            .finally(() => {
                setActionLoading({ classId: '', loading: false })
            })
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    p: 3,
                    borderRadius: 3,
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography sx={{ fontSize: 32, fontWeight: 600, color: AppStyles.colors['#333333'] }}>
                        Thêm vào lớp học
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <HighlightOffOutlined />
                    </IconButton>
                </Box>
                <ButtonCompo variant="outlined" style={EndButton} onClick={handleOpenAddClass}>
                    + Tạo một lớp học mới
                </ButtonCompo>

                {isFirstLoading ? (
                    <LoadingClasses />
                ) : (
                    <Box mt={3} mb={5}>
                        {classes.map((getClass) => (
                            <Classes
                                {...getClass}
                                key={getClass.id}
                                classesAdded={classesAdded}
                                addStudySet={addStudySet}
                                removeStudySet={removeStudySet}
                                studySetId={id}
                                actionLoading={actionLoading}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        </Modal>
    )
}

export default AddModal
