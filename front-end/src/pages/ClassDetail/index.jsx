import React, { useState } from 'react'

import PropTypes from 'prop-types'

import { Box, Grid, Skeleton, Tab, Tabs, Typography } from '@mui/material'

import ClassDetailHeader from './ClassDetailHeader'
import ClassDetailRight from './ClassDetailRight'
import ListMembersClass from './ListMembersClass'
import ListStudySetsVertical from './ListStudySetsVertical'
import Search from './Search'
import Sort from './Sort'

import { Mock_Data, membersClass } from '~/Mock'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box mt={2}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}
const ClassDetail = () => {
    const [value, setValue] = React.useState(0)
    const [isFirstRender, setIsFirstRender] = useState(false)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return (
        <Box sx={{ width: 1100, m: '0 auto', mt: 4, mb: 10 }}>
            <ClassDetailHeader />
            <Box mt={3} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Các học phần" {...a11yProps(0)} />
                    <Tab label="Thành viên" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <Grid container columnSpacing={5}>
                <Grid item xs={7} md={7} lg={8}>
                    <TabPanel value={value} index={0}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                            <Search searchHeight={48} searchWidth={400} inputWidth={330} inputHeight={1.5} />
                            <Sort />
                        </Box>
                        {isFirstRender ? (
                            <React.Fragment>
                                <Skeleton sx={{ height: 120 }} animation="wave" variant="rounded" />
                                <Skeleton sx={{ height: 120, mt: 4 }} animation="wave" variant="rounded" />
                                <Skeleton sx={{ height: 120, mt: 4 }} animation="wave" variant="rounded" />
                                <Skeleton sx={{ height: 120, mt: 4 }} animation="wave" variant="rounded" />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <ListStudySetsVertical studySets={Mock_Data.recent} />
                                {/* {hasNextPage && (
                                    <Waypoint onEnter={loadMoreData}>
                                        <Box>
                                            <Skeleton sx={{ height: 120, mt: 4 }} animation="wave" variant="rounded" />
                                            <Skeleton sx={{ height: 120, mt: 4 }} animation="wave" variant="rounded" />
                                            <Skeleton sx={{ height: 120, mt: 4 }} animation="wave" variant="rounded" />
                                        </Box>
                                    </Waypoint>
                                )} */}
                            </React.Fragment>
                        )}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {isFirstRender ? (
                            <React.Fragment>
                                <Skeleton sx={{ height: 93 }} animation="wave" variant="rounded" />
                                <Skeleton sx={{ height: 93, mt: 4 }} animation="wave" variant="rounded" />
                                <Skeleton sx={{ height: 93, mt: 4 }} animation="wave" variant="rounded" />
                                <Skeleton sx={{ height: 93, mt: 4 }} animation="wave" variant="rounded" />
                            </React.Fragment>
                        ) : (
                            <ListMembersClass members={membersClass} />
                        )}
                    </TabPanel>
                </Grid>
                <Grid item xs={5} md={5} lg={4}>
                    <ClassDetailRight />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ClassDetail
