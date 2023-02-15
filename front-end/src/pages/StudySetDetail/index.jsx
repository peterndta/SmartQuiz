import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { Box } from '@mui/material'
import QuestionList from '~/components/QuestionList'

import Loading from '../Loading'
import DetailHeader from './DetailHeader'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { useStudySet } from '~/actions/study-set'

const StudySetDetail = () => {
    const { id } = useParams()
    const { getStudySet } = useStudySet()
    const showSnackbar = useSnackbar()
    const [studySetDetail, setStudySetDetail] = useState({})
    const [isFirstRender, setIsFirstRender] = useState(true)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        getStudySet(id, signal)
            .then((response) => {
                const data = response.data.data

                setStudySetDetail(data)
                setIsFirstRender(false)
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
    return (
        <Box maxWidth={850} sx={{ m: '0 auto', mt: 5, mb: 9 }}>
            {isFirstRender ? (
                <Loading />
            ) : (
                <React.Fragment>
                    <DetailHeader
                        info={studySetDetail}
                        id={id}
                        questions={studySetDetail.questions}
                        userId={studySetDetail.userId}
                    />
                    <Box mt={3}>
                        <QuestionList questions={studySetDetail?.questions} />
                    </Box>
                </React.Fragment>
            )}
        </Box>
    )
}

export default StudySetDetail
