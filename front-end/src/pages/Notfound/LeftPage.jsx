import React from 'react'

import { useHistory } from 'react-router-dom'

import { Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'

import { AppStyles } from '~/constants/styles'

const LeftPage = () => {
    const history = useHistory()
    return (
        <React.Fragment>
            <Typography sx={{ fontSize: 152, color: AppStyles.colors['#000F33'] }} fontWeight={800} align="center">
                404
            </Typography>
            <Typography align="center" sx={{ color: AppStyles.colors['#767680'] }}>
                Trang này không tồn tại hoặc đã bị xoá!
            </Typography>
            <ButtonCompo
                style={{ mt: 2, backgroundColor: AppStyles.colors['#004DFF'] }}
                onClick={() => history.push('/')}
            >
                Quay về trang chủ
            </ButtonCompo>
        </React.Fragment>
    )
}

export default LeftPage
