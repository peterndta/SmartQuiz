import { Avatar, Box, Divider, Grid, Typography } from '@mui/material'

import Medal1 from '~/assets/images/Metal-1.png'
import Medal2 from '~/assets/images/Metal-2.png'
import Medal3 from '~/assets/images/Metal-3.png'
import { AppStyles } from '~/constants/styles'

const TableClass = ({ classes }) => {
    return (
        <Box p={2} pb={4}>
            {classes.map((data, index) => (
                <Grid key={index} pl={2} pt={2} container spacing={3}>
                    <Grid item xs={4} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                        {index < 1 ? (
                            <Avatar alt="avatar" src={Medal1} sx={{ width: 65, height: 65, cursor: 'pointer' }} />
                        ) : index < 2 ? (
                            <Avatar alt="avatar" src={Medal2} sx={{ width: 65, height: 65, cursor: 'pointer' }} />
                        ) : index < 3 ? (
                            <Avatar alt="avatar" src={Medal3} sx={{ width: 65, height: 65, cursor: 'pointer' }} />
                        ) : (
                            <Typography textAlign="center" variant="h6">
                                {index + 1}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={8} md={8} lg={9}>
                        <Box display="flex">
                            <Typography
                                textAlign={'left'}
                                gutterBottom
                                variant="body1"
                                component="div"
                                fontWeight={500}
                                sx={{
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: '1',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {data.className}
                            </Typography>
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
                                {data.totalMember} thành viên |
                            </Typography>
                            <Typography
                                ml={0.5}
                                variant="body1"
                                color="text.secondary"
                                sx={{ fontSize: 14, userSelect: 'none' }}
                            >
                                {data.totalStudySet} học phần
                            </Typography>
                        </Box>
                        <Box display="flex" mt={2} textAlign={'left'} justifyContent="space-between">
                            <Box display="flex" textAlign={'left'}>
                                <Avatar sx={{ height: 20, width: 20 }} src={data.imageUrl} alt="logo" />
                                <Typography
                                    ml={1}
                                    sx={{
                                        color: AppStyles.colors['#767680'],
                                        fontSize: 14,
                                        fontWeight: 500,
                                        userSelect: 'none',
                                    }}
                                >
                                    {data.creator}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    {index < classes.length - 1 && (
                        <Divider
                            sx={{
                                width: '95%',
                                height: 2,
                                mt: 2,
                            }}
                        />
                    )}
                </Grid>
            ))}
        </Box>
    )
}

export default TableClass
