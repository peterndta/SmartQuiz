// import { GppGood } from '@mui/icons-material'
import { Avatar, Box, CardContent, Grid, Typography } from '@mui/material'
import CardLayout from '~/components/CardLayout'
import MoreMenu from '~/components/MoreMenu'

import logo from '~/assets/images/User 5.png'
import { AppStyles } from '~/constants/styles'

const StudyCard = ({ studySet, studySets, setClickIndex, clickIndex, index, deleteStudySetHandler, detailHandler }) => {
    const CardLayoutStyle = {
        borderRadius: 3,
        boxShadow: '0px 1px 2px rgba(0, 46, 153, 0.3), 0px 1px 3px 1px rgba(0, 46, 153, 0.15)',
        backgroundColor: clickIndex === index && AppStyles.colors['#004DFF'],
        '&:hover': {
            backgroundColor: clickIndex === index ? AppStyles.colors['#004DFF'] : AppStyles.colors['#E6EDFF'],
        },
    }
    const getId = () => {
        setClickIndex(studySets.findIndex((obj) => obj.id === studySet.id))
        detailHandler(studySet.id)
    }

    return (
        <Grid item>
            <CardLayout style={CardLayoutStyle}>
                <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Typography
                                variant="body1"
                                fontWeight={500}
                                sx={{
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: '1',
                                    textOverflow: 'ellipsis',
                                    userSelect: 'none',
                                    cursor: 'pointer',
                                    color: clickIndex === index && AppStyles.colors['#FFFFFF'],
                                    textDecoration: 'none',
                                }}
                                onClick={getId}
                            >
                                {studySet.name}
                            </Typography>
                            {/* {Math.random() < 0.5 && (
                                <GppGood
                                    fontSize="small"
                                    sx={{ ml: 1, mt: -0.5, color: AppStyles.colors['#004DFF'] }}
                                />
                            )} */}
                        </Box>

                        <MoreMenu
                            studySetId={studySet.id}
                            color={clickIndex === index && AppStyles.colors['#767680']}
                            deleteButtonOn={true}
                            deleteStudySetHandler={deleteStudySetHandler}
                        />
                    </Box>
                    <Box display="flex">
                        <Typography
                            textAlign={'left'}
                            variant="body1"
                            sx={{
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: '2',
                                textOverflow: 'ellipsis',
                                fontSize: 14,
                                userSelect: 'none',
                                opacity: '50%',
                                color: clickIndex === index ? AppStyles.colors['#FFFFFF'] : AppStyles.colors['#333333'],
                            }}
                        >
                            {studySet.gradeName !== 'Đại học' ? 'Lớp' : ''} {studySet.gradeName} -{' '}
                            {!studySet.subjectName ? studySet.schoolName : studySet.subjectName} |
                        </Typography>
                        <Typography
                            ml={0.5}
                            variant="body1"
                            sx={{
                                fontSize: 14,
                                userSelect: 'none',
                                opacity: '50%',
                                color: clickIndex === index ? AppStyles.colors['#FFFFFF'] : AppStyles.colors['#333333'],
                            }}
                        >
                            {studySet.totalQuestions} câu
                        </Typography>
                    </Box>
                    <Box display="flex" mt={3} textAlign={'left'}>
                        <Avatar sx={{ height: 20, width: 20 }} src={logo} alt="logo" />
                        <Typography
                            ml={1}
                            sx={{
                                color: clickIndex === index ? AppStyles.colors['#FFFFFF'] : AppStyles.colors['#333333'],
                                fontSize: 14,
                                fontWeight: 500,
                                opacity: '70%',
                                userSelect: 'none',
                            }}
                        >
                            {studySet?.creator}
                        </Typography>
                    </Box>
                </CardContent>
            </CardLayout>
        </Grid>
    )
}

export default StudyCard
