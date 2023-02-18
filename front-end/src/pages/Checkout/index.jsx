import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

import { Box, Grid, Typography } from '@mui/material'

import CheckoutPageLeft from './CheckoutPageLeft'
import CheckoutPageRight from './CheckoutPageRight'

import { AppStyles } from '~/constants/styles'

const Checkout = () => {
    const { search: query } = useLocation()
    const { mode } = queryString.parse(query)

    var now = new Date()
    var year = now.getFullYear()
    var month = now.getMonth() + 1
    var day = now.getDate()

    return (
        <Box maxWidth={1000} sx={{ m: '0 auto', mt: 5, mb: 9 }}>
            <Box>
                <Typography sx={{ fontSize: 32, fontWeight: 600, color: AppStyles.colors['#333333'] }}>
                    Hoàn tất thanh toán để bắt đầu sử dụng Premium
                </Typography>
                <Grid container mt={4} columnSpacing={6}>
                    <Grid item md={3} lg={5}>
                        <CheckoutPageLeft mode={mode ? mode : 'montly'} year={year} month={month} day={day} />
                    </Grid>
                    <Grid item md={9} lg={7}>
                        <CheckoutPageRight mode={mode ? mode : 'montly'} year={year} month={month} day={day} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Checkout
