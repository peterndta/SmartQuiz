import { useEffect, useState } from 'react'

import { Box, Grid, Skeleton } from '@mui/material'
import EmptyStudySets from '~/components/EmptyStudySets'
import ListClassCard from '~/components/ListClassCard'
import SideBanner from '~/components/SideBanner'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { Mock_Data } from '~/Mock'
import { useClass } from '~/actions/class'
import sets_empty from '~/assets/images/sets_empty.png'
import { useAppSelector } from '~/hooks/redux-hooks'

const MyClass = () => {
    const { getMyClass, getClassHasJoined } = useClass()
    const { userId } = useAppSelector((state) => state.auth)
    const showSnackBar = useSnackbar()
    const [loading, setIsLoading] = useState(true)
    const [myStudySets, setMyStudySets] = useState([])

    useEffect(() => {
        const firstController = new AbortController()
        const firstSignal = firstController.signal
        const secondController = new AbortController()
        const secondSignal = secondController.signal

        const getOwnClass = getMyClass(userId, firstSignal)
        const getJoinedClass = getClassHasJoined(userId, secondSignal)

        Promise.all([getOwnClass, getJoinedClass])
            .then((res) => {
                const ownClass = res[0].data.data
                const joinedClass = res[1].data.data
                setMyStudySets((prev) => [...prev, ...ownClass, ...joinedClass])
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
            firstController.abort()
            secondController.abort()
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
    ) : myStudySets.length > 0 ? (
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
                    <ListClassCard studySets={myStudySets} md={3} />
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
                    textAbove="Bạn chưa có học phần nào"
                    textBelow="Các học phần bạn tạo sẽ hiển thị ở đây."
                    content="Tạo lóp học"
                    path={undefined}
                />
            </Grid>
            <Grid item xs={2} md={2} lg={2}>
                <SideBanner />
            </Grid>
        </Grid>
    )
}

export default MyClass
