import { Box, Checkbox, Typography } from '@mui/material'

import { AppStyles } from '~/constants/styles'

const Answer = ({ choice, answer, handleSelectQuestion, questionId }) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography sx={{ mr: 1, fontSize: 20, fontWeight: 500 }}>{choice}.</Typography>
            <Box
                py={2}
                px={3}
                sx={{
                    backgroundColor: AppStyles.colors['#EEF2FF'],
                    borderRadius: 3,
                }}
                flex={1}
                mb={1}
            >
                <Typography fontWeight={500}>{answer.name}</Typography>
            </Box>
            <Checkbox sx={{ ml: 1 }} onChange={() => handleSelectQuestion({ id: questionId, answer: answer })} />
        </Box>
    )
}

export default Answer
