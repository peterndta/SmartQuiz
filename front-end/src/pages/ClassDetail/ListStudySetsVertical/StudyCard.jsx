// import { GppGood } from '@mui/icons-material'
import { Link } from 'react-router-dom'

import { Avatar, Box, CardContent, Grid, Typography } from '@mui/material'
import CardLayout from '~/components/CardLayout'
import MoreMenu from '~/components/MoreMenu'

import logo from '~/assets/images/User 5.png'
import { AppStyles } from '~/constants/styles'

const StudyCard = ({ studySet }) => {
    const CardLayoutStyle = {
        borderRadius: 3,
        boxShadow: '0px 1px 2px rgba(0, 46, 153, 0.3), 0px 1px 3px 1px rgba(0, 46, 153, 0.15)',
        '&:hover': {
            backgroundColor: AppStyles.colors['#E6EDFF'],
        },
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
                                    cursor: 'pointer',
                                    color: 'black',
                                    textDecoration: 'none',
                                }}
                                component={Link}
                                to={`/study-sets/${studySet.id}`}
                            >
                                {studySet.name}
                            </Typography>
                        </Box>
                        <MoreMenu saveButtonOn={true} removeButtonOn={true} />
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
                            }}
                        >
                            {studySet.gradeName !== 'Đại học'
                                ? 'Lớp' + ` ${studySet.gradeName} - ${studySet.subjectName} |`
                                : studySet.subjectName + ' | '}
                        </Typography>
                        <Typography ml={0.5} variant="body1" sx={{ fontSize: 14, userSelect: 'none', opacity: '50%' }}>
                            {studySet.totalQuestions} câu
                        </Typography>
                    </Box>
                    <Box display="flex" mt={3} textAlign={'left'}>
                        <Avatar sx={{ height: 20, width: 20 }} src={logo} alt="logo" />
                        <Typography
                            ml={1}
                            sx={{
                                color: AppStyles.colors['#767680'],
                                fontSize: 14,
                                fontWeight: 500,
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
