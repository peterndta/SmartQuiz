import { Box, CircularProgress } from '@mui/material'

const LoadingClasses = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" width="1" margin="0 auto" mt={5}>
            <CircularProgress color="primary" size={50} />
        </Box>
    )
}

export default LoadingClasses
