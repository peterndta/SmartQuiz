import { Box, Checkbox, Typography } from '@mui/material'

import { AppStyles } from '~/constants/styles'

const Answer = ({ choice, answer, handleSelectedChoices, answerIndex }) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography sx={{ mr: 1, fontSize: 20, fontWeight: 500 }}>{choice}.</Typography>
            <Box
                py={2}
                px={3}
                sx={{
                    // backgroundColor: checked === true ? AppStyles.colors['#DCE6FF'] : AppStyles.colors['#EEF2FF']
                    backgroundColor: AppStyles.colors['#DCE6FF'],
                    borderRadius: 3,
                }}
                flex={1}
                mb={1}
            >
                <Typography fontWeight={500}>{answer.name}</Typography>
            </Box>
            <Checkbox onChange={() => handleSelectedChoices(answer)} sx={{ ml: 1 }} />
        </Box>
    )
}

export default Answer
