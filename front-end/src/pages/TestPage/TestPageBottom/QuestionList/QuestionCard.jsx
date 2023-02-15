import { CardContent, Typography } from '@mui/material'
import CardLayout from '~/components/CardLayout'

import Answer from './Answer'

import { choices } from '~/Mock'
import { AppStyles } from '~/constants/styles'

const QuestionCard = ({ question, index, handleSelectQuestion, questionId, selectQuestionAnswers, checkAnswers }) => {
    let bgc = AppStyles.colors['#FAFBFF']

    if (!checkAnswers.isSubmit) {
        if (selectQuestionAnswers.length > 0) {
            const position = selectQuestionAnswers.findIndex((quest) => quest.id === question.id)
            if (position !== -1) bgc = AppStyles.colors['#CCDBFF']
        }
    } else {
        const quest = checkAnswers.questions.find((item) => item.id === question.id)
        if (quest.isCorrect) {
            bgc = AppStyles.colors['#7EFF8B']
        } else {
            bgc = AppStyles.colors['#FF9797']
        }
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
