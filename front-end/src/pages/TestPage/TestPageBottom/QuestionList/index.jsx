import React from 'react'

import QuestionCard from './QuestionCard'

const QuestionList = ({ questions, handleSelectQuestion, selectQuestionAnswers, checkAnswers }) => {
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
                    checkAnswers={checkAnswers}
                />
            ))}
        </React.Fragment>
    )
}

export default QuestionList
