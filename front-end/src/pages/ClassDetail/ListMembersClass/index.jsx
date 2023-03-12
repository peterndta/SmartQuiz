import { Grid } from '@mui/material'

import MemberCard from './MemberCard'

const ListMembersClass = ({ members, kickHandler, userId }) => {
    return (
        <Grid container rowSpacing={3} display="flex" flexDirection="column">
            {members.map((member, _, memberList) => (
                <MemberCard
                    key={member.id}
                    member={member}
                    kickHandler={kickHandler}
                    userId={userId}
                    canDelete={userId === memberList[0].id}
                />
            ))}
        </Grid>
    )
}

export default ListMembersClass
