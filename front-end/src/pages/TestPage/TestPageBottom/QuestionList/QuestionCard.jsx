import { CardContent, Typography } from '@mui/material'
import CardLayout from '~/components/CardLayout'

import Answer from './Answer'

import { choices } from '~/Mock'
import { AppStyles } from '~/constants/styles'

const QuestionCard = ({ question, index, handleSelectQuestion, questionId, selectQuestionAnswers }) => {
    let bgc = AppStyles.colors['#FAFBFF']

    if (selectQuestionAnswers.length > 0) {
        const position = selectQuestionAnswers.findIndex((quest) => quest.id === question.id)
        if (position !== -1) bgc = AppStyles.colors['#CCDBFF']
    }

    const CardLayoutStyle = {
        mb: 2,
        borderRadius: 3,
        p: 1,
        backgroundColor: bgc,
        height: 'none',
    }

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
                        questionId={questionId}
                        handleSelectQuestion={handleSelectQuestion}
                    />
                ))}
            </CardContent>
        </CardLayout>
    )
}

export default QuestionCard
