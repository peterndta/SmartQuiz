import { memo } from 'react'

import FullWidthHeaderWhite from '~/components/FullWidthHeaderWhite'
import PageTitle from '~/components/PageTitle'

import logo from '../../../assets/images/Logo.png'

const TestPageHeader = () => {
    const HeaderStyle = {
        mb: 4,
    }
    return (
        <FullWidthHeaderWhite maxWidthContent={1112} style={HeaderStyle}>
            <PageTitle logo={logo} text="TEST" />
        </FullWidthHeaderWhite>
    )
}

export default memo(TestPageHeader)
