import { useEffect, useState } from 'react'

import { Grid, Skeleton } from '@mui/material'

import Banner from './Banner'
import ClassList from './ClassList'
import PopularTable from './PopularTable'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { Mock_Data } from '~/Mock'
import { useAdmin } from '~/actions/admin'
import { useClass } from '~/actions/class'
import { useStudySet } from '~/actions/study-set'
import { useAppSelector } from '~/hooks/redux-hooks'
import StudySetCards from '~/pages/Home/StudySetCards'

const Home = () => {
    const { userId } = useAppSelector((state) => state.auth)
    const [isLoading, setIsLoading] = useState(true)
    const [recentStudySets, setRecentStudySet] = useState([])
    const [recommendStudySets, setRecommendedStudySets] = useState([])
    const [joinedClass, setJoinedClass] = useState([])
    const [topClasses, setTopClasses] = useState([])
    const [topStudySets, setTopStudySets] = useState([])
    const { getRecentStudySets, getRecommendStudySets } = useStudySet()
    const { getClassHasJoined } = useClass()
    const { getTopClasses, getTopStudySet } = useAdmin()
    const showSnackBar = useSnackbar()

    useEffect(() => {
        const firstController = new AbortController()
        const firstSignal = firstController.signal
        const secondController = new AbortController()
        const secondSignal = secondController.signal
        const thirdController = new AbortController()
        const thirdSignal = thirdController.signal
        const fourthController = new AbortController()
        const fourthSignal = fourthController.signal
        const fifthController = new AbortController()
        const fifthSignal = fifthController.signal

        const getRecent = getRecentStudySets(userId, 6, firstSignal)
        const getRecommended = getRecommendStudySets(userId, 3, secondSignal)
        const getJoinedClass = getClassHasJoined(userId, thirdSignal)
        const getTopClass = getTopClasses(fourthSignal)
        const getTopStudy = getTopStudySet(fifthSignal)

        Promise.all([getRecent, getRecommended, getJoinedClass, getTopClass, getTopStudy])
            .then((res) => {
                const recent = res[0].data.data
                const recommend = res[1].data.data
                const classes = res[2].data.data
                const topClass = res[3].data.data
                const topStudySet = res[4].data.data

                setTopClasses(topClass)
                setTopStudySets(topStudySet)
                setJoinedClass(classes)
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
        <Grid maxWidth={1660} container spacing={3} columnSpacing={4} sx={{ pt: 2, m: '0 auto', mb: 10 }}>
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
                    emptyTextAbove="Bạn chưa xem học phần nào gần đây"
                    emptyTextBelow="Các học phần bạn đã xem qua sẽ hiển thị ở đây."
                />
                <ClassList
                    title="Lớp học"
                    classes={joinedClass}
                    isLoading={isLoading}
                    loadType={Mock_Data.yourSet}
                    emptyTextAbove="Bạn chưa tham gia lớp học nào"
                    emptyTextBelow="Các lớp học bạn tham gia sẽ hiển thị ở đây."
                />
                <StudySetCards
                    title="Gợi ý cho bạn"
                    studySets={recommendStudySets}
                    isLoading={isLoading}
                    loadType={Mock_Data.yourSet}
                    emptyTextAbove="Bạn chưa có gợi ý nào"
                    emptyTextBelow="Các gợi ý dành cho bạn sẽ hiển thị ở đây."
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                {isLoading ? (
                    <Skeleton sx={{ height: 730, width: 521 }} animation="wave" variant="rounded" />
                ) : (
                    <PopularTable isLoading={isLoading} topClass={topClasses} topStudySet={topStudySets} />
                )}
            </Grid>
        </Grid>
    )
}

export default Home
