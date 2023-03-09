import React from 'react'

import { Box, Grid, Skeleton, Typography } from '@mui/material'
import EmptyStudySets from '~/components/EmptyStudySets'
import ListClassCard from '~/components/ListClassCard'

const ClassList = ({ title, classes, isLoading, emptyTextAbove, emptyTextBelow, loadType }) => {
    return (
        <Box mt={4}>
            <Typography
                textAlign={'left'}
                variant="h6"
                fontWeight={500}
                sx={{
                    color: 'black',
                    pb: 0.125,
                    mb: 2,
                    fontFamily: 'Roboto !important',
                }}
            >
                {title}
            </Typography>
            {isLoading ? (
                <Grid container rowSpacing={2} columnSpacing={3} display="flex">
                    {loadType.map((studySet) => (
                        <Grid item md={4} key={studySet.id}>
                            <Skeleton sx={{ height: 120 }} animation="wave" variant="rounded" />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <React.Fragment>
                    {classes?.length ? (
                        <ListClassCard studySets={classes} md={4} />
                    ) : (
                        <EmptyStudySets textAbove={emptyTextAbove} textBelow={emptyTextBelow} disable={true} />
                    )}
                </React.Fragment>
            )}
        </Box>
    )
}

export default ClassList
