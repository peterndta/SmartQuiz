import MediaButton from './../../components/MediaButton/index'
import { Box } from '@mui/material'

import GoogleIcon from '~/assets/images/google-icon.png'
import { APP_API_URL } from '~/config'

const SigninForm = () => {
    const googleClickHandler = () => {
        window.location.assign(`${APP_API_URL}/api/authentication`)
    }

    return (
        <Box width="1" mt={5} component="form">
            <MediaButton src={GoogleIcon} content="Đăng nhập với Google" onClick={googleClickHandler} />
        </Box>
    )
}

export default SigninForm
