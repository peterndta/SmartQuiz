import { Add, Remove } from '@mui/icons-material'
import { Box, CircularProgress, IconButton, Typography } from '@mui/material'

import { AppStyles } from '~/constants/styles'

const Classes = ({ name, classesAdded, id, addStudySet, removeStudySet, studySetId, actionLoading }) => {
    const isAdded = classesAdded.includes(id)

    return (
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
                {name}
            </Typography>
            {isAdded ? (
                <IconButton onClick={() => removeStudySet(id, studySetId)}>
                    {actionLoading.loading && actionLoading.classId === id ? (
                        <CircularProgress color="primary" size={14} />
                    ) : (
                        <Remove sx={{ color: AppStyles.colors['#333333'], opacity: 0.5, cursor: 'pointer' }} />
                    )}
                </IconButton>
            ) : (
                <IconButton onClick={() => addStudySet(id, studySetId)}>
                    {actionLoading.loading && actionLoading.classId === id ? (
                        <CircularProgress color="primary" size={14} />
                    ) : (
                        <Add sx={{ color: AppStyles.colors['#333333'], opacity: 0.5, cursor: 'pointer' }} />
                    )}
                </IconButton>
            )}
        </Box>
    )
}

export default Classes
