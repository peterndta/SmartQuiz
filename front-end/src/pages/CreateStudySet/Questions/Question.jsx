import { Box, CardContent, Divider, LinearProgress } from '@mui/material'
import CardLayout from '~/components/CardLayout'

import QuestionAction from './QuestionContent/QuestionAction'
import QuestionDescription from './QuestionContent/QuestionDescription'

const CardLayoutStyle = {
    px: 1,
    mt: 5,
}

const Question = ({ index, quest, ans, deleteQuestionDraft, id, openEditModal, images, onImageChange }) => {
    let isLoading = false
    let imageTemp = 'https://hoc360.net/wp-content/uploads/2019/08/2019-08-12_14h15_32.png'
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
                {isLoading ? (
                    <Box mt={5} mb={3} sx={{ width: '98%' }}>
                        <LinearProgress />
                    </Box>
                ) : (
                    <Box mt={3} display="flex" justifyContent="center" sx={{ border: '3px dashed #CCDBFF' }}>
                        <Box
                            component="img"
                            alt="CQUIZ"
                            src={imageTemp}
                            draggable={false}
                            sx={{
                                objectFit: 'cover',
                                maxHeight: 250,
                            }}
                        />
                    </Box>
                )}
            </CardContent>
        </CardLayout>
    )
}

export default Question
