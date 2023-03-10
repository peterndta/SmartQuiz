import React, { useEffect, useRef, useState } from 'react'

import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Label from '~/components/Label'

import Loading from '../../../Loading'
import Paging from '../Pagination'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { PremiumBuyer } from '~/Mock'

const columns = [
    { id: 'Mã đơn hàng', label: 'Mã đơn hàng', minWidth: 60, align: 'left' },
    { id: 'Tên tài khoản', label: 'Tên tài khoản', minWidth: 100, align: 'left' },
    {
        id: 'Email',
        label: 'Email',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'Premium',
        label: 'Premium',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'Số tiền thanh toán',
        label: 'Số tiền thanh toán',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'Ngày thanh toán',
        label: 'Ngày thanh toán',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'Ngày hết hạn',
        label: 'Ngày hết hạn',
        minWidth: 100,
        align: 'center',
    },
]

const filterStringGenerator = ({ name, status }) => {
    let filterString = `?PageSize=${6}`

    if (name && name.trim() !== '') filterString += '&name=' + name

    if (status === undefined) filterString += `&status=${true}`
    else filterString += `&status=${status}`

    return filterString
}

export default function StickyHeadTable() {
    const { search: query } = useLocation()
    const { name, status, pageNum } = queryString.parse(query)
    const [isLoading, setIsLoading] = useState(false)
    const [rowsData, setRowsData] = useState([])

    const showSnackBar = useSnackbar()
    const rowsPerPage = 5
    const page = pageNum === undefined ? 0 : pageNum - 1
    const totalUsers = useRef(0)

    useEffect(() => {
        const params = filterStringGenerator({ name, status })
        setIsLoading(false)

        if (pageNum === undefined) {
            // usersAction
            //     .getUsers(params)
            //     .then((res) => {
            //         const { totalCount } = res.data.meta
            //         const datas = res.data.data
            //         setRowsData(datas)
            //         totalUsers.current = totalCount
            //         setTimeout(() => {
            //             setIsLoading(false)
            //         }, 500)
            //     })
            //     .catch(() => {
            //         showSnackBar({
            //             severity: 'error',
            //             children: 'Something went wrong, please try again later.',
            //         })
            //         setTimeout(() => {
            //             setIsLoading(false)
            //         }, 500)
            //     })
        } else {
            // usersAction
            //     .getUsers(params, pageNum)
            //     .then((res) => {
            //         const { totalCount } = res.data.meta
            //         const datas = res.data.data
            //         const fullData = [...rowsData, ...datas]
            //         setRowsData(fullData)
            //         totalUsers.current = totalCount
            //         setTimeout(() => {
            //             setIsLoading(false)
            //         }, 500)
            //     })
            //     .catch(() => {
            //         showSnackBar({
            //             severity: 'error',
            //             children: 'Something went wrong, please try again later.',
            //         })
            //         setTimeout(() => {
            //             setIsLoading(false)
            //         }, 500)
            //     })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, status, pageNum])

    return (
        <React.Fragment>
            {isLoading ? (
                <Loading />
            ) : (
                <Paper
                    elevation={4}
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                    }}
                >
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {PremiumBuyer.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                                    (row, index) => {
                                        return (
                                            <TableRow hover tabIndex={-1} key={index}>
                                                <TableCell align="left">{row.id}</TableCell>
                                                <TableCell align="left">{row.name}</TableCell>
                                                <TableCell align="left">{row.email}</TableCell>
                                                <TableCell align="center">{row.premium} tháng</TableCell>
                                                <TableCell align="center">
                                                    <Box>
                                                        <Typography>2.000 VND</Typography>
                                                        <Label variant="ghost" color="success">
                                                            Đã thanh toán
                                                        </Label>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">{row.paydate}</TableCell>
                                                <TableCell align="center">{row.expdate}</TableCell>
                                            </TableRow>
                                        )
                                    }
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Paging lengthRow={totalUsers.current} />
                </Paper>
            )}
        </React.Fragment>
    )
}
