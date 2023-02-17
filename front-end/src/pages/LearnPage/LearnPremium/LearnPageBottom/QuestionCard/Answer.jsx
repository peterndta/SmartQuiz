import { Box, Checkbox, Typography } from '@mui/material'

import { AppStyles } from '~/constants/styles'

const Answer = ({ choice, answer, handleSelectedChoices, selectedChoices, correctAnswers }) => {
    let isCheck = 'none'

    if (correctAnswers.isSubmit && selectedChoices.length > 0) {
        const notExistsInSelectChoices = selectedChoices.every((ans) => ans.id !== answer.id)
        const notExistsInCorrectAnswers = correctAnswers.ans.every((ans) => ans.id !== answer.id)

        if (!(notExistsInSelectChoices && notExistsInCorrectAnswers)) {
            const existingInCorrectAnswers = correctAnswers.ans.some((ans) => ans.id === answer.id)
            if (existingInCorrectAnswers) isCheck = 'true'
            else {
                const existingInSelectChoices = selectedChoices.some((ans) => ans.id === answer.id)
                isCheck = (existingInSelectChoices && existingInCorrectAnswers).toString()
            }
        }
    }
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography sx={{ mr: 1, fontSize: 20, fontWeight: 500 }}>{choice}.</Typography>
            <Box
                py={2}
                px={3}
                sx={{
                    backgroundColor:
                        isCheck === 'none'
                            ? AppStyles.colors['#DCE6FF']
                            : isCheck === 'true'
                            ? AppStyles.colors['#7EFF8B']
                            : AppStyles.colors['#FF9797'],
                    // backgroundColor: AppStyles.colors['#DCE6FF'],
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
