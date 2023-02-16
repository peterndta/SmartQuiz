import React, { useState } from 'react'

import { useLocation } from 'react-router-dom'

import LearnNormal from './LearnNormal'
import LearnPremium from './LearnPremium'

const LearnPage = () => {
    const [start, setStart] = useState()
    const { state } = useLocation()

    return (
        <React.Fragment>
            {!state || state.mode === 'standard' ? (
                <LearnNormal start={start} setStart={setStart} />
            ) : (
                <LearnPremium start={start} setStart={setStart} />
            )}
        </React.Fragment>
    )
}

export default LearnPage
