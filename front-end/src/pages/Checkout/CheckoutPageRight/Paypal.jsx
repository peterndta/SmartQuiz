import { useEffect, useRef, useState } from 'react'

import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useSnackbar } from '~/HOC/SnackbarContext'
import { PremiumPrice } from '~/Mock'
import { usePayment } from '~/actions/payment'
import { PAY_PAL } from '~/config'
import { checkout } from '~/features/authSlice'
import { useAppDispatch, useAppSelector } from '~/hooks/redux-hooks'

const currency = 'USD'
const Paypal = () => {
    const { userId, vip } = useAppSelector((state) => state.auth)
    const [Error, setError] = useState(null)
    const dispatch = useAppDispatch()

    const showSnackbar = useSnackbar()
    const { createBill } = usePayment()

    const { search: query } = useLocation()
    const { mode } = queryString.parse(query)
    const amount = useRef(mode === 'monthly' ? PremiumPrice.montly.US_Price : PremiumPrice.yearly.US_Price)
    const subcription = useRef(mode === 'monthly' ? 1 : 12)
    const description = useRef(mode === 'monthly' ? 'SmartQuiz gói 1 tháng' : 'SmartQuiz gói 1 năm')

    useEffect(() => {
        if (mode === 'yearly') {
            amount.current = PremiumPrice.yearly.US_Price
            subcription.current = 12
            description.current = 'SmartQuiz gói 1 năm'
        } else {
            amount.current = PremiumPrice.montly.US_Price
            subcription.current = 1
            description.current = 'SmartQuiz gói 1 tháng'
        }
    }, [mode])
    const history = useHistory()
    function handleApprove(order) {
        const gmtTime = new Date(order.create_time)
        const gmtPlus7Time = new Date(gmtTime.getTime() + 7 * 60 * 60 * 1000).toISOString()

        const info = {
            paymentDate: gmtPlus7Time,
            userId: userId,
            subcription: subcription.current,
            payId: order.id,
        }
        createBill(info)
            .then(() => {
                dispatch(checkout(true))
                showSnackbar({
                    severity: 'success',
                    children: 'Giao dịch thành công.',
                })
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: Error,
                })
            })
            .finally(() => {
                history.push('/')
            })
    }

    return (
        <PayPalScriptProvider
            options={{
                'disable-funding': 'card',
                'client-id': PAY_PAL,
            }}
        >
            <PayPalButtons
                style={{
                    color: 'gold',
                    tagline: false,
                    shape: 'rect',
                }}
                onClick={(data, actions) => {
                    if (vip) {
                        showSnackbar({
                            severity: 'error',
                            children: 'Bạn đã có Premium rồi.',
                        })
                        return actions.reject()
                    } else {
                        return actions.resolve()
                    }
                }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: description.current,
                                amount: {
                                    currency_code: currency,
                                    value: amount.current,
                                },
                            },
                        ],
                        application_context: {
                            shipping_preference: 'NO_SHIPPING',
                        },
                    })
                }}
                onApprove={async (data, actions) => {
                    const order = await actions.order.capture()
                    handleApprove(order)
                }}
                onCancel={() => {}}
                onError={(error) => {
                    setError(error)
                }}
            />
        </PayPalScriptProvider>
    )
}

export default Paypal
