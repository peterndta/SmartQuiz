import { useEffect, useState } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import { Box, Grid } from '@mui/material'
import QuestionList from '~/components/QuestionList'
import SideBanner from '~/components/SideBanner'

import Loading from '../Loading'
import DetailHeader from './DetailHeader'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { useBookmark } from '~/actions/bookmark'
import { useRating } from '~/actions/rating'
import { useStudySet } from '~/actions/study-set'
import { useAppSelector } from '~/hooks/redux-hooks'

const StudySetDetail = () => {
    const { id } = useParams()
    const history = useHistory()
    const { getStudySet, deleteStudySet } = useStudySet()
    const { ratePoint } = useRating()
    const { bookmark, unBookmark } = useBookmark()
    const showSnackbar = useSnackbar()
    const [studySetDetail, setStudySetDetail] = useState({})
    const [isFirstRender, setIsFirstRender] = useState(true)
    const { userId } = useAppSelector((state) => state.auth)
    const [ratingPoint, setRatingPoint] = useState(0)
    const [isRating, setIsRating] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        const userIdd = userId ? userId : null

        getStudySet(id, userIdd, signal)
            .then((response) => {
                const data = response.data.data
                setStudySetDetail(data)
                setIsFirstRender(false)
                setRatingPoint(data.rating)
                setIsBookmarked(data.isBookmarked)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
                setIsFirstRender(false)
            })
        return () => {
            controller.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteStudySetHandler = () => {
        deleteStudySet(id).then(() => {
            showSnackbar({
                severity: 'success',
                children: 'Xóa học phần thành công.',
            })
            history.push('/my-library')
        })
    }

    const bookmarkHandler = () => {
        bookmark({ userId, studySetId: id })
            .then(() => {
                setIsBookmarked(true)
                showSnackbar({
                    severity: 'success',
                    children: 'Lưu học phần thành công.',
                })
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, try again later.',
                })
            })
    }

    const unBookmarkHandler = () => {
        unBookmark({ userId, studySetId: id })
            .then(() => {
                setIsBookmarked(false)
                showSnackbar({
                    severity: 'success',
                    children: 'Bỏ lưu học phần thành công.',
                })
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, try again later.',
                })
            })
    }

    const ratingHandler = (rate) => {
        const info = { userId, studySetId: id, rating: rate }
        ratePoint(info)
            .then(() => {
                showSnackbar({
                    severity: 'success',
                    children: 'Đánh giá phần thành công.',
                })
                setIsRating(true)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
    }

    return (
        <Grid container columnSpacing={6} maxWidth={1080} sx={{ m: '0 auto', mt: 5, mb: 9 }}>
            {isFirstRender ? (
                <Loading />
            ) : (
                <Grid item xs={10} md={10} lg={10}>
                    <DetailHeader
                        info={studySetDetail}
                        id={id}
                        questions={studySetDetail.questions}
                        userId={studySetDetail.userId}
                        deleteStudySetHandler={deleteStudySetHandler}
                        isAlreadyRating={studySetDetail.isAlreadyRating}
                        isRating={isRating}
                        ratingHandler={ratingHandler}
                        totalRatings={studySetDetail.totalRatings}
                        rating={ratingPoint}
                        isBookmarked={isBookmarked}
                        bookmarkHandler={bookmarkHandler}
                        unBookmarkHandler={unBookmarkHandler}
                    />
                    <Box mt={3}>
                        <QuestionList questions={studySetDetail?.questions} />
                    </Box>
                </Grid>
            )}
            <Grid item xs={2} md={2} lg={2}>
                <SideBanner style={{ position: 'fixed', width: 305, height: 610 }} />
            </Grid>
        </Grid>
    )
}

export default StudySetDetail
