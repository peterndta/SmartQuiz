import { useHistory } from 'react-router-dom'

import { CheckBox } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'

import { UpgradeOptions } from '~/Mock'
import { AppStyles } from '~/constants/styles'

const YearlyOption = () => {
    const EndButton = {
        mt: 13,
        width: '100%',
        textTransform: 'none',
        color: 'white',
        fontSize: 16,
        fontWeight: 500,
        backgroundColor: AppStyles.colors['#FFAF00'],
        ':hover': {
            bgcolor: '#e59d00',
            color: 'white',
        },
    }
    const history = useHistory()
    return (
        <Box
            sx={{
                py: 5,
                px: 6,
                borderRadius: 2,
                border: '2px solid #0045e5',
                backgroundColor: AppStyles.colors['#0045e5'],
                m: '0 auto',
            }}
        >
            <Box display="flex" justifyContent="center" mb={5.5}>
                <Box>
                    <Box display="flex">
                        <Typography sx={{ color: AppStyles.colors['#FFFFFF'], fontSize: 38, fontWeight: 800 }}>
                            100.00
                        </Typography>
                        <Typography ml={0.5} sx={{ color: AppStyles.colors['#FFFFFF'], fontSize: 38, fontWeight: 800 }}>
                            VND
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                        <Typography
                            sx={{
                                mt: -1,
                                color: AppStyles.colors['#CCDBFF'],
                                fontSize: 24,
                                fontWeight: 800,
                                textDecoration: 'line-through',
                            }}
                        >
                            240.00 VND
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" mt={2}>
                    <Typography
                        // textAlign="revert"
                        ml={0.5}
                        sx={{ color: AppStyles.colors['#CCDBFF'], fontSize: 20, fontWeight: 600 }}
                    >
                        / năm
                    </Typography>
                </Box>
            </Box>
            {UpgradeOptions.map((option, index) => (
                <Box display="flex" alignItems="center" key={option.id} mb={1}>
                    <Grid container spacing={3}>
                        <Grid item xs={1} md={1} lg={1}>
                            <CheckBox sx={{ color: AppStyles.colors['#FFAF00'] }} />
                        </Grid>
                        <Grid item xs={11} md={11} lg={11}>
                            <Typography
                                sx={{
                                    fontSize: 16,
                                    color: AppStyles.colors['#FFFFFF'],
                                }}
                                fontWeight={500}
                            >
                                {option.name}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            ))}
            <ButtonCompo variant="outlined" style={EndButton} onClick={() => history.push('/checkout?mode=yearly')}>
                Bắt đầu đăng ký
            </ButtonCompo>
        </Box>
    )
}

export default YearlyOption
