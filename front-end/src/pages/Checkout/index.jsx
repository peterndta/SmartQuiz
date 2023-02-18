import React from 'react'

import { useParams } from 'react-router-dom'

const Checkout = () => {
    const { id } = useParams()
    console.log(id)
    return <div>checkout</div>
}

export default Checkout
