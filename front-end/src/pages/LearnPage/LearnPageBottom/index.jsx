import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'

import { ArrowCircleLeft, ArrowCircleRight, Settings } from '@mui/icons-material'
import { Box, IconButton, Skeleton, Tooltip, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'

import NumberQuestionModal from './NumberQuestionModal'
import QuestionCard from './QuestionCard'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { useStudySet } from '~/actions/study-set'
import { AppStyles } from '~/constants/styles'

const ButtonStyle = {
    color: AppStyles.colors['#000F33'],
    textTransform: 'none',
    height: 56,
    minWidth: 413,
    backgroundColor: AppStyles.colors['#CCDBFF'],
    ':hover': {
        bgcolor: AppStyles.colors['#004DFF'],
        color: 'white',
    },
}
const EndButton = {
    mt: 4,
    width: '100%',
    backgroundColor: AppStyles.colors['#004DFF'],
    textTransform: 'none',
    fontSize: 16,
    fontWeight: 500,
    ':hover': {
        bgcolor: AppStyles.colors['#0045e5'],
        color: 'white',
    },
}

const LearnPageBottom = () => {
    const { id } = useParams()
    const { getStudySet } = useStudySet()
    const showSnackbar = useSnackbar()
    const [selectedChoices, setSelectedChoices] = useState([])
    const [studySetDetail, setStudySetDetail] = useState({})
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(0)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const checkAnswer = () => {}

    const handleSelectedChoices = (answer) => {
        console.log(answer)
        const cloneQuestion = JSON.parse(JSON.stringify(studySetDetail.questions))[index]
        console.log(cloneQuestion)
    }

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
        <Box maxWidth={850} sx={{ m: '0 auto', mt: 3, mb: 5 }}>
            <NumberQuestionModal
                open={open}
                handleClose={handleClose}
                numberOfQuestion={studySetDetail?.questions?.length}
            />
            <Box display="flex" justifyContent="right" mb={2}>
                <Tooltip title="Tùy chọn" placement="bottom">
                    <IconButton
                        aria-label="create"
                        size="medium"
                        sx={{ border: '1px solid #767680' }}
                        onClick={handleOpen}
                    >
                        <Settings fontSize="small" sx={{ color: AppStyles.colors['#767680'] }} />
                    </IconButton>
                </Tooltip>
            </Box>
            {isFirstRender ? (
                <React.Fragment>
                    <Skeleton sx={{ height: 425, mb: 2, mt: 6 }} animation="wave" variant="rounded" />
                </React.Fragment>
            ) : (
                // <QuestionCard index={0} question={studySetDetail?.questions[0]} />
                <SwipeableViews index={index} style={{ height: 'auto' }}>
                    {studySetDetail.questions.map((question, index) => (
                        <QuestionCard
                            question={question}
                            index={index}
                            key={index}
                            handleSelectedChoices={handleSelectedChoices}
                        />
                    ))}
                </SwipeableViews>
            )}
            <Box display="flex" alignItems="center" justifyContent="space-between" mt={3}>
                {isFirstRender ? (
                    <React.Fragment>
                        <Skeleton sx={{ height: 56, width: 413 }} animation="wave" variant="rounded" />
                    </React.Fragment>
                ) : (
                    <ButtonCompo style={ButtonStyle} onClick={() => setIndex((prev) => prev - 1)} disable={index === 0}>
                        <ArrowCircleLeft fontSize="medium" />
                        <Typography ml={1.5} sx={{ fontSize: 16, fontWeight: 500 }}>
                            Trở lại
                        </Typography>
                    </ButtonCompo>
                )}
                {isFirstRender ? (
                    <React.Fragment>
                        <Skeleton sx={{ height: 56, width: 413 }} animation="wave" variant="rounded" />
                    </React.Fragment>
                ) : (
                    <ButtonCompo style={ButtonStyle} onClick={() => setIndex((prev) => prev + 1)}>
                        <Typography mr={1.5} sx={{ fontSize: 16, fontWeight: 500 }}>
                            Tiếp tục
                        </Typography>
                        <ArrowCircleRight fontSize="medium" />
                    </ButtonCompo>
                )}
            </Box>
            {isFirstRender ? (
                <React.Fragment>
                    <Skeleton sx={{ height: 60, width: 850, mt: 4 }} animation="wave" variant="rounded" />
                </React.Fragment>
            ) : (
                <ButtonCompo variant="contained" style={EndButton} onClick={() => history.push(`/study-sets/${id}`)}>
                    Kết thúc
                </ButtonCompo>
            )}
        </Box>
    )
}

export default LearnPageBottom
