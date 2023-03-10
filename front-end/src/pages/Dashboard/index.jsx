import React from 'react'

import { Box, Typography } from '@mui/material'

import StatisticCards from './StatisticCards'

import { AppStyles } from '~/constants/styles'

const Dashboard = () => {
    return (
        <Box maxWidth={1660} sx={{ m: '0 auto' }}>
            <Box mb={4.5} mt={4}>
                <Typography component="span" variant="h4" sx={{ color: AppStyles.colors['#FFAF00'], fontWeight: 500 }}>
                    Dashboard
                </Typography>
            </Box>
            <StatisticCards statis={1} />
            {/* <Chart statis={statis} />
            <Grid mt={1} container spacing={3}>
                <Grid item xs={12} md={6} lg={6.5}>
                    <Paper elevation={3} sx={{ borderRadius: 4, height: '100%' }}>
                        <Doughnut statis={statis} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={5.5}>
                    <Paper elevation={3} sx={{ borderRadius: 2, height: '100%' }}>
                        <LatestAccounts statis={statis} />
                    </Paper>
                </Grid>
            </Grid> */}
            {/* <Box mt={4} display="flex" alignItems="center" justifyContent="center">
    <Paper
        elevation={3}
        sx={{ borderRadius: 4 }}
        style={{ width: 500, height: 550 }}
    >
        <Doughnut />
    </Paper>
</Box> */}
        </Box>
    )
}

export default Dashboard
