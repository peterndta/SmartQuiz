import { Delete, Edit, Image, Lock } from '@mui/icons-material'
import { Badge, Box, IconButton, Stack, Typography } from '@mui/material'

import { AppStyles } from './../../../../constants/styles'

import { useAppSelector } from '~/hooks/redux-hooks'

const QuestionAction = ({ index, id, deleteQuestionDraft, openEditModal }) => {
    const { vip } = useAppSelector((state) => state.auth)
    return (
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography fontWeight={700}>{index + 1}.</Typography>
            <Stack direction="row" spacing={3}>
                <input accept="image/*" style={{ display: 'none' }} id={`contained-button-file${id}`} type="file" />
                <IconButton disabled={!vip}>
                    <label htmlFor={`contained-button-file${id}`}>
                        <Badge
                            sx={{
                                '& .MuiBadge-badge': {
                                    backgroundColor: AppStyles.colors['#FFAF00'],
                                },
                            }}
                            badgeContent={
                                !vip ? <Lock sx={{ fontSize: 16, color: AppStyles.colors['#004DFF'] }} /> : null
                            }
                        >
                            <Image color="primary" />
                        </Badge>
                    </label>
                </IconButton>
            </Stack>
            <Box display="flex">
                <IconButton onClick={() => openEditModal(id)}>
                    <Edit color="primary" />
                </IconButton>
                <IconButton onClick={() => deleteQuestionDraft(id)}>
                    <Delete />
                </IconButton>
            </Box>
        </Box>
    )
}

export default QuestionAction
