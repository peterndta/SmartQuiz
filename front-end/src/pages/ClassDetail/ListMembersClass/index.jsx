import { Grid } from '@mui/material'

import MemberCard from './MemberCard'

const ListMembersClass = ({ members, kickHandler, userId }) => {
    return (
        <Grid container rowSpacing={3} display="flex" flexDirection="column">
            {members.map((member) => (
                <MemberCard key={member.id} member={member} kickHandler={kickHandler} userId={userId} />
            ))}
        </Grid>
    )
}

export default ListMembersClass
