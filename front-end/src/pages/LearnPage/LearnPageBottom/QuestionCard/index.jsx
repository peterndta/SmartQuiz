import { CardContent, Typography } from '@mui/material'
import CardLayout from '~/components/CardLayout'

import Answer from './Answer'

import { choices } from '~/Mock'

const CardLayoutStyle = {
    mb: 2,
    borderRadius: 3,
    p: 1,
    height: 'none',
}

const QuestionCard = ({ question, index, handleSelectedChoices, correctAnswers, selectedChoices }) => {
    return (
        <CardLayout style={CardLayoutStyle}>
            <CardContent>
                <Typography sx={{ mb: 5, fontSize: 20, fontWeight: 500 }}>
                    {index + 1}. {question.name}
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
    )
}

export default QuestionCard
