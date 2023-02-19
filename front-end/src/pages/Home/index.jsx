import { useEffect, useState } from 'react'

import { Grid } from '@mui/material'

import Banner from './Banner'
import ClassList from './ClassList'
import PopularTable from './PopularTable'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { Mock_Data } from '~/Mock'
import { useStudySet } from '~/actions/study-set'
import { useAppSelector } from '~/hooks/redux-hooks'
import StudySetCards from '~/pages/Home/StudySetCards'
import Loading from '~/pages/Loading'

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

    return isLoading ? (
        <Loading />
    ) : (
        <Grid maxWidth={1660} container spacing={3} columnSpacing={4} sx={{ pt: 2, m: '0 auto', mb: 9 }}>
            <Grid item xs={12} md={8} lg={8}>
                <Banner />
                <StudySetCards title="Đã xem gần đây" studySets={recentStudySets} />
                <ClassList title="Lớp học" studySets={Mock_Data.yourSet} />
                <StudySetCards title="Gợi ý cho bạn" studySets={recommendStudySets} />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <PopularTable studySet={Mock_Data.recent} />
            </Grid>
        </Grid>
    )
}

export default Home
