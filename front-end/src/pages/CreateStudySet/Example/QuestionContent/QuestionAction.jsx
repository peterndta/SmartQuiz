import { Image, Lock } from '@mui/icons-material'
import { Badge, Box, IconButton, Stack, Typography } from '@mui/material'

import { AppStyles } from './../../../../constants/styles'

const QuestionAction = ({ index }) => {
    return (
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography fontWeight={700}>{index + 1}.</Typography>
            <Stack direction="row" spacing={3}>
                <IconButton>
                    <Badge
                        sx={{
                            '& .MuiBadge-badge': {
                                backgroundColor: AppStyles.colors['#FFAF00'],
                            },
                        }}
                        badgeContent={<Lock sx={{ fontSize: 16, color: AppStyles.colors['#004DFF'] }} />}
                    >
                        <Image color="primary" />
                    </Badge>
                </IconButton>
            </Stack>
            <Box display="flex"></Box>
        </Box>
    )
}

export default QuestionAction
