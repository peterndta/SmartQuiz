import React, { memo } from 'react'

import Question from './Question'

const Questions = ({ quest, deleteQuestionDraft, openEditModal, updateImageHandler }) => {
    const questions = JSON.parse(quest)
    return (
        <React.Fragment>
            {questions.map((question, index) => (
                <Question
                    key={question.id}
                    index={index}
                    {...question}
                    question={question}
                    deleteQuestionDraft={deleteQuestionDraft}
                    openEditModal={openEditModal}
                    updateImageHandler={updateImageHandler}
                />
            ))}
        </React.Fragment>
    )
}

export default memo(Questions)
