import React from 'react'

import { Grid } from '@mui/material'

import MemberCard from './MemberCard'

const ListMembersClass = ({ members }) => {
    return (
        <Grid container rowSpacing={3} codisplay="flex" flexDirection="column">
            {members.map((member) => (
                <MemberCard key={member.id} member={member} />
            ))}
        </Grid>
    )
}

export default ListMembersClass
