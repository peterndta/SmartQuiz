import { Box, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'

import { AppStyles } from '~/constants/styles'

const CreateClassModal = ({ open, handleClose }) => {
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
    return (
        <Dialog open={open} onClose={handleClose} disableEscapeKeyDown={false} fullWidth maxWidth="sm">
            <DialogTitle>
                <Typography sx={{ fontSize: 32, fontWeight: 600, color: AppStyles.colors['#333333'] }}>
                    Tạo lớp mới
                </Typography>
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
                />
                <TextField id="filled-basic" label="Nhập mô tả (tùy chọn)" variant="filled" fullWidth sx={{ mt: 3 }} />

                <Box mt={2}>
                    <ButtonCompo variant="contained" style={ButtonStyle}>
                        Tạo lớp
                    </ButtonCompo>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default CreateClassModal
