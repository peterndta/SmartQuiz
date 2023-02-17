import { ArrowCircleRight } from '@mui/icons-material'
import { Box, CardContent, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'
import CardLayout from '~/components/CardLayout'

import Answer from './Answer'

import { choices } from '~/Mock'
import { AppStyles } from '~/constants/styles'

const CardLayoutStyle = {
    mb: 2,
    borderRadius: 3,
    p: 1,
    height: 'none',
}

const ButtonStyle = {
    color: AppStyles.colors['#000F33'],
    textTransform: 'none',
    height: 56,
    minWidth: 413,
    backgroundColor: AppStyles.colors['#CCDBFF'],
    ':hover': {
        bgcolor: AppStyles.colors['#004DFF'],
        color: 'white',
    },
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

const QuestionCard = ({
    question,
    handleSelectedChoices,
    correctAnswers,
    selectedChoices,
    checkAnswer,
    disableButton,
    id,
}) => {
    return (
        <Box>
            <CardLayout style={CardLayoutStyle}>
                <CardContent>
                    <Typography sx={{ mb: 5, fontSize: 20, fontWeight: 500 }}>
                        {question.index + 1}. {question.name}
                    </Typography>
                    <Typography sx={{ mb: 2, fontWeight: 500 }}>Câu trả lời</Typography>
                    {question.answers.map((answer, index) => (
                        <Answer
                            key={answer.id}
                            choice={choices[index]}
                            answer={answer}
                            handleSelectedChoices={handleSelectedChoices}
                            correctAnswers={correctAnswers}
                            selectedChoices={selectedChoices}
                        />
                    ))}
                </CardContent>
            </CardLayout>
            <Box mt={2}>
                <ButtonCompo style={ButtonStyle} onClick={checkAnswer} fullWidth={true} disable={disableButton}>
                    <Typography mr={1.5} sx={{ fontSize: 16, fontWeight: 500 }}>
                        Tiếp tục
                    </Typography>
                    <ArrowCircleRight fontSize="medium" />
                </ButtonCompo>
            </Box>
            <ButtonCompo variant="contained" style={EndButton} onClick={() => history.push(`/study-sets/${id}`)}>
                Kết thúc
            </ButtonCompo>
        </Box>
    )
}

export default QuestionCard
