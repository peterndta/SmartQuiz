import React from 'react'

import LearnPageBottom from './LearnPageBottom'
import LearnPageHeader from './LearnPageHeader'

const LearnNormal = ({ start }) => {
    return (
        <React.Fragment>
            <LearnPageHeader />
            <LearnPageBottom start={start} />
        </React.Fragment>
    )
}

export default LearnNormal
