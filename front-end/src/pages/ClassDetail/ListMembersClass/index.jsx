import { Grid } from '@mui/material'

import MemberCard from './MemberCard'

const ListMembersClass = ({ members, kickHandler }) => {
    return (
        <Grid container rowSpacing={3} display="flex" flexDirection="column">
            {members.map((member) => (
                <MemberCard key={member.id} member={member} kickHandler={kickHandler} />
            ))}
        </Grid>
    )
}

export default ListMembersClass
