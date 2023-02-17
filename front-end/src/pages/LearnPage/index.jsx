import React, { useEffect, useState } from 'react'

import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

import LearnNormal from './LearnNormal'
import LearnPremium from './LearnPremium'

const LearnPage = () => {
    const { search: query } = useLocation()
    const { started } = queryString.parse(query)
    const [start, setStart] = useState(1)
    const { state } = useLocation()

    useEffect(() => {
        if (started) {
            if (Number.isInteger(+started)) {
                if (started <= 0) {
                    setStart(1)
                } else {
                    setStart(+started)
                }
            }
        }
    }, [started])

    return (
        <React.Fragment>
            {!state || state.mode === 'standard' ? <LearnNormal start={start} /> : <LearnPremium start={start} />}
        </React.Fragment>
    )
}

export default LearnPage
