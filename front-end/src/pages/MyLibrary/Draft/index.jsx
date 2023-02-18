import { Box, Grid } from '@mui/material'
import EmptyStudySets from '~/components/EmptyStudySets'

import Create from './Create'

import sets_empty from '~/assets/images/sets_empty.png'
import LocalStorageUtils from '~/utils/LocalStorageUtils'

const Draft = () => {
    const createQuestions = LocalStorageUtils.getItem('create') || { path: '', studySet: [] }

    return createQuestions.studySet.length > 0 ? (
        <Box
            sx={{
                backgroundColor: '#eef2ff',
                width: '80%',
                mt: 5,
                position: 'absolute',
            }}
        >
            <Create title="Tạo mới" studySets={createQuestions.studySet} />
        </Box>
    ) : (
        <Grid
            container
            spacing={3}
            columnSpacing={4}
            sx={{
                backgroundColor: '#eef2ff',
                width: '80%',
                mt: 2,
                position: 'absolute',
            }}
        >
            <Grid item xs={10} md={10} lg={10} justifyContent="center" alignItems="center">
                <EmptyStudySets
                    image={sets_empty}
                    textAbove="Bạn chưa có bản nháp nào."
                    textBelow="Các bản nháp được tạo sẽ hiển thị ở đây."
                    disable={true}
                />
            </Grid>
        </Grid>
    )
}

export default Draft
