import { useState } from 'react'

import { HighlightOffOutlined } from '@mui/icons-material'
import { Box, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'

import { useSnackbar } from '~/HOC/SnackbarContext'
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

const CreateClassModal = ({ open, handleClose }) => {
    const { createClass } = useClass()
    const showSnackbar = useSnackbar()
    const { userId } = useAppSelector((state) => state.auth)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const titleChangeHandler = (event) => {
        setTitle(event.target.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value)
    }

    const isSubmittable = !isEmpty(title)

    const createClassHandler = () => {
        const newClass = { userId, name: title, description }
        createClass(newClass)
            .then(() => {
                showSnackbar({
                    severity: 'success',
                    children: 'Bạn đã tạo lớp học thành công',
                })
                handleClose()
            })
            .catch(() => {
                showSnackbar({
                    severity: 'success',
                    children: 'Something went wrong, try again later!',
                })
            })
    }

    return (
        <Dialog open={open} onClose={handleClose} disableEscapeKeyDown={false} fullWidth maxWidth="sm">
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography sx={{ fontSize: 32, fontWeight: 600, color: AppStyles.colors['#333333'] }}>
                        Tạo lớp mới
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <HighlightOffOutlined />
                    </IconButton>
                </Box>
                <Typography sx={{ fontSize: 16, color: AppStyles.colors['#333333'], opacity: 0.6, mt: 1 }}>
                    Sắp xếp tài liệu học của bạn và chia sẻ chúng với bạn học của bạn.
                </Typography>
            </DialogTitle>
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
                        onClick={createClassHandler}
                    >
                        Tạo lớp
                    </ButtonCompo>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default CreateClassModal
