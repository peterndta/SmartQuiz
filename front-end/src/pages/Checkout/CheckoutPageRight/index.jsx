import { Box, Divider, Typography } from '@mui/material'

import InputBox from './InputBox'

import { AppStyles } from '~/constants/styles'
import { useAppSelector } from '~/hooks/redux-hooks'

const CheckoutPageRight = ({ mode, year, month, day }) => {
    const { email, username } = useAppSelector((state) => state.auth)

    return (
        <Box>
            <Typography sx={{ fontSize: 20, fontWeight: 600, color: AppStyles.colors['#333333'] }}>
                Tài khoản của bạn
            </Typography>
            <Box display="flex" justifyContent="center">
                <Divider
                    sx={{
                        width: '100%',
                        height: 2,
                        mt: 2,
                        backgroundColor: AppStyles.colors['#E6EDFF'],
                        opacity: 0.5,
                    }}
                />
            </Box>
            <Box mt={2}>
                <Typography sx={{ color: AppStyles.colors['#333333'], fontWeight: 500 }}>Email</Typography>
                <InputBox name={email} />
            </Box>
            <Box mt={2}>
                <Typography sx={{ color: AppStyles.colors['#333333'], fontWeight: 500 }}>Tên tài khoản</Typography>
                <InputBox name={username} />
            </Box>

            <Box mt={2}>
                <Typography sx={{ fontSize: 14, color: AppStyles.colors['#333333'], opacity: 0.5 }}>
                    Gói đăng ký Premium theo {mode === 'yearly' ? 'năm' : 'tháng'} của bạn sẽ bắt đầu từ hôm nay và sẽ
                    tự động hết hạn vào ngày {day} tháng {mode === 'montly' ? month + 1 : month},{' '}
                    {mode === 'yearly' ? year + 1 : year}. Sau ngày hết hạn nếu muốn tiếp tục sử dụng dịch vụ Premium,
                    bạn phải đăng ký lại gói.
                </Typography>
            </Box>
        </Box>
    )
}

export default CheckoutPageRight
