import { useState } from 'react'

import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'

import SearchIcon from '@mui/icons-material/Search'
import { InputBase } from '@mui/material'
import { styled } from '@mui/material/styles'

import { AppStyles } from '~/constants/styles'

let searchHeightValue, searchWidthValue, inputWidthValue, inputHeightValue

const SearchCompo = styled('div')(({ theme }) => ({
    display: 'flex',
    position: 'relative',
    borderRadius: '12px',
    backgroundColor: AppStyles.colors['#E6EDFF'],
    '&:hover': {
        backgroundColor: AppStyles.colors['#E6EDFF'],
    },
    marginRight: 12,
    height: searchHeightValue,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: searchWidthValue,
    },
    border: '1px solid #DCE6FF',
    boxShadow: '0px 1px 2px rgba(0, 46, 153, 0.3), 0px 1px 3px 1px rgba(0, 46, 153, 0.15)',
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(1, 0),
    height: '100%',
    position: 'relative',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: AppStyles.colors['rgba(51, 51, 51, 0.5)'],
    '& .MuiInputBase-input': {
        padding: theme.spacing(inputHeightValue, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(0.5)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: inputWidthValue,
        },
    },
}))

const Search = ({ searchHeight, searchWidth, inputWidth, inputHeight, setPage }) => {
    searchHeightValue = searchHeight
    searchWidthValue = searchWidth

    inputWidthValue = inputWidth
    inputHeight ? (inputHeightValue = inputHeight) : (inputHeightValue = 1)

    const { search: query, pathname } = useLocation()
    const history = useHistory()
    const { studysetname, sorttype } = queryString.parse(query)
    const [searchValue, setSearchValue] = useState(studysetname ? studysetname : '')

    const searchChangeHandler = (event) => {
        const searchText = event.target.value
        setSearchValue(searchText)
        setPage(1)
    }

    const searchSubmitHandler = (event) => {
        if (event.key === 'Enter') {
            let route = pathname + '?'
            if (searchValue && searchValue.trim() !== '') route += '&studysetname=' + searchValue

            if (sorttype) route += `&sorttype=${sorttype}`

            history.push(route)
        }
    }

    return (
        <SearchCompo>
            <StyledInputBase
                placeholder="Tìm kiếm"
                inputProps={{ 'aria-label': 'search' }}
                onChange={searchChangeHandler}
                onKeyDown={searchSubmitHandler}
                value={searchValue}
            />
            <SearchIconWrapper>
                <SearchIcon sx={{ color: AppStyles.colors['#185CFF'] }} />
            </SearchIconWrapper>
        </SearchCompo>
    )
}

export default Search
