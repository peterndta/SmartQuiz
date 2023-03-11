import { Link } from 'react-router-dom'

import { Avatar, Box, CardContent, Grid, Typography } from '@mui/material'

import CardLayout from '../CardLayout'

import { AppStyles } from '~/constants/styles'

const ClassCard = ({ studySet, md }) => {
    const CardLayoutStyle = {
        borderRadius: 3,
        boxShadow: '0px 1px 2px rgba(0, 46, 153, 0.3), 0px 1px 3px 1px rgba(0, 46, 153, 0.15)',
        '&:hover': {
            backgroundColor: AppStyles.colors['#E6EDFF'],
        },
    }
    return (
        <Grid item md={md}>
            <CardLayout style={CardLayoutStyle}>
                <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box sx={{ width: '34%' }}>
                            <Avatar sx={{ height: 80, width: 80 }} src={studySet.imageUrl} alt="logo" />
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
                                        to={`/class/${studySet.id}`}
                                    >
                                        {studySet.name}
                                    </Typography>
                                </Box>
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
                                    {studySet.totalMember} thành viên |
                                </Typography>
                                <Typography
                                    ml={0.5}
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ fontSize: 14, userSelect: 'none' }}
                                >
                                    {studySet.totalStudySet} học phần
                                </Typography>
                            </Box>
                            <Box display="flex" mt={3} textAlign={'left'}>
                                <Avatar sx={{ height: 20, width: 20 }} src={studySet.imageUrl} alt="logo" />
                                <Typography
                                    ml={1}
                                    sx={{
                                        color: AppStyles.colors['#767680'],
                                        fontSize: 14,
                                        fontWeight: 500,
                                        userSelect: 'none',
                                    }}
                                >
                                    {studySet.creator}
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
