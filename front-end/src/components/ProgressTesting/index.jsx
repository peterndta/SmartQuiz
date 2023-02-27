import { CircularProgressbar } from 'react-circular-progressbar'

import { AccessTimeFilled, Dangerous } from '@mui/icons-material'
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'

import ButtonCompo from '../ButtonCompo'
import { AppStyles } from './../../constants/styles'
import './progress.css'

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 712,
    bgcolor: 'background.paper',
    boxShadow: 24,
    py: 5,
    px: 10,
    borderRadius: 3,
}

const ProgressTesting = ({ open, handleClose, percentage, rightQuestion, maxQuestion, timeLeft }) => {
    const hour = timeLeft.hours > 0 ? `0${timeLeft.hours}:` : ''
    const minute = timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes
    const second = timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds

    let result = 'GREAT'

    if (percentage <= 20) result = 'VERY BAD'
    else if (percentage >= 30 && percentage <= 50) result = 'BAD'
    else if (percentage >= 90) result = 'EXCELLENT'

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    TransitionComponent: Fade,
                },
            }}
            keepMounted={false}
        >
            <Fade in={open}>
                <Box sx={modalStyle}>
                    <Typography
                        align="center"
                        sx={{ color: AppStyles.colors['#000F33'], fontSize: 32, fontWeight: 500 }}
                    >
                        Kết quả kiểm tra
                    </Typography>
                    <Box mt={4} sx={{ width: 200, height: 200, mx: 'auto' }}>
                        <CircularProgressbar
                            value={percentage}
                            text={`${rightQuestion} / ${maxQuestion}`}
                            styles={{
                                text: {
                                    fontFamily: 'Manrope',
                                    fontWeight: 900,
                                },
                            }}
                        />
                    </Box>
                    <Box mt={3}>
                        <Typography
                            sx={{
                                color: percentage < 50 ? AppStyles.colors['#E34444'] : AppStyles.colors['#7EFF8B'],
                                fontSize: 32,
                            }}
                            align="center"
                            fontWeight={800}
                        >
                            {result}!
                        </Typography>
                        <Typography component="p" sx={{ mt: 1, color: AppStyles.colors['#333333'] }} align="center">
                            Bạn đã hoàn thành {rightQuestion} trong tổng số {maxQuestion} câu hỏi
                        </Typography>
                    </Box>
                    <Box mt={11} display="flex" justifyContent="space-between" alignItems="baseline">
                        <Box display="flex" alignItems="center" flexDirection="column">
                            <AccessTimeFilled sx={{ fontSize: 40, color: AppStyles.colors['#004DFF'] }} />
                            <Typography my={2}>Thời gian hoàn thành: </Typography>
                            <Typography sx={{ fontSize: 32 }} fontWeight={500}>
                                {hour}
                                {minute}:{second}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" flexDirection="column">
                            <Dangerous sx={{ fontSize: 40, color: AppStyles.colors['#004DFF'] }} />
                            <Typography my={2}>Câu sai: </Typography>
                            <ButtonCompo
                                style={{ minWidth: 200, backgroundColor: AppStyles.colors['#004DFF'] }}
                                onClick={handleClose}
                            >
                                Xem lại câu đã chọn
                            </ButtonCompo>
                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default ProgressTesting
