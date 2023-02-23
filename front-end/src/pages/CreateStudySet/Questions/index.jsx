import React, { memo } from 'react'

import Question from './Question'

const Questions = ({ quest, deleteQuestionDraft, openEditModal, onImageChange }) => {
    const questions = JSON.parse(quest)
    return (
        <React.Fragment>
            {questions.map((question, index) => (
                <Question
                    key={question.id}
                    index={index}
                    {...question}
                    deleteQuestionDraft={deleteQuestionDraft}
                    openEditModal={openEditModal}
                    onImageChange={onImageChange}
                    id={question.id}
                    image={question.image}
                />
            ))}
        </React.Fragment>
    )
}

export default memo(Questions)
