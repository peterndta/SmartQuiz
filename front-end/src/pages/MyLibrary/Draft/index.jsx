import { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import EmptyStudySets from '~/components/EmptyStudySets'

import Create from './Create'

import sets_empty from '~/assets/images/sets_empty.png'
import LocalStorageUtils from '~/utils/LocalStorageUtils'

const Draft = () => {
    const createQuestions = LocalStorageUtils.getItem('create') || { path: '', studySet: [] }
    const [drafts, setDrafts] = useState(createQuestions.studySet)

    const deleteDraftItem = (event, id) => {
        event.stopPropagation()
        const updateDrafts = drafts.filter((draft) => draft.id !== id)
        setDrafts(updateDrafts)
    }

    useEffect(() => {
        if (drafts.length > 0) {
            LocalStorageUtils.setItem('create', { path: '', studySet: drafts })
        } else {
            LocalStorageUtils.removeItem('create')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drafts.length])

    return drafts.length > 0 ? (
        <Box
            sx={{
                backgroundColor: '#eef2ff',
                width: '80%',
                mt: 5,
                position: 'absolute',
            }}
        >
            <Create title="Tạo mới" studySets={drafts} deleteDraftItem={deleteDraftItem} />
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
