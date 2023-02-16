import React from 'react'

import { Grid } from '@mui/material'

import StudyCard from './StudyCard'

const ListLibStudySets = ({ studySets, setClickIndex, clickIndex, deleteStudySetHandler, detailHandler }) => {
    return (
        <Grid container rowSpacing={3} columnSpacing={3} display="flex" flexDirection="column">
            {studySets.map((studySet, index) => (
                <StudyCard
                    key={studySet.id}
                    studySet={studySet}
                    index={index}
                    studySets={studySets}
                    setClickIndex={setClickIndex}
                    clickIndex={clickIndex}
                    deleteStudySetHandler={deleteStudySetHandler}
                    detailHandler={detailHandler}
                />
            ))}
        </Grid>
    )
}

export default ListLibStudySets
