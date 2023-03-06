import { Box } from '@mui/material'

import NotFound from '~/assets/images/404.png'

const RightPage = () => {
    return (
        <Box mt={15} display="flex" justifyContent="flex-end">
            <Box
                component="img"
                alt="404"
                src={NotFound}
                sx={{ height: '827.35px', width: '774.2px', objectFit: 'contain' }}
            />
        </Box>
    )
}

export default RightPage
