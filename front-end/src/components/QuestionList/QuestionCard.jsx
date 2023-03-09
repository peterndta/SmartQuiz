import { Box, CardContent, Typography } from '@mui/material'
import CardLayout from '~/components/CardLayout'

import Answer from './Answer'

import { choices } from '~/Mock'

const QuestionCard = ({ question, index }) => {
    const CardLayoutStyle = {
        mb: 2,
        borderRadius: 3,
        p: 1,
        boxShadow: '0px 1px 2px rgba(0, 46, 153, 0.3), 0px 1px 3px 1px rgba(0, 46, 153, 0.15)',
        height: 'none',
    }

    return (
        <CardLayout style={CardLayoutStyle}>
            <CardContent>
                <Box sx={{ mb: 5 }}>
                    <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
                        {index + 1}. {question.name}
                    </Typography>
                    {question.imageUrl ? (
                        <Box
                            mt={2}
                            component="img"
                            alt="question_image"
                            src={question.imageUrl}
                            sx={{
                                objectFit: 'contain',
                                maxHeight: 250,
                            }}
                        />
                    ) : null}
                </Box>
                <Typography sx={{ mb: 2, fontWeight: 500 }}>Câu trả lời</Typography>
                {question.answers.map((question, index) => (
                    <Answer
                        key={question.id}
                        choice={choices[index]}
                        answer={question.name}
                        isCorrect={question.isCorrectAnswer}
                    />
                ))}
            </CardContent>
        </CardLayout>
    )
}

export default QuestionCard
