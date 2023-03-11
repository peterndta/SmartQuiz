import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

const AlertConfirm = ({ title, children, open, onConfirm, onClose, btnConfirmText }) => {
    const confirmDialogHandler = () => {
        onClose()
        onConfirm()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ color: blueGrey[900] }}>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions sx={{ my: 2, mr: 2 }}>
                <Button onClick={onClose} variant="contained" color="error">
                    Cancel
                </Button>
                <Button onClick={confirmDialogHandler} variant="contained" color="primary">
                    {btnConfirmText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertConfirm
