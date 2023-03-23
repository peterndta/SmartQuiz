import { Box, Typography } from '@mui/material'

import ResultTable from './ResultTable'

import { AppStyles } from '~/constants/styles'

const TestResult = () => {
    return (
        <Box maxWidth={1250} sx={{ m: '0 auto' }}>
            <Box height="1" display="flex" alignItems="center" justifyContent="center" mt={5}>
                <Typography variant="h3" fontWeight={700} sx={{ color: AppStyles.colors['#000F33'] }}>
                    Lịch sử kiểm tra
                </Typography>
            </Box>
            <Box mt={3}>
                <ResultTable />
            </Box>
        </Box>
    )
}

export default TestResult
