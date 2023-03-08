import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import queryString from 'query-string'
import { useLocation, useParams } from 'react-router-dom'

import { Box, Grid, Skeleton, Tab, Tabs } from '@mui/material'

import Loading from '../Loading'
import ClassDetailHeader from './ClassDetailHeader'
import ClassDetailRight from './ClassDetailRight'
import ListMembersClass from './ListMembersClass'
import ListStudySetsVertical from './ListStudySetsVertical'
import Search from './Search'
import Sort from './Sort'

import { Mock_Data, membersClass } from '~/Mock'
import { useClass } from '~/actions/class'
import { useAppSelector } from '~/hooks/redux-hooks'

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
            {value === index && <Box mt={2}>{children}</Box>}
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

const filterStringGenerator = ({ studysetname, sorttype, page }) => {
    let filterString = '?'
    if (studysetname && studysetname.trim() !== '') filterString += '&StudySetName=' + studysetname

    if (page !== undefined) filterString += `&pageNumber=${page}`

    filterString += `&pageSize=${4}`

    if (sorttype !== undefined) filterString += `&sorttype=${sorttype}`

    return filterString
}

const ClassDetail = () => {
    const { id } = useParams()
    const { search: query } = useLocation()
    const { getClassDetail, getStudySetOfClass } = useClass()
    const { userId } = useAppSelector((state) => state.auth)
    const { studysetname = '', sorttype = 'Newest' } = queryString.parse(query)
    const [value, setValue] = useState(0)
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [classes, setClasses] = useState({})
    const [page, setPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(false)

    const handleChange = (_, newValue) => {
        setValue(newValue)
        if (newValue === 1) setPage(1)
    }

    const loadMoreHandler = () => {}

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        getClassDetail(id, userId, signal)
            .then((res) => {
                const classObj = res.data.data
                setClasses(classObj)
            })
            .finally(() => {
                setIsFirstRender(false)
            })

        return () => {
            controller.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (page === 1) {
            const params = filterStringGenerator({ studysetname, sorttype, page })
            getStudySetOfClass(id, params).then(() => {})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    return isFirstRender ? (
        <Loading />
    ) : (
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
                            <Search
                                searchHeight={48}
                                searchWidth={400}
                                inputWidth={330}
                                inputHeight={1.5}
                                setPage={setPage}
                            />
                            <Sort setPage={setPage} />
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
                    <ClassDetailRight
                        description={classes.description}
                        totalMem={classes.totalMember}
                        totalStudySet={classes.totalStudySet}
                        joinedCode={classes.joinCode}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ClassDetail
