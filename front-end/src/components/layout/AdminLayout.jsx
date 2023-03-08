import { Box } from '@mui/material'

import Header from '../Admin/Header'

const Layout = ({ children }) => {
    return (
        <Box minWidth="100vh">
            <Header />
            <Box minHeight="100vh" sx={{ m: '0 auto', pt: 8 }}>
                {children}
            </Box>
        </Box>
    )
}

export default Layout
