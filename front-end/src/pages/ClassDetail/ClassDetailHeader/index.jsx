import { useState } from 'react'

import { Delete, Edit, Remove } from '@mui/icons-material'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import UpdateClassModal from '~/components/UpdateClassModal'

import { AppStyles } from '~/constants/styles'

const ClassDetailHeader = ({ className, leaveHandler, classId, updateClassDetailHandler }) => {
    const [openEditModal, setOpenEditModal] = useState(false)

    const handleOpen = () => setOpenEditModal(true)
    const handleClose = () => setOpenEditModal(false)

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography sx={{ color: AppStyles.colors['#333333'], fontSize: 38, fontWeight: 600 }}>
                {className}
            </Typography>
            <Box display="flex">
                <Tooltip title="Sửa thông tin" placement="bottom" onClick={handleOpen}>
                    <IconButton
                        aria-label="create"
                        size="small"
                        sx={{
                            width: 40,
                            height: 40,
                            mr: 2,
                            backgroundColor: AppStyles.colors['#FAFBFF'],
                            border: '1px solid #767680',
                        }}
                    >
                        <Edit fontSize="small" sx={{ color: AppStyles.colors['#767680'] }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Rời khỏi lớp" placement="bottom" onClick={leaveHandler}>
                    <IconButton
                        aria-label="create"
                        size="small"
                        sx={{
                            width: 40,
                            height: 40,
                            mr: 2,
                            backgroundColor: AppStyles.colors['#FAFBFF'],
                            border: '1px solid #767680',
                        }}
                    >
                        <Remove fontSize="small" sx={{ color: AppStyles.colors['#767680'] }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Xóa lớp học" placement="bottom">
                    <IconButton
                        aria-label="create"
                        size="small"
                        sx={{
                            width: 40,
                            height: 40,
                            backgroundColor: AppStyles.colors['#FAFBFF'],
                            border: '1px solid #767680',
                        }}
                    >
                        <Delete fontSize="small" sx={{ color: AppStyles.colors['#767680'] }} />
                    </IconButton>
                </Tooltip>
            </Box>
            {openEditModal && (
                <UpdateClassModal
                    open={openEditModal}
                    handleClose={handleClose}
                    classId={classId}
                    updateClassDetailHandler={updateClassDetailHandler}
                />
            )}
        </Box>
    )
}

export default ClassDetailHeader
