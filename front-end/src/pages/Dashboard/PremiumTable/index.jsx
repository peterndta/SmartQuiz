import React from 'react'

import { Grid, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

import Sort from './Sort'
import StickyHeadTable from './Table'

const PremiumTable = () => {
    return (
        <React.Fragment>
            <Grid mb={4.5} container columnSpacing={4} alignItems="center">
                <Grid item md={11}>
                    <Typography component="span" variant="h4" sx={{ color: blueGrey[800], fontWeight: 500 }}>
                        Danh sách mua Premium
                    </Typography>
                </Grid>
                <Grid item md={1}>
                    <Sort />
                </Grid>
            </Grid>
            <StickyHeadTable />
        </React.Fragment>
    )
}

export default PremiumTable
