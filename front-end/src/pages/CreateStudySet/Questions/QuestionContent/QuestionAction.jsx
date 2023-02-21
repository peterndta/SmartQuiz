import { Delete, Edit, Image, Lock } from '@mui/icons-material'
import { Badge, Box, Fab, IconButton, Stack, Typography } from '@mui/material'

import { AppStyles } from './../../../../constants/styles'

const QuestionAction = ({ index, id, deleteQuestionDraft, openEditModal, onImageChange }) => {
    return (
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography fontWeight={700}>{index + 1}.</Typography>
            <Stack direction="row" spacing={3}>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="contained-button-file"
                    type="file"
                    onChange={onImageChange}
                />
                <label htmlFor="contained-button-file">
                    <Fab component="span" sx={{ backgroundColor: 'white', width: 40, height: 40, boxShadow: 'none' }}>
                        <Badge
                            sx={{
                                '& .MuiBadge-badge': {
                                    backgroundColor: AppStyles.colors['#FFAF00'],
                                },
                            }}
                            badgeContent={<Lock sx={{ fontSize: 16, color: AppStyles.colors['#004DFF'] }} />}
                        >
                            <Image color="primary" />
                        </Badge>
                    </Fab>
                </label>
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
