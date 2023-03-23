import { Box, Typography } from '@mui/material'

import PaymentTable from './PaymentTable'

import { AppStyles } from '~/constants/styles'

const Payments = () => {
    return (
        <Box maxWidth={1250} sx={{ m: '0 auto' }}>
            <Box height="1" display="flex" alignItems="center" justifyContent="center" mt={5}>
                <Typography variant="h3" fontWeight={700} sx={{ color: AppStyles.colors['#000F33'] }}>
                    Lịch sử giao dịch
                </Typography>
            </Box>
            <Box mt={3}>
                <PaymentTable />
            </Box>
        </Box>
    )
}

export default Payments
