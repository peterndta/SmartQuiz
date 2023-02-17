import { FileDownload } from '@mui/icons-material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {
    Box,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import ButtonCompo from '~/components/ButtonCompo'

import template from '~/assets/files/Template.xlsx'
import { AppStyles } from '~/constants/styles'

const ImportExportModal = ({ open, handleClose, onInputChange, handleUpload, files }) => {
    const ButtonStyle = {
        height: 50,
        mt: 3,
        width: '100%',
        backgroundColor: AppStyles.colors['#004DFF'],
        textTransform: 'none',
        fontSize: 16,
        ':hover': {
            bgcolor: AppStyles.colors['#0045e5'],
            color: 'white',
        },
    }
    const backgroundColor = '#fff'
    return (
        <Dialog open={open} onClose={handleClose} disableEscapeKeyDown={false} fullWidth maxWidth="xs">
            <DialogTitle>
                <Typography sx={{ fontSize: 32, fontWeight: 600, color: AppStyles.colors['#333333'] }}>
                    Quản lý Tệp
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                        <DialogContentText color="textPrimary">Chọn tệp tải lên:</DialogContentText>
                        <Typography
                            sx={{
                                ml: 1,
                                fontSize: 16,
                                color: AppStyles.colors['#0045e5'],
                                fontWeight: 500,
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: '1',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {files?.name}
                        </Typography>
                    </Box>
                    <Tooltip
                        title="Tải xuống tệp mẫu"
                        component="a"
                        href={template}
                        download="Template.xlsx"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <IconButton aria-label="create" size="small" sx={{ border: '1px solid #767680' }}>
                            <FileDownload fontSize="small" sx={{ color: AppStyles.colors['#767680'] }} />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box>
                    <input
                        onChange={onInputChange}
                        accept=".xlsx"
                        style={{ display: 'none' }}
                        id="file-upload"
                        type="file"
                    />
                    <label
                        htmlFor="file-upload"
                        style={{
                            justifyContent: 'center',
                            cursor: 'pointer',
                            textAlign: 'center',
                            display: 'flex',
                            '&:hover p,&:hover svg,& img': {
                                opacity: 1,
                            },
                            '& p, svg': {
                                opacity: 0.4,
                            },
                            '&:hover img': {
                                opacity: 0.3,
                            },
                        }}
                    >
                        <Box display="grid" bgcolor={backgroundColor} height={100}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <CloudUploadIcon
                                    fontSize="large"
                                    sx={{
                                        ':hover svg': {
                                            opacity: 1,
                                        },
                                    }}
                                />
                                <Typography mt={1}>Bấm chọn tệp tải lên</Typography>
                            </Box>
                        </Box>
                    </label>
                </Box>

                <Box mt={2}>
                    <Typography
                        component={'span'}
                        variant="subtitle1"
                        sx={{ fontSize: 13, color: blueGrey[400] }}
                        fontWeight={400}
                    >
                        Số lượng câu hỏi được phép tải lên là{' '}
                        <Typography component={'span'} sx={{ fontSize: 13, color: blueGrey[600] }} fontWeight={600}>
                            20 câu hỏi, 8 câu trả lời và nội dung phải giống với tệp mẫu.
                        </Typography>{' '}
                        Vui lòng kiểm tra kỹ càng trước khi Tải lên câu hỏi.
                    </Typography>
                    <ButtonCompo variant="contained" style={ButtonStyle} onClick={handleUpload}>
                        Tải lên câu hỏi
                    </ButtonCompo>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default ImportExportModal
