import { useState } from 'react'

import { useHistory } from 'react-router-dom'

import { Box, FormControl, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'

import { AppStyles } from '~/constants/styles'

const TestModal = ({ open, handleClose, id, numberOfQuestion }) => {
    const history = useHistory()
    const [num, setNum] = useState(1)
    const [time, setTime] = useState(15)
    let limitQuestion

    if (numberOfQuestion > 360) {
        limitQuestion = 360
    } else {
        limitQuestion = numberOfQuestion
    }
    const handleChange = (e) => {
        const regex = /^[0-9\b]+$/
        if (e.target.value === '' || regex.test(e.target.value)) {
            if (e.target.value > limitQuestion) {
                setNum(limitQuestion)
            } else {
                setNum(e.target.value)
            }
        }
    }
    const createTestHandler = () => {
        history.push(`/study-sets/${id}/test`, { time: time, quantity: num })
    }
    const handleTimeChange = (event) => {
        setTime(event.target.value)
    }

    const EndButton = {
        mt: 5,
        width: '100%',
        backgroundColor: AppStyles.colors['#004DFF'],
        textTransform: 'none',
        fontSize: 16,
        fontWeight: 500,
        ':hover': {
            bgcolor: AppStyles.colors['#0045e5'],
            color: 'white',
        },
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 3,
                    borderRadius: 3,
                }}
            >
                <Typography sx={{ fontSize: 32, mb: 3, fontWeight: 600, color: AppStyles.colors['#333333'] }}>
                    Tùy chọn
                </Typography>
                <Box display="flex" justifyContent="space-around">
                    <Box>
                        <Typography sx={{ color: AppStyles.colors['#333333'], mb: 1, fontSize: 17, fontWeight: 500 }}>
                            Số lượng câu hỏi
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Box component="form" noValidate autoComplete="off" sx={{ width: 30 }}>
                                <TextField
                                    variant="standard"
                                    required
                                    type="text"
                                    onChange={(e) => handleChange(e)}
                                    value={num}
                                />
                            </Box>

                            <Typography sx={{ color: AppStyles.colors['#333333'], opacity: '80%' }}>
                                /{numberOfQuestion < 360 ? numberOfQuestion : '360'} câu hỏi
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{ color: AppStyles.colors['#333333'], mb: 1, fontSize: 17, fontWeight: 500 }}>
                            Thời gian kiểm tra
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <FormControl
                                variant="standard"
                                sx={{
                                    minWidth: 30,
                                }}
                            >
                                <Select value={time} onChange={handleTimeChange}>
                                    <MenuItem value={15}>15</MenuItem>
                                    <MenuItem value={30}>30</MenuItem>
                                    <MenuItem value={45}>45</MenuItem>
                                    <MenuItem value={60}>60</MenuItem>
                                    <MenuItem value={90}>90</MenuItem>
                                    <MenuItem value={120}>120</MenuItem>
                                    <MenuItem value={150}>150</MenuItem>
                                    <MenuItem value={180}>180</MenuItem>
                                </Select>
                            </FormControl>

                            <Typography sx={{ color: AppStyles.colors['#333333'], opacity: '80%' }}>/phút</Typography>
                        </Box>
                    </Box>
                </Box>
                <ButtonCompo variant="contained" style={EndButton} onClick={createTestHandler}>
                    Tạo bài kiểm tra mới
                </ButtonCompo>
            </Box>
        </Modal>
    )
}

export default TestModal
