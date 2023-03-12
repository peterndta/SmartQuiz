import { Box, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

import Chart from './Chart'
import PremiumTable from './PremiumTable'
import StatisticCards from './StatisticCards'

const Dashboard = () => {
    return (
        <Box maxWidth={1580} sx={{ m: '0 auto' }}>
            <Box mb={4.5} mt={6}>
                <Typography component="span" variant="h4" sx={{ color: blueGrey[800], fontWeight: 500 }}>
                    Dashboard
                </Typography>
            </Box>
            <StatisticCards />
            <Chart statis={1} />
            <PremiumTable />
        </Box>
    )
}

export default Dashboard
