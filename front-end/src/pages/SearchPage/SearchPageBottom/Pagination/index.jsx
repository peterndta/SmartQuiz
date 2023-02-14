import React, { useEffect, useState } from 'react'

import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'

import { Pagination } from '@mui/material'

const Paging = ({ size }) => {
    const history = useHistory()
    const { search: query, pathname } = useLocation()
    const { studysetname, sorttype, pageNumber, gradeid, subjectid } = queryString.parse(query)
    const [pageNum, setPageNumber] = useState(pageNumber ? +pageNumber : 1)

    const pagingHandler = (__, value) => setPageNumber(value)

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
        <Pagination
            count={size}
            variant="outlined"
            sx={{ alignSelf: 'center', mt: 6 }}
            onChange={pagingHandler}
            page={pageNum}
        />
    )
}

export default Paging
