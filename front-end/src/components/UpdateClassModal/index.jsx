import { useEffect, useState } from 'react'

import { HighlightOffOutlined } from '@mui/icons-material'
import { Box, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'
import LoadingClasses from '~/components/LoadingClasses'

import { useClass } from '~/actions/class'
import { AppStyles } from '~/constants/styles'
import { useAppSelector } from '~/hooks/redux-hooks'

const ButtonStyle = {
    height: 50,
    mt: 3,
    width: '100%',
    backgroundColor: AppStyles.colors['#004DFF'],
    textTransform: 'none',
    fontSize: 16,
    ':hover': {
        bgcolor: AppStyles.colors['#0045e5'],
        color: 'white',
    },
}

const isEmpty = (value) => value.trim().length === 0

const UpdateClassModal = ({ open, handleClose, classId, updateClassDetailHandler }) => {
    const { userId } = useAppSelector((state) => state.auth)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const { getClassDetail } = useClass()
    const [loading, setLoading] = useState(true)

    const titleChangeHandler = (event) => {
        setTitle(event.target.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value)
    }

    const isSubmittable = !isEmpty(title)

    const updateClassHandler = () => {
        const newClass = { id: classId, name: title, description }
        updateClassDetailHandler(newClass, handleClose)
    }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        getClassDetail(classId, userId, signal)
            .then((res) => {
                const getClass = res.data.data
                setTitle(getClass.name)
                setDescription(getClass.description)
            })
            .finally(() => {
                setLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Dialog open={open} onClose={handleClose} disableEscapeKeyDown={false} fullWidth maxWidth="sm" pb={3}>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography sx={{ fontSize: 32, fontWeight: 600, color: AppStyles.colors['#333333'] }}>
                        Cập nhật lớp học
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <HighlightOffOutlined />
                    </IconButton>
                </Box>
                <Typography sx={{ fontSize: 16, color: AppStyles.colors['#333333'], opacity: 0.6, mt: 1 }}>
                    Sắp xếp tài liệu học của bạn và chia sẻ chúng với bạn học của bạn.
                </Typography>
            </DialogTitle>
            {loading ? (
                <Box mb={5}>
                    <LoadingClasses />
                </Box>
            ) : (
                <DialogContent>
                    <TextField
                        id="filled-basic"
                        label="Tên lớp (khóa học, giáo viên, năm nay, phần vv)"
                        variant="filled"
                        fullWidth
                        sx={{ mt: 2 }}
                        value={title}
                        onChange={titleChangeHandler}
                        required
                    />
                    <TextField
                        id="filled-basic"
                        label="Nhập mô tả (tùy chọn)"
                        variant="filled"
                        fullWidth
                        sx={{ mt: 3 }}
                        value={description}
                        onChange={descriptionChangeHandler}
                    />

                    <Box mt={2}>
                        <ButtonCompo
                            variant="contained"
                            style={ButtonStyle}
                            disable={!isSubmittable}
                            onClick={updateClassHandler}
                        >
                            Cập nhật
                        </ButtonCompo>
                    </Box>
                </DialogContent>
            )}
        </Dialog>
    )
}

export default UpdateClassModal
