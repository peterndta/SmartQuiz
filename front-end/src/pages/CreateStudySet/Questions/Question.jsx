import { Box, CardContent, Divider } from '@mui/material'
import CardLayout from '~/components/CardLayout'

import QuestionAction from './QuestionContent/QuestionAction'
import QuestionDescription from './QuestionContent/QuestionDescription'

const CardLayoutStyle = {
    px: 1,
    mt: 5,
}

const Question = ({ index, quest, ans, deleteQuestionDraft, id, openEditModal, images, onImageChange }) => {
    return (
        <CardLayout style={CardLayoutStyle}>
            <CardContent>
                <QuestionAction
                    index={index}
                    deleteQuestionDraft={deleteQuestionDraft}
                    id={id}
                    openEditModal={openEditModal}
                    onImageChange={onImageChange}
                />
                <Divider />
                <QuestionDescription quest={quest} ans={ans} />
                {images && (
                    <Box
                        mt={2}
                        component="img"
                        alt="CQUIZ"
                        src={images.preview}
                        draggable={false}
                        sx={{
                            objectFit: 'contain',
                            maxHeight: 250,
                            maxWidth: 1050,
                        }}
                    />
                )}
            </CardContent>
        </CardLayout>
    )
}

export default Question
