import React from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

import SearchBox from './Search'
import StickyHeadTable from './Table'

const PremiumTable = () => {
    return (
        <Box mt={3} mb={11}>
            <Grid mb={5} container columnSpacing={4}>
                <Grid mt={6} item md={8}>
                    <Typography component="span" variant="h4" sx={{ color: blueGrey[800], fontWeight: 500 }}>
                        Danh sách mua Premium
                    </Typography>
                </Grid>
                <Grid mt={6} item md={4}>
                    <SearchBox />
                </Grid>
            </Grid>
            <StickyHeadTable />
        </Box>
    )
}

export default PremiumTable
