import React from 'react'

import QuestionCard from './QuestionCard'

const QuestionList = ({ questions, handleSelectQuestion, selectQuestionAnswers }) => {
    return (
        <React.Fragment>
            {questions.map((question, index) => (
                <QuestionCard
                    key={question.id}
                    index={index}
                    question={question}
                    questionId={question.id}
                    handleSelectQuestion={handleSelectQuestion}
                    selectQuestionAnswers={selectQuestionAnswers}
                />
            ))}
        </React.Fragment>
    )
}

export default QuestionList
