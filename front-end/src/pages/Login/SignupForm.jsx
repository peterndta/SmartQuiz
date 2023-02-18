import Input from '../../components/Input'
import { Box, Button, Typography } from '@mui/material'
import MediaButton from '~/components/MediaButton'

import GoogleIcon from '~/assets/images/google-icon.png'
import { AppStyles } from '~/constants/styles'

const SignupForm = () => {
    return (
        <Box width="1" mt={1} component="form">
            <MediaButton src={GoogleIcon} content="Đăng nhập với Google" />
            <Typography textAlign="center" sx={{ my: 5, color: AppStyles.colors['#767680'] }}>
                Hoặc
            </Typography>
            <label>Tên Đăng nhập</label>
            <Input label="Tên đăng nhập" placeholder="Example@gmail.com" isFullwidth={true} />
            <Box display="flex" justifyContent="space-between" mt={3}>
                <label>Mật khẩu</label>
            </Box>
            <Input label="Mật khẩu" placeholder="Nhập mật khẩu của bạn" isFullwidth={true} />
            <Box display="flex" justifyContent="space-between" mt={3}>
                <label>Xác nhận mật khẩu</label>
            </Box>
            <Input label="Mật khẩu" placeholder="Xác nhận mật khẩu của bạn" isFullwidth={true} />
            <Button fullWidth variant="contained" sx={{ py: 2.5, mt: 4, borderRadius: 2.25 }}>
                Đăng ký
            </Button>
        </Box>
    )
}

export default SignupForm
