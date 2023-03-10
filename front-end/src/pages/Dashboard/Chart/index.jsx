import React, { useState } from 'react'

import { Grid, Paper } from '@mui/material'

import VerticalBar from './VerticalBar'

import { Dashboard } from '~/Mock'

const Chart = ({ statis }) => {
    const [userMostPost, setUserMostPost] = useState({
        // labels: statis.topUserByHighPost.map((data) => data.name),
        labels: Dashboard.map((data) => data.name),
        datasets: [
            {
                label: 'Post',
                // data: statis.topUserByHighPost.map((data) => data.totalPost),
                data: Dashboard.map((data) => data.totalPost),
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                ],
            },
        ],
    })
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                    <Paper elevation={3} sx={{ borderRadius: 1 }} style={{ height: 430 }}>
                        <VerticalBar userMostPost={userMostPost} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Paper elevation={3} sx={{ borderRadius: 1 }} style={{ height: 430 }}>
                        <VerticalBar userMostPost={userMostPost} />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Chart
