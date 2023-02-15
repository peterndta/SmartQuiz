import React, { useEffect, useState } from 'react'

import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'

import { DirectionsRun } from '@mui/icons-material'
import { Box, IconButton, Pagination, TextField, Tooltip } from '@mui/material'

import { AppStyles } from '~/constants/styles'

const Paging = ({ size }) => {
    const history = useHistory()
    const { search: query, pathname } = useLocation()
    const { studysetname, sorttype, pageNumber, gradeid, subjectid } = queryString.parse(query)
    const [pageNum, setPageNumber] = useState(pageNumber ? +pageNumber : 1)
    const [num, setNum] = useState(1)

    const handleChange = (e) => {
        const regex = /^[0-9\b]+$/
        if (e.target.value === '' || regex.test(e.target.value)) {
            if (e.target.value > size) {
                setNum(size)
            } else {
                setNum(e.target.value)
            }
        }
    }

    const pageSubmitHandler = () => {
        if (num === '' || num < 1) {
            setNum(1)
            setPageNumber(1)
        } else {
            setPageNumber(parseInt(num))
        }
    }

    const pagingHandler = (__, value) => {
        setPageNumber(value)
        setNum(value)
    }

    const filterHandler = () => {
        let route = pathname + '?'
        if (studysetname && studysetname.trim() !== '') route += '&studysetname=' + studysetname

        if (subjectid) route += `&subjectid=${subjectid}`

        if (gradeid) route += `&gradeid=${gradeid}`

        if (sorttype) route += `&sorttype=${sorttype}`

        if (pageNum !== 1) route += `&pageNumber=${pageNum}`

        history.push(route)
    }

    useEffect(() => {
        filterHandler()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum])

    return (
        <React.Fragment>
            <Pagination
                count={size}
                variant="outlined"
                sx={{ alignSelf: 'center' }}
                onChange={pagingHandler}
                page={pageNum}
                showFirstButton
                showLastButton
            />
            <Box
                display="flex"
                alignItems="center"
                ml={2}
                sx={{
                    backgroundColor: AppStyles.colors['#FFFFFF'],
                    border: '1px solid rgba(0, 46, 153, 0.3)',
                    borderRadius: 1,
                    height: 40,
                }}
                justifyContent="space-between"
            >
                <Box component="form" noValidate autoComplete="off" sx={{ width: 30, pl: 1 }}>
                    <TextField variant="standard" required type="text" onChange={(e) => handleChange(e)} value={num} />
                </Box>

                <Tooltip title="Đi đến" followCursor>
                    <IconButton
                        size="small"
                        sx={{
                            height: 40,
                            width: 40,
                            ml: 1,
                            borderRadius: 1,
                            color: AppStyles.colors['#FFFFFF'],
                            backgroundColor: AppStyles.colors['#004DFF'],
                            borderLeft: '1px solid rgba(0, 46, 153, 0.3)',
                            ':hover': {
                                bgcolor: AppStyles.colors['#0045e5'],
                                color: 'white',
                            },
                        }}
                        onClick={pageSubmitHandler}
                    >
                        <DirectionsRun fontSize="medium" />
                    </IconButton>
                </Tooltip>
            </Box>
        </React.Fragment>
    )
}

export default Paging
