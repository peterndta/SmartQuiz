import { Box, CircularProgress } from '@mui/material'

const ProgressActionLoading = () => {
    return (
        <Box
            sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                // backgroundColor: '#3f2c2c7d',
                zIndex: 1000,
            }}
        >
            <Box
                width="1"
                height="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="fixed"
                sx={{ backgroundColor: '#3f2c2c7d' }}
            >
                <CircularProgress />
            </Box>
        </Box>
    )
}

export default ProgressActionLoading
