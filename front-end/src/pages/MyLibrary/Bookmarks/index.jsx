import { useEffect, useState } from 'react'

import { Box, Grid, Skeleton } from '@mui/material'
import EmptyStudySets from '~/components/EmptyStudySets'
import ListStudySets from '~/components/ListStudySets'
import SideBanner from '~/components/SideBanner'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { Mock_Data } from '~/Mock'
import { useBookmark } from '~/actions/bookmark'
import sets_empty from '~/assets/images/sets_empty.png'
import { useAppSelector } from '~/hooks/redux-hooks'

const Bookmarks = () => {
    const { userId } = useAppSelector((state) => state.auth)
    const showSnackBar = useSnackbar()
    const { getMyBookmarks } = useBookmark()
    const [loading, setIsLoading] = useState(true)
    const [myBookmarks, setMyBookmarks] = useState([])

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        getMyBookmarks(userId, signal)
            .then((res) => {
                const data = res.data.data
                setMyBookmarks(data)
            })
            .catch(() => {
                showSnackBar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
            .finally(() => {
                setIsLoading(false)
            })

        return () => {
            controller.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return loading ? (
        <Grid
            container
            spacing={3}
            columnSpacing={5}
            sx={{
                backgroundColor: '#eef2ff',
                width: '80%',
                mt: 2,
                position: 'absolute',
            }}
        >
            <Grid item container md={10} lg={10} xs={10} spacing={3}>
                {Mock_Data.search.map((item) => (
                    <Grid item md={4} key={item.id}>
                        <Skeleton sx={{ height: 120 }} animation="wave" variant="rounded" />
                    </Grid>
                ))}
            </Grid>
            <Grid item xs={2} md={2} lg={2}>
                <SideBanner />
            </Grid>
        </Grid>
    ) : myBookmarks.length > 0 ? (
        <Box
            sx={{
                backgroundColor: '#eef2ff',
                width: '80%',
                mt: 5,
                position: 'absolute',
            }}
        >
            <Grid container spacing={3} columnSpacing={5}>
                <Grid item lg={10} md={10} xs={10}>
                    <ListStudySets studySets={myBookmarks} md={3} />
                </Grid>
                <Grid item xs={2} md={2} lg={2}>
                    <SideBanner />
                </Grid>
            </Grid>
        </Box>
    ) : (
        <Grid
            container
            spacing={3}
            columnSpacing={5}
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
                    textAbove="Bạn chưa có lưu học phần nào"
                    textBelow="Các học phần được lưu sẽ hiển thị ở đây."
                    content="Tìm học phần"
                    path={'/study-sets'}
                />
            </Grid>
            <Grid item xs={2} md={2} lg={2}>
                <SideBanner />
            </Grid>
        </Grid>
    )
}

export default Bookmarks
