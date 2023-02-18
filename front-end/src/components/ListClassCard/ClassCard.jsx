import { Link } from 'react-router-dom'

import { Avatar, Box, CardContent, Grid, Typography } from '@mui/material'

import CardLayout from '../CardLayout'
import MoreMenu from '../MoreMenu'

import logo from '~/assets/images/User 5.png'
import { AppStyles } from '~/constants/styles'

const ClassCard = ({ studySet, md }) => {
    const CardLayoutStyle = {
        borderRadius: 3,
        boxShadow: '0px 1px 2px rgba(0, 46, 153, 0.3), 0px 1px 3px 1px rgba(0, 46, 153, 0.15)',
    }
    return (
        <Grid item md={md}>
            <CardLayout style={CardLayoutStyle}>
                <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box sx={{ width: '34%' }}>
                            <Avatar sx={{ height: 80, width: 80 }} src={logo} alt="logo" />
                        </Box>
                        <Box sx={{ width: '66%' }}>
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
                                            color: 'black',
                                            textDecoration: 'none',
                                        }}
                                        component={Link}
                                        to={`/study-sets/${studySet.id}`}
                                    >
                                        {/* {studySet?.StudySetName} */}
                                        {studySet.name}
                                    </Typography>
                                    {/* {Math.random() < 0.5 && (
                                        <GppGood
                                            fontSize="small"
                                            sx={{ ml: 1, mt: -0.5, color: AppStyles.colors['#004DFF'] }}
                                        />
                                    )} */}
                                </Box>
                                <MoreMenu />
                            </Box>
                            <Box display="flex">
                                <Typography
                                    textAlign={'left'}
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: '2',
                                        textOverflow: 'ellipsis',
                                        fontSize: 14,
                                        userSelect: 'none',
                                    }}
                                >
                                    TOÁN |
                                </Typography>
                                <Typography
                                    ml={0.5}
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ fontSize: 14, userSelect: 'none' }}
                                >
                                    100 học phần
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
                        </Box>
                    </Box>
                </CardContent>
            </CardLayout>
        </Grid>
    )
}

export default ClassCard
