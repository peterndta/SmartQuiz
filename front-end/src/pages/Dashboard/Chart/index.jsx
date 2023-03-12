import { useState } from 'react'

import { Grid, Paper } from '@mui/material'

import VerticalBar from './VerticalBar'

const Chart = ({ topUser, topClasses, isLoadingMostUser, isLoadingMostClasses }) => {
    const [userMostPost, setUserMostPost] = useState({
        labels: topUser.map((data) => data.userName),
        datasets: [
            {
                label: 'Số Học Phần',
                data: topUser.map((data) => data.totalStudySet),
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
    const [classMostMember, setClassMostMember] = useState({
        labels: topClasses.map((data) => data.className),
        datasets: [
            {
                label: 'Số Thành Viên',
                data: topClasses.map((data) => data.totalMember),
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
        <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
                <Paper elevation={3} sx={{ borderRadius: 1 }} style={{ height: 400 }}>
                    <VerticalBar userMostPost={userMostPost} text="Top 5 Người Dùng Đóng Góp Nhiều Nhất" />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Paper elevation={3} sx={{ borderRadius: 1 }} style={{ height: 400 }}>
                    <VerticalBar userMostPost={classMostMember} text="Top 5 Lớp Học Nhiều Thành Viên Nhất" />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Chart
