import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'
import { Waypoint } from 'react-waypoint'

import { Box, Grid, Skeleton, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'
import EmptyStudySets from '~/components/EmptyStudySets'
import QuestionList from '~/components/QuestionList'
import SideBanner from '~/components/SideBanner'

import ListLibStudySets from './ListLibStudySets'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { useStudySet } from '~/actions/study-set'
import sets_empty from '~/assets/images/sets_empty.png'
import { AppStyles } from '~/constants/styles'
import { useAppSelector } from '~/hooks/redux-hooks'

const ButtonStyle = {
    mt: 1,
    mb: 5,
    width: '100%',
    backgroundColor: AppStyles.colors['#004DFF'],
    textTransform: 'none',
    fontSize: 16,
    ':hover': {
        bgcolor: AppStyles.colors['#0045e5'],
        color: 'white',
    },
}

const StudySets = ({ getMyStudySets }) => {
    const history = useHistory()
    const { getStudySet, deleteStudySet } = useStudySet()
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [studySet, setStudySet] = useState({})
    const [studySetDetail, setStudySetDetail] = useState({})
    const showSnackbar = useSnackbar()
    const [clickIndex, setClickIndex] = useState(0)
    const { userId } = useAppSelector((state) => state.auth)
    const [page, setPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(false)

    const loadMoreData = () => {
        let nextPage = page + 1

        getMyStudySets(userId, nextPage, {})
            .then((response) => {
                const data = response.data.data
                setPage(response.data.meta.currentPage)
                setHasNextPage(response.data.meta.hasNext)

                const cloneStudySet = studySet
                const newStudySet = [...cloneStudySet, ...data]
                setStudySet(newStudySet)
                setIsFirstRender(false)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
    }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        getMyStudySets(userId, page, signal)
            .then((response) => {
                const data = response.data.data
                setPage(response.data.meta.currentPage)
                setHasNextPage(response.data.meta.hasNext)

                setStudySet(data)

                if (data?.length != 0) {
                    getStudySet(data[0]?.id, userId, signal)
                        .then((response) => {
                            const data = response.data.data
                            setStudySetDetail(data)
                        })
                        .finally(() => {
                            setIsFirstRender(false)
                        })
                }
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

    const detailHandler = (Id) => {
        const controller = new AbortController()
        const signal = controller.signal
        getStudySet(Id, userId, signal).then((response) => {
            const data = response.data.data
            setStudySetDetail(data)
        })
    }

    const deleteStudySetHandler = (studySetId) => {
        setIsFirstRender(true)
        deleteStudySet(studySetId)
            .then(() => {
                const cloneStudySet = studySet

                const newStudySet = cloneStudySet.filter((studySet) => studySet.id !== studySetId)

                getStudySet(newStudySet[0]?.id, userId, {})
                    .then((response) => {
                        const data = response.data.data
                        setStudySetDetail(data)
                        setStudySet(newStudySet)
                    })
                    .finally(() => {
                        setIsFirstRender(false)
                    })
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
    }
    return (
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
            {studySet?.length ? (
                <React.Fragment>
                    <Grid item xs={4} md={4} lg={3.5}>
                        <Typography
                            variant="h6"
                            fontWeight={500}
                            sx={{
                                color: 'black',
                                pb: 0.125,
                                mb: 2,
                                fontFamily: 'Roboto !important',
                            }}
                        >
                            Học phần
                        </Typography>
                        {isFirstRender ? (
                            <React.Fragment>
                                <Skeleton sx={{ height: 120 }} animation="wave" variant="rounded" />
                                <Skeleton sx={{ height: 120, mt: 4 }} animation="wave" variant="rounded" />
                                <Skeleton sx={{ height: 120, mt: 4 }} animation="wave" variant="rounded" />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <ListLibStudySets
                                    studySets={studySet}
                                    setClickIndex={setClickIndex}
                                    clickIndex={clickIndex}
                                    deleteStudySetHandler={deleteStudySetHandler}
                                    detailHandler={detailHandler}
                                />
                                {hasNextPage && (
                                    <Waypoint onEnter={loadMoreData}>
                                        <Box>
                                            <Skeleton sx={{ height: 120, mt: 4 }} animation="wave" variant="rounded" />
                                            <Skeleton sx={{ height: 120, mt: 4 }} animation="wave" variant="rounded" />
                                            <Skeleton sx={{ height: 120, mt: 4 }} animation="wave" variant="rounded" />
                                        </Box>
                                    </Waypoint>
                                )}
                            </React.Fragment>
                        )}
                    </Grid>
                    <Grid item xs={8} md={8} lg={6.5}>
                        {isFirstRender ? (
                            <Skeleton sx={{ height: 425, mb: 2, mt: 6 }} animation="wave" variant="rounded" />
                        ) : (
                            <React.Fragment>
                                <Typography
                                    fontWeight={500}
                                    sx={{
                                        fontSize: 32,
                                        color: AppStyles.colors['#333333'],
                                        pb: 0.125,
                                        mb: 2,
                                        fontFamily: 'Roboto !important',
                                    }}
                                >
                                    {studySetDetail?.name}
                                </Typography>

                                <QuestionList
                                    questions={
                                        studySetDetail?.questions.length > 3
                                            ? studySetDetail?.questions.slice(0, 3)
                                            : studySetDetail?.questions
                                    }
                                />
                            </React.Fragment>
                        )}
                        {isFirstRender ? (
                            <Skeleton sx={{ height: 65, mb: 2, mt: 5 }} animation="wave" variant="rounded" />
                        ) : (
                            <ButtonCompo
                                variant="contained"
                                style={ButtonStyle}
                                onClick={() => history.push(`/study-sets/${studySetDetail?.id}`)}
                            >
                                Xem thêm
                            </ButtonCompo>
                        )}
                    </Grid>
                </React.Fragment>
            ) : (
                <Grid item xs={10} md={10} lg={10} justifyContent="center" alignItems="center">
                    <EmptyStudySets
                        image={sets_empty}
                        textAbove="Bạn chưa có học phần nào"
                        textBelow="Các học phần bạn tạo sẽ hiển thị ở đây."
                        path="/create"
                        content="Tạo học phần"
                    />
                </Grid>
            )}
            <Grid item xs={8} md={8} lg={2}>
                <SideBanner />
            </Grid>
        </Grid>
    )
}

export default StudySets
