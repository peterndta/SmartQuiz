import { Link } from 'react-router-dom'

import { Box, Button, Typography } from '@mui/material'

import { AppStyles } from '~/constants/styles'

const EmptyStudySets = ({ textAbove, textBelow, image, disable = false }) => {
    return (
        <Box textAlign="center">
            {image && (
                <Box
                    mt={2}
                    component="img"
                    alt="sets_empty"
                    src={image}
                    sx={{
                        width: 300,
                        height: 150,
                    }}
                />
            )}

            <Typography fontSize={24} fontWeight={700} sx={{ color: AppStyles.colors['#000F33'] }}>
                {textAbove}
            </Typography>
            <Typography fontSize={16} mt={1} sx={{ color: AppStyles.colors['#000F33'] }}>
                {textBelow}
            </Typography>
            {!disable && (
                <Button
                    sx={{
                        color: AppStyles.colors['#FFFFFF'],
                        borderRadius: 3,
                        px: 3,
                        py: 1,
                        mt: 3,
                        textTransform: 'none',
                        backgroundColor: AppStyles.colors['#004DFF'],
                        ':hover': {
                            bgcolor: AppStyles.colors['#0045e5'],
                            color: 'white',
                        },
                    }}
                    component={Link}
                    to="/create"
                >
                    <Typography> Tạo học phần</Typography>
                </Button>
            )}
        </Box>
    )
}

export default EmptyStudySets
