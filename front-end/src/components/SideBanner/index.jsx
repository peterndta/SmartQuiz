import React from 'react'

import { useHistory } from 'react-router-dom'

import { Box } from '@mui/material'

import side_banner from '~/assets/images/side_banner.png'

const SideBanner = ({ style }) => {
    const history = useHistory()
    return (
        <Box
            component="img"
            alt="premium-banner"
            src={side_banner}
            sx={{
                width: 405,
                aspectRatio: '16 / 9',
                objectFit: 'cover',
                height: 810,
                cursor: 'pointer',
                ...style,
            }}
            onClick={() => history.push('/upgrade')}
        />
    )
}

export default SideBanner
