import React from 'react'

import { Grid } from '@mui/material'

import StudyCard from './StudyCard'

const ListStudySetsVertical = ({ studySets }) => {
    return (
        <Grid container rowSpacing={3} codisplay="flex" flexDirection="column">
            {studySets.map((studySet, index) => (
                <StudyCard key={studySet.id} studySet={studySet} index={index} />
            ))}
        </Grid>
    )
}

export default ListStudySetsVertical
