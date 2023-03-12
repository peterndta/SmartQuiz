import React, { useEffect, useState } from 'react'

import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'

import { TablePagination } from '@mui/material'

const Paging = ({ lengthRow }) => {
    const history = useHistory()
    const { search: query, pathname } = useLocation()
    const { sortOption, pageNumber } = queryString.parse(query)
    const [page, setPage] = useState(pageNumber ? pageNumber - 1 : 0)
    // const [page, setPage] = useState(pageNumber ? +pageNumber : 1)
    const rowsPerPage = 10

    const handleChangePage = (__, newPage) => {
        setPage(newPage)
    }

    const filterHandler = () => {
        let route = pathname + '?'

        if (page !== 0) route += `&pageNumber=${page + 1}`

        if (sortOption) route += `&sortOption=${sortOption}`

        history.push(route)
    }

    useEffect(() => {
        filterHandler()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    return (
        <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={lengthRow}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
        />
    )
}

export default Paging
