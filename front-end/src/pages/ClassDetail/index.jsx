import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import queryString from 'query-string'
import { useLocation, useParams } from 'react-router-dom'
import { Waypoint } from 'react-waypoint'

import { Box, Grid, Skeleton, Tab, Tabs } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'

import Loading from '../Loading'
import ClassDetailHeader from './ClassDetailHeader'
import ClassDetailRight from './ClassDetailRight'
import ListMembersClass from './ListMembersClass'
import ListStudySetsVertical from './ListStudySetsVertical'
import Search from './Search'
import Sort from './Sort'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { useClass } from '~/actions/class'
import { AppStyles } from '~/constants/styles'
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

const filterStringGenerator = ({ studysetname, sorttype, pageNumber }) => {
    let filterString = '?'
    if (studysetname && studysetname.trim() !== '') filterString += '&name=' + studysetname

    if (pageNumber !== undefined) filterString += `&pageNumber=${pageNumber}`

    filterString += `&pageSize=${4}`

    if (sorttype !== undefined) filterString += `&sorttype=${sorttype}`

    return filterString
}
const ButtonStyle = {
    mt: 2,
    color: AppStyles.colors['#FFFFFF'],
    textTransform: 'none',
    height: 40,
    backgroundColor: AppStyles.colors['#3CCFCF'],
    border: '1px solid #3CCFCF',
    borderRadius: 1,
    ':hover': {
        bgcolor: AppStyles.colors['#28A7A7'],
        border: '1px solid #28A7A7',
        color: 'white',
    },
}

const ClassDetail = () => {
    const { id } = useParams()
    const { search: query } = useLocation()
    const { getClassDetail, getStudySetOfClass, getMemberOfClass, joinClass, leaveClass } = useClass()
    const { userId } = useAppSelector((state) => state.auth)
    const { studysetname = '', sorttype = 'Newest' } = queryString.parse(query)
    const [value, setValue] = useState(0)
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [isSkeleton, setIsSkeleton] = useState(false)
    const [classes, setClasses] = useState({})
    const [page, setPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [studySet, setStudySet] = useState([])
    const [member, setMember] = useState([])
    const [hasJoined, setHasJoined] = useState(false)
    const showSnackbar = useSnackbar()

    const handleChange = (_, newValue) => {
        setValue(newValue)
        if (newValue === 1) setPage(1)
    }

    const joinHandler = () => {
        joinClass(id, userId).then(() => {
            setHasJoined(true)
            showSnackbar({
                severity: 'success',
                children: 'Tham gia lớp học thành công.',
            })
        })
    }

    const leaveHandler = () => {
        leaveClass(id, userId).then(() => {
            setHasJoined(false)
            showSnackbar({
                severity: 'success',
                children: 'Rời lớp học thành công.',
            })
        })
    }

    const loadMoreHandler = () => {
        let pageNumber = page + 1
        const params = filterStringGenerator({ studysetname, sorttype, pageNumber })
        getStudySetOfClass(id, params).then((response) => {
            const data = response.data.data
            setPage(response.data.meta.currentPage)
            setHasNextPage(response.data.meta.hasNext)
            const cloneStudySet = studySet
            const newStudySet = [...cloneStudySet, ...data]
            setStudySet(newStudySet)
            setIsFirstRender(false)
        })
    }

    useEffect(() => {
        setIsSkeleton(true)
        const controller = new AbortController()
        const signal = controller.signal

        getMemberOfClass(id, signal)
            .then((res) => {
                const data = res.data.data
                setMember(data)
            })
            .finally(() => {
                setIsSkeleton(false)
            })

        return () => {
            controller.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            setIsSkeleton(true)
            const params = filterStringGenerator({ studysetname, sorttype, page })
            getStudySetOfClass(id, params)
                .then((response) => {
                    const data = response.data.data
                    setHasNextPage(response.data.meta.hasNext)
                    setStudySet(data)
                })
                .catch(() => {
                    showSnackbar({
                        severity: 'error',
                        children: 'Something went wrong, please try again later.',
                    })
                })
                .finally(() => {
                    setIsSkeleton(false)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studysetname, sorttype])

    return isFirstRender ? (
        <Loading />
    ) : (
        <Box sx={{ width: 1100, m: '0 auto', mt: 4, mb: 10 }}>
            <ClassDetailHeader className={classes.name} leaveHandler={leaveHandler} />
            {userId !== classes.userId && !classes.isAlreadyJoin && !hasJoined ? (
                <ButtonCompo style={{ ...ButtonStyle }} variant="outlined" onClick={joinHandler}>
                    Tham gia lớp học
                </ButtonCompo>
            ) : null}
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
                        {isFirstRender || isSkeleton ? (
                            <React.Fragment>
                                <Skeleton sx={{ height: 120 }} animation="wave" variant="rounded" />
                                <Skeleton sx={{ height: 120, mt: 4 }} animation="wave" variant="rounded" />
                                <Skeleton sx={{ height: 120, mt: 4 }} animation="wave" variant="rounded" />
                                <Skeleton sx={{ height: 120, mt: 4 }} animation="wave" variant="rounded" />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <ListStudySetsVertical studySets={studySet} />
                                {hasNextPage && (
                                    <Waypoint onEnter={loadMoreHandler}>
                                        <Box>
                                            <Skeleton sx={{ height: 120, mt: 4 }} animation="wave" variant="rounded" />
                                            <Skeleton sx={{ height: 120, mt: 4 }} animation="wave" variant="rounded" />
                                            <Skeleton sx={{ height: 120, mt: 4 }} animation="wave" variant="rounded" />
                                        </Box>
                                    </Waypoint>
                                )}
                            </React.Fragment>
                        )}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {isFirstRender || isSkeleton ? (
                            <React.Fragment>
                                <Skeleton sx={{ height: 93 }} animation="wave" variant="rounded" />
                                <Skeleton sx={{ height: 93, mt: 4 }} animation="wave" variant="rounded" />
                                <Skeleton sx={{ height: 93, mt: 4 }} animation="wave" variant="rounded" />
                                <Skeleton sx={{ height: 93, mt: 4 }} animation="wave" variant="rounded" />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <ListMembersClass members={member} />
                            </React.Fragment>
                        )}
                    </TabPanel>
                </Grid>
                <Grid item xs={5} md={5} lg={4}>
                    <ClassDetailRight
                        description={classes.description}
                        totalMem={classes.totalMember}
                        totalStudySet={classes.totalStudySet}
                        joinedCode={classes.joinCode}
                        showSnackbar={showSnackbar}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ClassDetail
