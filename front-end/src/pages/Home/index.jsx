import { useEffect, useState } from 'react'

import { Grid, Skeleton } from '@mui/material'

import Banner from './Banner'
import ClassList from './ClassList'
import PopularTable from './PopularTable'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { Mock_Data } from '~/Mock'
import { useStudySet } from '~/actions/study-set'
import { useAppSelector } from '~/hooks/redux-hooks'
import StudySetCards from '~/pages/Home/StudySetCards'

const Home = () => {
    const { userId } = useAppSelector((state) => state.auth)
    const [isLoading, setIsLoading] = useState(true)
    const [recentStudySets, setRecentStudySet] = useState([])
    const [recommendStudySets, setRecommendedStudySets] = useState([])
    const { getRecentStudySets, getRecommendStudySets } = useStudySet()
    const showSnackBar = useSnackbar()

    useEffect(() => {
        const firstController = new AbortController()
        const firstSignal = firstController.signal
        const secondController = new AbortController()
        const secondSignal = secondController.signal

        const getRecent = getRecentStudySets(userId, 6, firstSignal)
        const getRecommended = getRecommendStudySets(userId, 3, secondSignal)

        Promise.all([getRecent, getRecommended])
            .then((res) => {
                const recent = res[0].data.data
                const recommend = res[1].data.data

                setRecentStudySet(recent)
                setRecommendedStudySets(recommend)
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

    return (
        <Grid maxWidth={1660} container spacing={3} columnSpacing={4} sx={{ pt: 2, m: '0 auto', mb: 9 }}>
            <Grid item xs={12} md={8} lg={8}>
                {isLoading ? (
                    <Skeleton sx={{ height: 240, width: 1074 }} animation="wave" variant="rounded" />
                ) : (
                    <Banner />
                )}
                <StudySetCards
                    title="Đã xem gần đây"
                    studySets={recentStudySets}
                    isLoading={isLoading}
                    loadType={Mock_Data.recent}
                />
                <ClassList title="Lớp học" studySets={Mock_Data.yourSet} isLoading={isLoading} />
                <StudySetCards
                    title="Gợi ý cho bạn"
                    studySets={recommendStudySets}
                    isLoading={isLoading}
                    loadType={Mock_Data.yourSet}
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                {isLoading ? (
                    <Skeleton sx={{ height: 730, width: 521 }} animation="wave" variant="rounded" />
                ) : (
                    <PopularTable studySet={Mock_Data.recent} isLoading={isLoading} />
                )}
            </Grid>
        </Grid>
    )
}

export default Home
