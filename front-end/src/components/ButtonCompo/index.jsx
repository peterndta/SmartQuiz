import { Button } from '@mui/material'

const ButtonCompo = ({
    style,
    children,
    variant = 'contained',
    onClick,
    type = 'button',
    disable = false,
    fullWidth = false,
}) => {
    return (
        <Button
            variant={variant}
            sx={{ py: 2, px: 4, borderRadius: 3, minWidth: 260, ...style }}
            onClick={onClick}
            type={type}
            disabled={disable}
            fullWidth={fullWidth}
        >
            {children}
        </Button>
    )
}

export default ButtonCompo
