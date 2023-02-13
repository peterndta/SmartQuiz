import React, { useState } from 'react'

import LearnPageBottom from './LearnPageBottom'
import LearnPageHeader from './LearnPageHeader'

const LearnPage = () => {
    const [start, setStart] = useState()
    return (
        <React.Fragment>
            <LearnPageHeader />
            <LearnPageBottom start={start} setStart={setStart} />
        </React.Fragment>
    )
}

export default LearnPage
