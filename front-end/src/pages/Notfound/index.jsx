import { Box } from '@mui/material'

import LeftPage from './LeftPage'
import RightPage from './RightPage'

const NotFound = () => {
    return (
        <Box display="flex" height="92.5vh" overflow="hidden">
            <Box
                flexBasis="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="1"
                flexDirection="column"
            >
                <LeftPage />
            </Box>
            <Box flexBasis="50%">
                <RightPage />
            </Box>
        </Box>
    )
}

export default NotFound
