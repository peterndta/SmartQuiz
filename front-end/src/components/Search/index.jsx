import { useState } from 'react'

import { useHistory } from 'react-router-dom'

// import { useHistory } from 'react-router-dom'
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
    const [value, setValue] = useState('')
    const history = useHistory()
    searchHeightValue = searchHeight
    searchWidthValue = searchWidth

    inputWidthValue = inputWidth
    inputHeight ? (inputHeightValue = inputHeight) : (inputHeightValue = 1)

    const changeHandler = (event) => setValue(event.target.value)

    const searchHandler = (event) => {
        if (event.key === 'Enter') {
            if (value.trim().length !== 0) {
                history.push(`/study-sets?studysetname=${value}`)
                setValue('')
            }
        }
    }

    return (
        <SearchCompo>
            <StyledInputBase
                placeholder="Tìm kiếm"
                inputProps={{ 'aria-label': 'search' }}
                value={value}
                onChange={changeHandler}
                onKeyDown={searchHandler}
            />
            <SearchIconWrapper>
                <SearchIcon sx={{ color: AppStyles.colors['#185CFF'] }} />
            </SearchIconWrapper>
        </SearchCompo>
    )
}

export default Search
