import React, { memo } from 'react'

import Question from './Question'

const Questions = ({ quest, deleteQuestionDraft, openEditModal, images, onImageChange }) => {
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
                    images={images}
                    onImageChange={onImageChange}
                />
            ))}
        </React.Fragment>
    )
}

export default memo(Questions)
