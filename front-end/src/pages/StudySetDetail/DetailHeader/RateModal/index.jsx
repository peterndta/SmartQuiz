import { useState } from 'react'

import { Box, Modal, Rating, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'

import { AppStyles } from '~/constants/styles'

const RateModal = ({ open, handleClose, id }) => {
    const [value, setValue] = useState(0)

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
                    width: 600,
                    bgcolor: 'background.paper',
                    p: 3,
                    borderRadius: 3,
                }}
            >
                <Typography sx={{ fontSize: 32, mb: 3, fontWeight: 600, color: AppStyles.colors['#333333'] }}>
                    Bạn đánh giá học phần này thế nào?
                </Typography>
                <Rating
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}
                    size="large"
                    sx={{
                        fontSize: '2rem',
                        '& .MuiRating-icon': {
                            width: '3rem',
                        },
                    }}
                />
                <ButtonCompo variant="contained" style={EndButton} onClick={() => {}}>
                    Gửi đánh giá
                </ButtonCompo>
            </Box>
        </Modal>
    )
}

export default RateModal
