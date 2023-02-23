import { InputBase } from '@mui/material'
import { styled } from '@mui/material/styles'

import { AppStyles } from '~/constants/styles'

const InputBox = ({ name }) => {
    const SearchCompo = styled('div')(({ theme }) => ({
        display: 'flex',
        position: 'relative',
        borderRadius: '8px',
        backgroundColor: AppStyles.colors['#E6EDFF'],
        '&:hover': {
            backgroundColor: AppStyles.colors['#E6EDFF'],
        },
        marginRight: 12,
        height: '100%', // searchHeight
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '100%', // searchWidth
        },
    }))

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: AppStyles.colors['#000F33'],
        '& .MuiInputBase-input': {
            padding: theme.spacing(2, 1, 2, 0), // inputHeightValue
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(0.5)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: 500, // inputWidth
            },
        },
        '&:disabled': {
            color: AppStyles.colors['#000F33'],
        },
    }))

    return (
        <SearchCompo>
            <StyledInputBase inputProps={{ 'aria-label': 'search' }} value={name} disabled={true} />
        </SearchCompo>
    )
}

export default InputBox
