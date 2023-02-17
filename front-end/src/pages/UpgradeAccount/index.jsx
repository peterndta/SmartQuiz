import { Avatar, Box, Button, Grid, Typography } from '@mui/material'

import CurrentUseOption from './CurrentUseOption'
import MonthlyOption from './MonthlyOption'
import YearlyOption from './YearlyOption'

import Crown from '~/assets/images/Crown.png'
import logo from '~/assets/images/Logo.png'
import star from '~/assets/images/TopStar.png'
import { AppStyles } from '~/constants/styles'

const UpgradeAccount = () => {
    return (
        <Box maxWidth={1254} sx={{ m: '0 auto', mt: 7, mb: 9 }}>
            <Box display="flex" alignItems="center" justifyContent="center">
                <Avatar sx={{ height: 50, width: 150 }} src={logo} alt="logo" />
                <Button
                    sx={{
                        height: 56,
                        color: AppStyles.colors['#000F33'],
                        mr: 4,
                        borderRadius: 3,
                        px: 3,
                        // py: 0.5,
                        backgroundColor: AppStyles.colors['#FEDA01'],
                        ':disabled': {
                            bgcolor: '#FEDA01',
                            color: AppStyles.colors['#000F33'],
                            boxShadow: 'none',
                        },
                        cursor: 'default',
                        boxShadow: 'none',
                    }}
                    disabled={true}
                    draggable={false}
                    variant="contained"
                    startIcon={<Avatar src={Crown} />}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        PREMIUM
                    </Typography>
                </Button>
            </Box>
            <Grid container spacing={3} mt={6}>
                <Grid item xs={4} md={4} lg={4}>
                    <CurrentUseOption />
                </Grid>
                <Grid item xs={4} md={4} lg={4}>
                    <MonthlyOption />
                </Grid>
                <Grid item xs={4} md={4} lg={4}>
                    <Box
                        height={100}
                        width={100}
                        display="flex"
                        style={{
                            backgroundImage: `url(${star})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            overflow: 'hidden',
                            position: 'absolute',
                            right: '17.3%',
                            top: '26.5%',
                            borderTopRightRadius: 6,
                        }}
                    />
                    <YearlyOption />
                </Grid>
            </Grid>
        </Box>
    )
}

export default UpgradeAccount
