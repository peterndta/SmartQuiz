import React, { memo, useEffect, useRef, useState } from 'react'

import Countdown, { zeroPad } from 'react-countdown'
import { useHistory, useParams } from 'react-router-dom'

import { Box, CardContent, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'
import CardLayout from '~/components/CardLayout'
import ProgressTesting from '~/components/ProgressTesting'

import { AppStyles } from '~/constants/styles'
import { formatTime } from '~/utils/Math'

const CardLayoutStyle = {
    borderRadius: 3,
    p: 1,
    backgroundColor: AppStyles.colors['#004DFF'],
    height: 266,
}
const ButtonStyle1 = {
    color: 'white',
    borderColor: 'white',
    ':hover': {
        bgcolor: '#d6d9e5',
    },
    height: 64,
    minWidth: 235,
    '&:disabled': {
        color: AppStyles.colors['#FFFFFF'],
        borderColor: 'white',
    },
}
const ButtonStyle2 = {
    color: AppStyles.colors['#004DFF'],
    backgroundColor: AppStyles.colors['#EEF2FF'],
    ':hover': {
        bgcolor: '#d6d9e5',
    },
    height: 64,
    minWidth: 235,
}

const minuteGenerator = (time) => Date.now() + time * 60 * 1000

const SubmitCard = ({ questionLength, selectedLength, handleSubmit, time, correctAns, isSubmit }) => {
    const [isPaused, setIsPaused] = useState(false)
    const countdownRef = useRef(null)
    const [timePassed, setTimePassed] = useState({ hours: 0, minutes: 0, seconds: 0 })
    const [open, setOpen] = useState(false)
    const history = useHistory()
    const { id } = useParams()

    const countDown = useRef(minuteGenerator(time))

    const setRef = (countdown) => {
        if (countdown) {
            countdownRef.current = countdown.getApi()
        }
    }
    const handleClose = () => setOpen(false)

    const handleStartClick = () => {
        setIsPaused(false)
        countdownRef.current && countdownRef.current.start()
    }

    const handlePauseClick = () => {
        setIsPaused(true)
        countdownRef.current && countdownRef.current.pause()
    }

    const handleAutoComplete = () => {
        handleSubmit()
        setOpen(true)
    }

    const submitHandler = () => {
        countdownRef.current && countdownRef.current.pause()
        handleSubmit()
        setOpen(true)
    }

    const leftTime = Math.floor((minuteGenerator(time) - countDown.current) / 1000)

    const percentage = (correctAns * 100) / 10

    useEffect(() => {
        if (isSubmit) {
            setTimePassed(formatTime(leftTime))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmit])

    return (
        <React.Fragment>
            <Box display="flex" justifyContent="flex-end" mb={3}>
                <ButtonCompo
                    onClick={() => history.push(`/study-sets/${id}`)}
                    style={{ backgroundColor: AppStyles.colors['#004DFF'] }}
                >
                    Trở về học phần
                </ButtonCompo>
            </Box>
            <CardLayout style={CardLayoutStyle}>
                <CardContent>
                    <Box display="flex" alignItems="center">
                        <Typography sx={{ color: 'white', fontSize: 20 }}>Thời gian</Typography>
                        <Countdown
                            date={countDown.current}
                            intervalDelay={0}
                            precision={3}
                            renderer={(props) => (
                                <Typography sx={{ ml: 2, color: AppStyles.colors['#FFAF00'], fontSize: 36 }}>
                                    {zeroPad(props.hours)}:{zeroPad(props.minutes)}:{zeroPad(props.seconds)}
                                </Typography>
                            )}
                            ref={setRef}
                            onComplete={handleAutoComplete}
                        />
                    </Box>
                    <Box display="flex" alignItems="center" mt={1}>
                        <Typography sx={{ color: 'white', fontSize: 20 }}>Đã trả lời</Typography>
                        <Box display="flex" alignItems="center">
                            <Typography sx={{ ml: 2, color: AppStyles.colors['#FFAF00'], fontSize: 36 }}>
                                {selectedLength}
                            </Typography>
                            <Typography sx={{ color: 'white', fontSize: 36 }}>/{questionLength}</Typography>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={3.5}>
                        {isPaused
                            ? countDown !== 0 && (
                                  <ButtonCompo variant="outlined" style={ButtonStyle1} onClick={handleStartClick}>
                                      Tiếp tục
                                  </ButtonCompo>
                              )
                            : countDown !== 0 && (
                                  <ButtonCompo
                                      variant="outlined"
                                      style={ButtonStyle1}
                                      onClick={handlePauseClick}
                                      disable={isSubmit}
                                  >
                                      Tạm dừng
                                  </ButtonCompo>
                              )}
                        {!isSubmit ? (
                            <ButtonCompo
                                variant="contained"
                                style={ButtonStyle2}
                                onClick={submitHandler}
                                fullWidth={countDown === 0}
                            >
                                Nộp bài
                            </ButtonCompo>
                        ) : (
                            <ButtonCompo
                                variant="contained"
                                style={ButtonStyle2}
                                onClick={() => setOpen(true)}
                                fullWidth={countDown === 0}
                            >
                                Xem kết quả
                            </ButtonCompo>
                        )}
                    </Box>
                </CardContent>
            </CardLayout>
            {open && (
                <ProgressTesting
                    open={open}
                    handleClose={handleClose}
                    rightQuestion={correctAns}
                    maxQuestion={questionLength}
                    percentage={percentage}
                    timeLeft={timePassed}
                />
            )}
        </React.Fragment>
    )
}

export default memo(SubmitCard)
