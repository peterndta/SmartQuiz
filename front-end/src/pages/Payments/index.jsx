import { useState } from 'react'

import { Box, Typography } from '@mui/material'

import { AppStyles } from '~/constants/styles'

const Payments = () => {
    const [userPayment, setUserPayment] = useState({})
    return (
        <Box height="1" display="flex" alignItems="center" justifyContent="center" mt={5}>
            <Typography variant="h3" fontWeight={700} sx={{ color: AppStyles.colors['#000F33'] }}>
                Lịch sử giao dịch
            </Typography>
        </Box>
    )
}

export default Payments
