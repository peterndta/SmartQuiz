import React, { useState } from 'react'

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { PAY_PAL } from '~/config'

const amount = '0.5'
const currency = 'USD'
const Paypal = () => {
    const [PaidFor, setPaidFor] = useState(false)
    const [Error, setError] = useState(null)
    console.log(PAY_PAL)
    function handleApprove() {
        // Call BE to fullfill order

        // If res is success
        setPaidFor(true)
        // Refresh user's account or subscrip status

        // if the res is error
    }

    if (PaidFor) {
        alert('Thank for purchase!')
    }

    if (Error) {
        alert(Error)
    }

    return (
        <PayPalScriptProvider
            options={{
                'disable-funding': 'card',
                'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
            }}
        >
            <PayPalButtons
                style={{
                    color: 'gold',
                    // layout: "horizontal",
                    tagline: false,
                    shape: 'rect',
                }}
                onClick={(data, actions) => {
                    const hasAlreadyBoughtCourse = false // = true nếu mua rồi và sẽ hiện alert báo đã mua rồi -> default = false

                    if (hasAlreadyBoughtCourse) {
                        setError('You bought this already')

                        return actions.reject()
                    } else {
                        return actions.resolve()
                    }
                }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: '1 Month Subscription',
                                amount: {
                                    currency_code: currency,
                                    value: amount,
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
                    console.log(order)

                    handleApprove()
                }}
                onCancel={() => {}}
                onError={(error) => {
                    setError(error)
                    console.log(Error)
                }}
            />
        </PayPalScriptProvider>
    )
}

export default Paypal
