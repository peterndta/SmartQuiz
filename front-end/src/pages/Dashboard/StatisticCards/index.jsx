import { Fragment, useEffect, useState } from 'react'

import { Description, Group, Paid, School } from '@mui/icons-material'
import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material'
import { blueGrey, grey } from '@mui/material/colors'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { useAdmin } from '~/actions/admin'

const StatisticCards = () => {
    const { getStatistic } = useAdmin()
    const [statis, setStatis] = useState({})
    const showSnackBar = useSnackbar()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        getStatistic(signal)
            .then((response) => {
                const data = response.data.data
                setStatis(data)
            })
            .catch(() => {
                showSnackBar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
            .finally(() => {
                setIsLoading(false)
            })
        return () => {
            controller.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Fragment>
            {isLoading ? (
                <Box display="flex" justifyContent="space-around">
                    <Skeleton sx={{ height: 96, width: 344, borderRadius: 4 }} animation="wave" variant="rounded" />
                    <Skeleton sx={{ height: 96, width: 344, borderRadius: 4 }} animation="wave" variant="rounded" />
                    <Skeleton sx={{ height: 96, width: 344, borderRadius: 4 }} animation="wave" variant="rounded" />
                    <Skeleton sx={{ height: 96, width: 344, borderRadius: 4 }} animation="wave" variant="rounded" />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper elevation={3} sx={{ borderRadius: 4 }}>
                            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                <Grid item xs={9}>
                                    <Box p={2}>
                                        <Typography
                                            fontWeight={700}
                                            sx={{
                                                color: grey[600],
                                            }}
                                            fontSize="1.1rem"
                                        >
                                            Tổng số học phần
                                        </Typography>
                                        <Typography
                                            fontWeight={700}
                                            sx={{
                                                color: blueGrey[800],
                                            }}
                                            fontSize="1.6rem"
                                        >
                                            {statis.totalStudySet}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <Box
                                        display="flex"
                                        ml={2}
                                        sx={{
                                            background: 'linear-gradient(191deg, rgb(66, 66, 74), rgb(25, 25, 25))',
                                            borderRadius: 2,
                                        }}
                                        width="3.5rem"
                                        height="3.5rem"
                                        borderRadius="md"
                                        justifyContent="center"
                                        alignItems="center"
                                        shadow="md"
                                    >
                                        <Description fontSize="medium" sx={{ color: '#ffffff' }} />
                                    </Box>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper elevation={3} sx={{ borderRadius: 4 }}>
                            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                <Grid item xs={9}>
                                    <Box p={2}>
                                        <Typography
                                            fontWeight={700}
                                            sx={{
                                                color: grey[600],
                                            }}
                                            fontSize="1.1rem"
                                        >
                                            Tổng số tài khoản
                                        </Typography>
                                        <Typography
                                            fontWeight={700}
                                            sx={{
                                                color: blueGrey[800],
                                            }}
                                            fontSize="1.6rem"
                                        >
                                            {statis.totalUser}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <Box
                                        display="flex"
                                        ml={2}
                                        sx={{
                                            background: 'linear-gradient(191deg, rgb(73, 163, 241), rgb(26, 115, 232))',
                                            borderRadius: 2,
                                        }}
                                        width="3.5rem"
                                        height="3.5rem"
                                        borderRadius="md"
                                        justifyContent="center"
                                        alignItems="center"
                                        shadow="md"
                                    >
                                        <Group fontSize="medium" sx={{ color: '#ffffff' }} />
                                    </Box>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper elevation={3} sx={{ borderRadius: 4 }}>
                            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                <Grid item xs={9}>
                                    <Box p={2}>
                                        <Typography
                                            fontWeight={700}
                                            sx={{
                                                color: grey[600],
                                            }}
                                            fontSize="1.1rem"
                                        >
                                            Tổng số lớp học
                                        </Typography>
                                        <Typography
                                            fontWeight={700}
                                            sx={{
                                                color: blueGrey[800],
                                            }}
                                            fontSize="1.6rem"
                                        >
                                            {statis.totalClass}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <Box
                                        display="flex"
                                        ml={2}
                                        sx={{
                                            background: 'linear-gradient(191deg, rgb(102, 187, 106), rgb(67, 160, 71))',
                                            borderRadius: 2,
                                        }}
                                        width="3.5rem"
                                        height="3.5rem"
                                        borderRadius="md"
                                        justifyContent="center"
                                        alignItems="center"
                                        shadow="md"
                                    >
                                        <School fontSize="medium" sx={{ color: '#ffffff' }} />
                                    </Box>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper elevation={3} sx={{ borderRadius: 4 }}>
                            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                <Grid item xs={9}>
                                    <Box p={2}>
                                        <Typography
                                            fontWeight={700}
                                            sx={{
                                                color: grey[600],
                                            }}
                                            fontSize="1.1rem"
                                        >
                                            Tổng tiền thu được
                                        </Typography>
                                        <Typography
                                            fontWeight={700}
                                            sx={{
                                                color: blueGrey[800],
                                            }}
                                            fontSize="1.6rem"
                                        >
                                            {`${(
                                                statis.totalMonthSubcription * 2000 +
                                                statis.totalYearSubcription * 60000
                                            ).toLocaleString()} VND`}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <Box
                                        display="flex"
                                        ml={2}
                                        sx={{
                                            background: 'linear-gradient(191deg, rgb(236, 64, 122), rgb(216, 27, 96))',
                                            borderRadius: 2,
                                        }}
                                        width="3.5rem"
                                        height="3.5rem"
                                        borderRadius="md"
                                        justifyContent="center"
                                        alignItems="center"
                                        shadow="md"
                                    >
                                        <Paid fontSize="medium" sx={{ color: '#ffffff' }} />
                                    </Box>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Fragment>
    )
}

export default StatisticCards
