import { Box, CardContent, Divider } from '@mui/material'
import CardLayout from '~/components/CardLayout'

import QuestionAction from './QuestionContent/QuestionAction'
import QuestionDescription from './QuestionContent/QuestionDescription'

const CardLayoutStyle = {
    px: 1,
    mt: 5,
}

const Question = ({
    index,
    quest,
    ans,
    deleteQuestionDraft,
    id,
    openEditModal,
    image,
    question,
    updateImageHandler,
}) => {
    return (
        <CardLayout style={CardLayoutStyle}>
            <CardContent>
                <QuestionAction
                    index={index}
                    deleteQuestionDraft={deleteQuestionDraft}
                    id={id}
                    openEditModal={openEditModal}
                    question={question}
                    updateImageHandler={updateImageHandler}
                />
                <Divider />
                <QuestionDescription quest={quest} ans={ans} />
                {image ? (
                    <Box mt={3} display="flex" justifyContent="center" sx={{ border: '3px dashed #CCDBFF' }}>
                        <Box
                            component="img"
                            alt="CQUIZ"
                            src={image}
                            draggable={false}
                            sx={{
                                objectFit: 'contain',
                                maxHeight: 250,
                            }}
                        />
                    </Box>
                ) : null}
            </CardContent>
        </CardLayout>
    )
}

export default Question
