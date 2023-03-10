import CopyToClipboard from 'react-copy-to-clipboard'

import { FilterNone, InfoOutlined, PersonOutline } from '@mui/icons-material'
import { Box, Button, InputBase, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { AppStyles } from '~/constants/styles'

const InputCompo = styled('div')(({ theme }) => ({
    display: 'flex',
    position: 'relative',
    borderRadius: '8px',
    backgroundColor: AppStyles.colors['#E6EDFF'],
    '&:hover': {
        backgroundColor: AppStyles.colors['#E6EDFF'],
    },
    marginRight: 12,
    height: '100%',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 230,
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
            width: '100%', // inputWidth
        },
    },
    '&:disabled': {
        color: AppStyles.colors['#000F33'],
    },
}))
const ClassDetailRight = ({ description, totalMem, totalStudySet, joinedCode, showSnackbar }) => {
    const textClipBoard = `${window.location.origin}/join/${joinedCode}`

    const copyClipBoardHander = () => {
        showSnackbar({
            severity: 'success',
            children: 'Bạn đã copy thành công.',
        })
    }

    return (
        <Box mt={6}>
            <Typography
                sx={{
                    color: AppStyles.colors['#333333'],
                    fontSize: 12,
                    textTransform: 'uppercase',
                    fontWeight: 700,
                }}
            >
                Liên kết mới
            </Typography>
            <Box display="flex" mt={2}>
                <InputCompo>
                    <StyledInputBase inputProps={{ 'aria-label': 'link' }} value={textClipBoard} />
                </InputCompo>
                <CopyToClipboard text={textClipBoard} onCopy={copyClipBoardHander}>
                    <Button
                        sx={{
                            borderRadius: 2,
                            px: 1,
                            backgroundColor: AppStyles.colors['#004DFF'],
                            color: 'white',
                            textTransform: 'none',
                            ':hover': {
                                bgcolor: AppStyles.colors['#0045e5'],
                                color: 'white',
                            },
                        }}
                    >
                        Sao chép
                    </Button>
                </CopyToClipboard>
            </Box>
            <Typography
                sx={{
                    mt: 4,
                    color: AppStyles.colors['#333333'],
                    fontSize: 12,
                    textTransform: 'uppercase',
                    fontWeight: 700,
                }}
            >
                CHI TIẾT LỚP HỌC
            </Typography>
            <Box mt={3}>
                <Box display="flex" alignItems="center" mt={2}>
                    <FilterNone fontSize="small" sx={{ color: AppStyles.colors['#333333'], opacity: 0.2 }} />
                    <Typography
                        sx={{
                            ml: 2,
                            color: AppStyles.colors['#333333'],
                            fontSize: 14,
                            fontWeight: 600,
                        }}
                    >
                        {totalStudySet} học phần
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                    <PersonOutline fontSize="small" sx={{ color: AppStyles.colors['#333333'], opacity: 0.2 }} />
                    <Typography
                        sx={{
                            ml: 2,
                            color: AppStyles.colors['#333333'],
                            fontSize: 14,
                            fontWeight: 600,
                        }}
                    >
                        {totalMem} thành viên
                    </Typography>
                </Box>
                <Box display="flex" mt={2}>
                    <InfoOutlined fontSize="small" sx={{ color: AppStyles.colors['#333333'], opacity: 0.2 }} />
                    <Typography
                        sx={{
                            ml: 2,
                            color: AppStyles.colors['#333333'],
                            fontSize: 14,
                            fontWeight: 600,
                        }}
                    >
                        {description === '' ? 'Unknown' : description}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default ClassDetailRight
