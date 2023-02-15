import { memo, useMemo, useRef, useState } from 'react'

import Countdown, { zeroPad } from 'react-countdown'

import { Box, CardContent, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'
import CardLayout from '~/components/CardLayout'

import { AppStyles } from '~/constants/styles'

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

const SubmitCard = ({ questionLength, selectedLength, handleSubmit }) => {
    const [isPaused, setIsPaused] = useState(false)
    const countdownRef = useRef(null)

    const now = useMemo(() => Date.now(), [])

    const countDown = useRef(now + 3600000)

    const setRef = (countdown) => {
        if (countdown) {
            countdownRef.current = countdown.getApi()
        }
    }

    const handleStartClick = () => {
        setIsPaused(false)
        countdownRef.current && countdownRef.current.start()
    }

    const handlePauseClick = () => {
        setIsPaused(true)
        countdownRef.current && countdownRef.current.pause()
    }

    return (
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
                                {zeroPad(props.minutes)}:{zeroPad(props.seconds)}
                            </Typography>
                        )}
                        ref={setRef}
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
                    {isPaused ? (
                        <ButtonCompo variant="outlined" style={ButtonStyle1} onClick={handleStartClick}>
                            Tiếp tục
                        </ButtonCompo>
                    ) : (
                        <ButtonCompo variant="outlined" style={ButtonStyle1} onClick={handlePauseClick}>
                            Tạm dừng
                        </ButtonCompo>
                    )}
                    <ButtonCompo variant="contained" style={ButtonStyle2} onClick={handleSubmit}>
                        Nộp bài
                    </ButtonCompo>
                </Box>
            </CardContent>
        </CardLayout>
    )
}

export default memo(SubmitCard)
