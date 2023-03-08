import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import { Box, Divider, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'

import { PremiumPrice } from '~/Mock'
import { AppStyles } from '~/constants/styles'

const CheckoutPageLeft = ({ mode, year, month, day }) => {
    const history = useHistory()

    const [value, setValue] = useState(mode)

    const handleChange = (event) => {
        setValue(event.target.value)
        history.replace(`${history.location.pathname}?mode=${event.target.value}`)
    }
    return (
        <Box>
            <Typography sx={{ fontSize: 20, fontWeight: 600, color: AppStyles.colors['#333333'] }}>
                Đơn hàng của bạn
            </Typography>
            <Box display="flex" justifyContent="center">
                <Divider
                    sx={{
                        width: '100%',
                        height: 2,
                        mt: 2,
                        backgroundColor: AppStyles.colors['#E6EDFF'],
                        opacity: 0.5,
                    }}
                />
            </Box>
            <Box mt={2}>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    <Box
                        sx={{
                            border: value === 'yearly' ? '2px solid #185CFF' : '2px solid #767680',
                            borderRadius: 2,
                            py: 1,
                            px: 2,
                        }}
                    >
                        <FormControlLabel value="yearly" control={<Radio />} label="Theo năm" />
                        <Typography sx={{ opacity: 0.5, mt: -1 }}>{PremiumPrice.yearly.VN_Price} VND/năm</Typography>
                    </Box>
                    <Box
                        sx={{
                            border: value === 'montly' ? '2px solid #185CFF' : '2px solid #767680',
                            borderRadius: 2,
                            py: 1,
                            px: 2,
                        }}
                        mt={1}
                    >
                        <FormControlLabel value="montly" control={<Radio />} label="Theo tháng" />
                        <Typography sx={{ opacity: 0.5, mt: -1 }}>{PremiumPrice.montly.VN_Price} VND/tháng</Typography>
                    </Box>
                </RadioGroup>
            </Box>
            <Box display="flex" justifyContent="center">
                <Divider
                    sx={{
                        width: '100%',
                        height: 2,
                        mt: 3,
                        backgroundColor: AppStyles.colors['#E6EDFF'],
                        opacity: 0.5,
                    }}
                />
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
                <Typography sx={{ fontWeight: 600, color: AppStyles.colors['#333333'] }}>
                    {value === 'yearly' ? '1 năm' : '1 tháng'} Premium
                </Typography>
                <Typography sx={{ fontWeight: 600, color: AppStyles.colors['#333333'] }}>
                    {value === 'yearly' ? '100.00 VND' : '20.000 VND'}
                </Typography>
            </Box>
            <Box mt={2}>
                <Typography sx={{ fontWeight: 600, color: AppStyles.colors['#333333'] }}>
                    Đến hạn phải trả tiếp theo
                </Typography>
                <Typography sx={{ fontSize: 14, color: AppStyles.colors['#333333'], opacity: 0.5 }}>
                    Thanh toán vào {day} tháng {value === 'montly' ? month + 1 : month},{' '}
                    {value === 'yearly' ? year + 1 : year} nếu thanh toán bây giờ
                </Typography>
            </Box>
        </Box>
    )
}

export default CheckoutPageLeft
