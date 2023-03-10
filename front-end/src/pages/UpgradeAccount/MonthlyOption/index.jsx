import { useHistory } from 'react-router-dom'

import { CheckBox } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'

import { PremiumPrice, UpgradeOptions } from '~/Mock'
import { AppStyles } from '~/constants/styles'

const MonthlyOption = () => {
    const EndButton = {
        mt: 13,
        width: '100%',
        textTransform: 'none',
        color: 'white',
        fontSize: 16,
        fontWeight: 500,
        backgroundColor: AppStyles.colors['#004DFF'],
        ':hover': {
            bgcolor: AppStyles.colors['#0045e5'],
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
                backgroundColor: AppStyles.colors['#FAFBFF'],
                m: '0 auto',
            }}
        >
            <Box display="flex" justifyContent="center" mb={9}>
                <Typography sx={{ color: AppStyles.colors['#000F33'], fontSize: 38, fontWeight: 800 }}>
                    {PremiumPrice.montly.VN_Price}
                </Typography>
                <Typography ml={0.5} sx={{ color: AppStyles.colors['#000F33'], fontSize: 38, fontWeight: 800 }}>
                    VND
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                    <Typography ml={0.5} sx={{ color: AppStyles.colors['#000F33'], fontSize: 20, fontWeight: 600 }}>
                        / tháng
                    </Typography>
                </Box>
            </Box>
            {UpgradeOptions.map((option) => (
                <Box display="flex" alignItems="center" key={option.id} mb={1}>
                    <Grid container spacing={3}>
                        <Grid item xs={1} md={1} lg={1}>
                            <CheckBox sx={{ color: AppStyles.colors['#FFAF00'] }} />
                        </Grid>
                        <Grid item xs={11} md={11} lg={11}>
                            <Typography
                                sx={{
                                    fontSize: 16,
                                    color: AppStyles.colors['#000F33'],
                                }}
                                fontWeight={500}
                            >
                                {option.name}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            ))}
            <ButtonCompo variant="outlined" style={EndButton} onClick={() => history.push('/checkout?mode=montly')}>
                Bắt đầu đăng ký
            </ButtonCompo>
        </Box>
    )
}

export default MonthlyOption
