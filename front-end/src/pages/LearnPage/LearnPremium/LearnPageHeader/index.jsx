import FullWidthHeaderWhite from '~/components/FullWidthHeaderWhite'
import PageTitle from '~/components/PageTitle'

import logo from '../../../assets/images/Logo.png'

const LearnPageHeader = () => {
    const HeaderStyle = {
        mb: 4,
    }
    return (
        <FullWidthHeaderWhite maxWidthContent={850} style={HeaderStyle}>
            <PageTitle logo={logo} text="LEARN+" />
        </FullWidthHeaderWhite>
    )
}

export default LearnPageHeader
