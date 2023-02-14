import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { Grid } from '@mui/material'

import Loading from '../../Loading'
import QuestionList from './QuestionList'
import SubmitCard from './SubmitCard'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { useStudySet } from '~/actions/study-set'

const TestPageBottom = ({ questions }) => {
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

    return isFirstRender ? (
        <Loading />
    ) : (
        <Grid maxWidth={1390} container spacing={4} sx={{ m: '0 auto', mt: 2, mb: 5 }}>
            <Grid item xs={5} md={5} lg={7}>
                <QuestionList questions={questions} />
            </Grid>
            <Grid item xs={5} md={5} lg={5}>
                <SubmitCard questions={studySetDetail.questions} />
            </Grid>
        </Grid>
    )
}

export default TestPageBottom
