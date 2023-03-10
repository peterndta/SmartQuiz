import React, { useEffect, useState } from 'react'

import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'

import { TablePagination } from '@mui/material'

const Paging = ({ lengthRow }) => {
    const history = useHistory()
    const { search: query, pathname } = useLocation()
    const { name, status, pageNum } = queryString.parse(query)
    const [page, setPage] = useState(pageNum ? pageNum - 1 : 0)
    const rowsPerPage = 5

    const handleChangePage = (__, newPage) => {
        setPage(newPage)
    }

    const filterHandler = () => {
        let route = pathname + '?'
        if (name && name.trim() !== '') route += '&name=' + name

        if (status !== undefined) route += `&status=${status}`

        if (page !== 0) route += `&pageNum=${page + 1}`

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
