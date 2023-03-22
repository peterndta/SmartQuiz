import React from 'react'

import { Box, Grid, Typography } from '@mui/material'

import Sort from './Sort'
import StickyHeadTable from './Table'

import { AppStyles } from '~/constants/styles'
import { useAppSelector } from '~/hooks/redux-hooks'

function padWithLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0')
}

const PaymentTable = () => {
    const { userId, username, email } = useAppSelector((state) => state.auth)
    return (
        <React.Fragment>
            <Grid mb={4.5} container columnSpacing={4} alignItems="center">
                <Grid item md={10}>
                    <Box display="flex">
                        <Typography
                            component="span"
                            variant="h6"
                            sx={{ color: AppStyles.colors['#0045e5'], fontWeight: 500 }}
                        >
                            Tài khoản:
                        </Typography>
                        <Typography
                            ml={1}
                            component="span"
                            variant="h6"
                            sx={{ color: AppStyles.colors['#0045e5'], fontWeight: 400 }}
                        >
                            {username}
                        </Typography>
                        <Typography
                            ml={1}
                            component="span"
                            variant="h6"
                            sx={{ color: AppStyles.colors['#0045e5'], fontWeight: 500 }}
                        >
                            - ID:
                        </Typography>
                        <Typography
                            ml={1}
                            component="span"
                            variant="h6"
                            sx={{ color: AppStyles.colors['#0045e5'], fontWeight: 400 }}
                        >
                            {padWithLeadingZeros(userId, 6)}
                        </Typography>
                        <Typography
                            ml={1}
                            component="span"
                            variant="h6"
                            sx={{ color: AppStyles.colors['#0045e5'], fontWeight: 500 }}
                        >
                            - Email:
                        </Typography>
                        <Typography
                            ml={1}
                            component="span"
                            variant="h6"
                            sx={{ color: AppStyles.colors['#0045e5'], fontWeight: 400 }}
                        >
                            {email}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item md={2} display="flex" justifyContent="flex-end">
                    <Sort />
                </Grid>
            </Grid>
            <StickyHeadTable />
        </React.Fragment>
    )
}

export default PaymentTable
