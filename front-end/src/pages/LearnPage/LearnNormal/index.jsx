import React from 'react'

import LearnPageBottom from './LearnPageBottom'
import LearnPageHeader from './LearnPageHeader'

const LearnNormal = ({ start, setStart }) => {
    return (
        <React.Fragment>
            <LearnPageHeader />
            <LearnPageBottom start={start} setStart={setStart} />
        </React.Fragment>
    )
}

export default LearnNormal
