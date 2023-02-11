import { Button } from '@mui/material'

const ButtonCompo = ({ style, children, variant, onClick, type = 'button', disable = false }) => {
    return (
        <Button
            variant={variant}
            sx={{ py: 2, px: 4, borderRadius: 3, minWidth: 260, ...style }}
            onClick={onClick}
            type={type}
            disabled={disable}
        >
            {children}
        </Button>
    )
}

export default ButtonCompo
