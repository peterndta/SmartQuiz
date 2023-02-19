import React from 'react'

import { Box } from '@mui/material'

import Header from '../Common/Header'

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            <Box minHeight="100vh" sx={{ m: '0 auto', pt: 8 }}>
                {children}
            </Box>
        </React.Fragment>
    )
}

export default Layout
