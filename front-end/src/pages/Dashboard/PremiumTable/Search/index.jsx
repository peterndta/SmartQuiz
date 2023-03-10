import { useState } from 'react'

import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'

import { Search } from '@mui/icons-material'
import { Box, IconButton, InputBase } from '@mui/material'

import { AppStyles } from '~/constants/styles'

const SearchBox = () => {
    const { search: query, pathname } = useLocation()
    const history = useHistory()
    const { name, status, pageNum } = queryString.parse(query)
    const [searchValue, setSearchValue] = useState(name ? name : '')

    const searchChangeHandler = (event) => {
        const searchText = event.target.value
        setSearchValue(searchText)
    }

    const submitSearchHandler = (event) => {
        if (event.key === 'Enter') {
            let route = pathname + '?'
            if (searchValue) route += '&name=' + searchValue

            if (status !== undefined) route += `&status=${status}`

            if (pageNum) route += `&pageNum=${pageNum}`

            history.push(route)
        }
    }

    return (
        <Box
            sx={{
                p: 0.5,
                display: 'flex',
                alignItems: 'center',
                width: 400,
                border: '1px solid #DCE6FF',
                borderRadius: 0.5,
                backgroundColor: AppStyles.colors['#E6EDFF'],
                boxShadow: '0px 1px 2px rgba(0, 46, 153, 0.3), 0px 1px 3px 1px rgba(0, 46, 153, 0.15)',
            }}
        >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <Search />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Tên tài khoản..."
                inputProps={{ 'aria-label': 'search recipe name' }}
                value={searchValue}
                onChange={searchChangeHandler}
                onKeyDown={submitSearchHandler}
            />
        </Box>
    )
}

export default SearchBox
