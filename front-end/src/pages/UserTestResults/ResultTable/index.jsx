import * as React from 'react'

import PropTypes from 'prop-types'

import { Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { visuallyHidden } from '@mui/utils'
import EmptyStudySets from '~/components/EmptyStudySets'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { useUser } from '~/actions/user'
import { useAppSelector } from '~/hooks/redux-hooks'

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) {
            return order
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

const headCells = [
    {
        id: 'studySetName',
        numeric: false,
        disablePadding: true,
        label: 'Tên học phần',
    },
    {
        id: 'studySetId',
        numeric: true,
        disablePadding: false,
        label: 'ID học phần',
    },
    // {
    //     id: 'startTime',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'Thời gian bắt đầu',
    // },
    {
        id: 'endTime',
        numeric: true,
        disablePadding: false,
        // label: 'Thời gian kết thúc',
        label: 'Ngày thực hiện',
    },
    {
        id: 'totalQuestion',
        numeric: true,
        disablePadding: false,
        label: 'Tổng số câu hỏi',
    },
    {
        id: 'totalCorrect',
        numeric: true,
        disablePadding: false,
        label: 'Số câu đúng',
    },
    {
        id: 'totalIncorrect',
        numeric: true,
        disablePadding: false,
        label: 'Số câu sai',
    },
]

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="normal"></TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
}

function EnhancedTableToolbar(props) {
    const { numSelected } = props

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                Kết quả các học phần
            </Typography>
        </Toolbar>
    )
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
}

export default function ResultTable() {
    const { userId } = useAppSelector((state) => state.auth)
    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('calories')
    const [selected, setSelected] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [dense, setDense] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [rows, setRows] = React.useState([])
    const [isFirstRender, setIsFirstRender] = React.useState(true)
    const usersAction = useUser()
    const showSnackbar = useSnackbar()

    React.useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        usersAction
            .getUserTestResult(userId, signal)
            .then((response) => {
                const data = response.data.data
                setRows(data)
                setIsFirstRender(false)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
                setIsFirstRender(false)
            })
        return () => {
            controller.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name)
            setSelected(newSelected)
            return
        }
        setSelected([])
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleChangeDense = (event) => {
        setDense(event.target.checked)
    }

    const isSelected = (name) => selected.indexOf(name) !== -1

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

    return (
        <React.Fragment>
            {isFirstRender ? (
                <Skeleton sx={{ height: 600 }} animation="wave" variant="rounded" />
            ) : rows.length > 0 ? (
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                />
                                <TableBody>
                                    {stableSort(rows, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row.name)
                                            const labelId = `enhanced-table-checkbox-${index}`
                                            return (
                                                <TableRow
                                                    hover
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={index}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="normal"></TableCell>
                                                    <TableCell component="th" id={labelId} scope="row" padding="none">
                                                        {row.studySetName}
                                                    </TableCell>
                                                    <TableCell align="right">{row.studySetId}</TableCell>
                                                    {/* <TableCell align="right">{row.startTime}</TableCell> */}
                                                    <TableCell align="right">
                                                        {new Date(row.endTime).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                        })}
                                                    </TableCell>
                                                    <TableCell align="right">{row.totalQuestion}</TableCell>
                                                    <TableCell align="right">{row.totalCorrect}</TableCell>
                                                    <TableCell align="right">{row.totalIncorrect}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (dense ? 33 : 53) * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                    <FormControlLabel
                        control={<Switch checked={dense} onChange={handleChangeDense} />}
                        label="Thu nhỏ"
                    />
                </Box>
            ) : (
                <Box>
                    <EmptyStudySets
                        textAbove="Bạn chưa làm bài kiểm tra nào"
                        textBelow="Kết quả các bài kiểm tra sẽ hiển thị ở đây."
                        path="/study-sets"
                        content="Tiến hành học"
                        imgStyle={{ width: 500, height: 300, mb: 2 }}
                    />
                </Box>
            )}
        </React.Fragment>
    )
}
