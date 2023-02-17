import React from 'react'

import LearnPageBottom from './LearnPageBottom'
import LearnPageHeader from './LearnPageHeader'

const LearnPremium = ({ start }) => {
    return (
        <React.Fragment>
            <LearnPageHeader />
            <LearnPageBottom start={start} />
        </React.Fragment>
    )
}

export default LearnPremium
