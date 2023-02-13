import { useState } from 'react'

import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'

// import { useHistory } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import { InputBase } from '@mui/material'
import { styled } from '@mui/material/styles'

import { AppStyles } from '~/constants/styles'

let searchHeightValue, searchWidthValue, iconPaddingLeftValue, inputWidthValue, inputHeightValue

const SearchCompo = styled('div')(({ theme }) => ({
    display: 'flex',
    position: 'relative',
    borderRadius: '12px',
    backgroundColor: AppStyles.colors['#E6EDFF'],
    '&:hover': {
        backgroundColor: AppStyles.colors['#E6EDFF'],
    },
    marginRight: 12,
    height: searchHeightValue, // searchHeight
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: searchWidthValue, // searchWidth
    },
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
        padding: theme.spacing(inputHeightValue, 1, 1, 0), // inputHeightValue
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(0.5)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: inputWidthValue, // inputWidth
        },
    },
}))

const Search = ({ searchHeight, searchWidth, inputWidth, inputHeight }) => {
    searchHeightValue = searchHeight
    searchWidthValue = searchWidth

    inputWidthValue = inputWidth
    inputHeight ? (inputHeightValue = inputHeight) : (inputHeightValue = 1)

    const { search: query, pathname } = useLocation()
    const history = useHistory()
    const { studysetname, sorttype, pageNumber, gradeid, subjectid } = queryString.parse(query)
    const [searchValue, setSearchValue] = useState(studysetname ? studysetname : '')

    const searchChangeHandler = (event) => {
        const searchText = event.target.value
        setSearchValue(searchText)
    }

    const searchSubmitHandler = (event) => {
        if (event.key === 'Enter') {
            let route = pathname + '?'
            if (searchValue && searchValue.trim() !== '') route += '&studysetname=' + searchValue

            if (subjectid) route += `&subjectid=${subjectid}`

            if (gradeid) route += `&gradeid=${gradeid}`

            if (pageNumber) route += `&pageNumber=${pageNumber}`

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
            />
            <SearchIconWrapper>
                <SearchIcon sx={{ color: AppStyles.colors['#185CFF'] }} />
            </SearchIconWrapper>
        </SearchCompo>
    )
}

export default Search
