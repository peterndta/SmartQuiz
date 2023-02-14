import React from 'react'

import { Grid } from '@mui/material'

import StudyCard from './StudyCard'

const ListLibStudySets = ({ studySets, setId, setClickIndex, clickIndex, deleteStudySetHandler }) => {
    return (
        <Grid container rowSpacing={3} columnSpacing={3} display="flex" flexDirection="column">
            {studySets.map((studySet, index) => (
                <StudyCard
                    key={studySet.id}
                    studySet={studySet}
                    index={index}
                    setId={setId}
                    studySets={studySets}
                    setClickIndex={setClickIndex}
                    clickIndex={clickIndex}
                    deleteStudySetHandler={deleteStudySetHandler}
                />
            ))}
        </Grid>
    )
}

export default ListLibStudySets
