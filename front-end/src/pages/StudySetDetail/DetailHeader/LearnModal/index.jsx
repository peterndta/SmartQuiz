import { useState } from 'react'

import { useHistory } from 'react-router-dom'

import { Box, FormControl, FormControlLabel, FormLabel, Modal, Radio, RadioGroup, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'

import { AppStyles } from '~/constants/styles'
import { useAppSelector } from '~/hooks/redux-hooks'

const LearnModal = ({ open, handleClose, id }) => {
    const [value, setValue] = useState('standard')
    const { vip } = useAppSelector((state) => state.auth)

    const handleChange = (event) => {
        setValue(event.target.value)
    }
    const history = useHistory()
    const EndButton = {
        mt: 5,
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
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 3,
                    borderRadius: 3,
                }}
            >
                <Typography sx={{ fontSize: 32, mb: 3, fontWeight: 600, color: AppStyles.colors['#333333'] }}>
                    Tùy chọn
                </Typography>

                <FormControl>
                    <FormLabel>Phương pháp học</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="standard" control={<Radio />} label="Standard" />
                        <FormControlLabel
                            value="premium"
                            disabled={!vip}
                            control={<Radio />}
                            label="Spaced-repetition"
                        />
                    </RadioGroup>
                </FormControl>
                <ButtonCompo
                    variant="contained"
                    style={EndButton}
                    onClick={() => history.push(`/study-sets/${id}/learn`, { mode: value })}
                >
                    Tiến hành học
                </ButtonCompo>
            </Box>
        </Modal>
    )
}

export default LearnModal
