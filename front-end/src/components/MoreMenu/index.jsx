import React, { useRef, useState } from 'react'

import { Link as RouterLink } from 'react-router-dom'

import { BookmarkAdd, BorderColor, Delete, MoreVert, RemoveCircleOutline } from '@mui/icons-material'
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'

import { AppStyles } from '~/constants/styles'

const MoreMenu = ({ studySetId, saveButtonOn, color, deleteButtonOn, deleteStudySetHandler, removeButtonOn }) => {
    const ref = useRef(null)
    const [isOpen, setIsOpen] = useState(false)

    const deleteHandler = () => {
        deleteStudySetHandler(studySetId)
    }

    return (
        <React.Fragment>
            <IconButton size="small" ref={ref} onClick={() => setIsOpen(true)}>
                <MoreVert size="small" sx={{ color: color }} />
            </IconButton>

            <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                    sx: { width: 180, maxWidth: '100%' },
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {saveButtonOn && (
                    <MenuItem component={RouterLink} to={`/admin/users/${studySetId}`} sx={{ color: 'text.secondary' }}>
                        <ListItemIcon>
                            <BookmarkAdd fontSize="small" sx={{ color: AppStyles.colors['#767680'] }} />
                        </ListItemIcon>
                        <ListItemText primary="Lưu" primaryTypographyProps={{ variant: 'body2' }} />
                    </MenuItem>
                )}

                <MenuItem
                    component={RouterLink}
                    to={`/study-sets/${studySetId}/update`}
                    sx={{ color: 'text.secondary' }}
                >
                    <ListItemIcon>
                        <BorderColor fontSize="small" sx={{ color: AppStyles.colors['#767680'] }} />
                    </ListItemIcon>
                    <ListItemText primary="Sửa" primaryTypographyProps={{ variant: 'body2' }} />
                </MenuItem>
                {deleteButtonOn && (
                    <MenuItem sx={{ color: 'text.secondary' }} onClick={deleteHandler}>
                        <ListItemIcon>
                            <Delete fontSize="small" color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Xóa" primaryTypographyProps={{ variant: 'body2', color: 'error' }} />
                    </MenuItem>
                )}
                {removeButtonOn && (
                    <MenuItem sx={{ color: 'text.secondary' }} onClick={deleteHandler}>
                        <ListItemIcon>
                            <RemoveCircleOutline fontSize="small" color="error" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Xóa khỏi lớp"
                            primaryTypographyProps={{ variant: 'body2', color: 'error' }}
                        />
                    </MenuItem>
                )}
            </Menu>
        </React.Fragment>
    )
}

export default MoreMenu
