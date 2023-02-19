import { Box, Typography } from '@mui/material'
import ListStudySets from '~/components/ListStudySets'

const StudySetCards = ({ title, studySets }) => {
    return (
        <Box mt={4}>
            <Typography
                textAlign={'left'}
                variant="h6"
                fontWeight={500}
                sx={{
                    color: 'black',
                    pb: 0.125,
                    mb: 2,
                    fontFamily: 'Roboto !important',
                }}
            >
                {title}
            </Typography>
            <ListStudySets studySets={studySets} md={4} />
        </Box>
    )
}

export default StudySetCards
