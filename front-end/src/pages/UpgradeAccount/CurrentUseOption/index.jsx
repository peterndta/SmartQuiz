import { CheckBox } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'

import { UpgradeOptions } from '~/Mock'
import { AppStyles } from '~/constants/styles'

const CurrentUseOption = () => {
    const EndButton = {
        mt: 14,
        width: '100%',
        textTransform: 'none',
        fontSize: 16,
        fontWeight: 500,
        '&:disabled': {
            borderColor: AppStyles.colors['#767680'],
            color: AppStyles.colors['#767680'],
        },
    }
    return (
        <Box
            sx={{
                py: 5,
                px: 6,
                borderRadius: 2,
                border: '2px solid #767680',
                backgroundColor: AppStyles.colors['#FAFBFF'],
                m: '0 auto',
            }}
        >
            <Box display="flex" justifyContent="center" mb={9}>
                <Typography sx={{ color: AppStyles.colors['#000F33'], fontSize: 38, fontWeight: 800 }}>0</Typography>
                <Typography ml={0.5} sx={{ color: AppStyles.colors['#000F33'], fontSize: 38, fontWeight: 800 }}>
                    VND
                </Typography>
            </Box>
            {UpgradeOptions.map((option, index) => (
                <Box display="flex" alignItems="center" key={option.id} mb={1}>
                    <Grid container spacing={3}>
                        <Grid item xs={1} md={1} lg={1}>
                            {!option.isPremium && <CheckBox sx={{ color: AppStyles.colors['#FFAF00'] }} />}
                        </Grid>
                        <Grid item xs={11} md={11} lg={11}>
                            <Typography
                                sx={{
                                    fontSize: 16,
                                    color: option.isPremium ? AppStyles.colors['#333333'] : AppStyles.colors['#000F33'],
                                    opacity: option.isPremium && 0.4,
                                    textDecoration: option.isPremium && 'line-through',
                                }}
                                fontWeight={500}
                            >
                                {option.name}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            ))}
            <ButtonCompo disable={true} variant="outlined" style={EndButton}>
                Đang sử dụng
            </ButtonCompo>
        </Box>
    )
}

export default CurrentUseOption
