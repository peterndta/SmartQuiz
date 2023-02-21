import { Add, Remove } from '@mui/icons-material'
import { Box, Modal, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'

import { AppStyles } from '~/constants/styles'

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
                    Thêm vào lớp học
                </Typography>
                <ButtonCompo variant="outlined" style={EndButton} onClick={handleOpenAddClass}>
                    + Tạo một lớp học mới
                </ButtonCompo>

                <Box mt={3} mb={5}>
                    <Box
                        display="flex"
                        borderRadius={2}
                        sx={{
                            width: '100%',
                            py: 1,
                            px: 2,
                            ':hover': {
                                bgcolor: AppStyles.colors['#EEF2FF'],
                                color: 'white',
                            },
                        }}
                        justifyContent="space-between"
                    >
                        <Typography
                            sx={{
                                color: AppStyles.colors['#333333'],
                                opacity: 0.6,
                                fontWeight: 500,
                                userSelect: 'none',
                            }}
                        >
                            Lớp thầy Hoàng
                        </Typography>
                        <Remove sx={{ color: AppStyles.colors['#333333'], opacity: 0.3, cursor: 'pointer' }} />
                    </Box>
                    <Box
                        display="flex"
                        borderRadius={2}
                        sx={{
                            width: '100%',
                            py: 1,
                            px: 2,
                            ':hover': {
                                bgcolor: AppStyles.colors['#EEF2FF'],
                                color: 'white',
                            },
                        }}
                        justifyContent="space-between"
                    >
                        <Typography
                            sx={{
                                color: AppStyles.colors['#333333'],
                                opacity: 0.6,
                                userSelect: 'none',
                                fontWeight: 500,
                            }}
                        >
                            Lớp thầy Phương
                        </Typography>
                        <Add sx={{ color: AppStyles.colors['#333333'], opacity: 0.3, cursor: 'pointer' }} />
                    </Box>
                    <Box
                        display="flex"
                        borderRadius={2}
                        sx={{
                            width: '100%',
                            py: 1,
                            px: 2,
                            ':hover': {
                                bgcolor: AppStyles.colors['#EEF2FF'],
                                color: 'white',
                            },
                        }}
                        justifyContent="space-between"
                    >
                        <Typography
                            sx={{
                                color: AppStyles.colors['#333333'],
                                opacity: 0.6,
                                userSelect: 'none',
                                fontWeight: 500,
                            }}
                        >
                            Lớp cô Vân
                        </Typography>
                        <Add sx={{ color: AppStyles.colors['#333333'], opacity: 0.3, cursor: 'pointer' }} />
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddModal
