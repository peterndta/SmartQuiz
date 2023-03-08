import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { Box, Button, Typography } from '@mui/material'

import CreateClassModal from '../CreateClassModal'

import { AppStyles } from '~/constants/styles'

const EmptyStudySets = ({ textAbove, textBelow, image, disable = false, path = undefined, content }) => {
    const [openAddClass, setOpenAddClass] = useState(false)

    const openHandler = () => setOpenAddClass(true)

    const closeHandler = () => setOpenAddClass(false)

    return (
        <React.Fragment>
            <Box textAlign="center">
                {image && (
                    <Box
                        mt={2}
                        component="img"
                        alt="sets_empty"
                        src={image}
                        sx={{
                            width: 300,
                            height: 150,
                        }}
                    />
                )}

                <Typography fontSize={24} fontWeight={700} sx={{ color: AppStyles.colors['#000F33'] }}>
                    {textAbove}
                </Typography>
                <Typography fontSize={16} mt={1} sx={{ color: AppStyles.colors['#000F33'] }}>
                    {textBelow}
                </Typography>
                {!disable && path ? (
                    <Button
                        sx={{
                            color: AppStyles.colors['#FFFFFF'],
                            borderRadius: 3,
                            px: 3,
                            py: 1,
                            mt: 3,
                            textTransform: 'none',
                            backgroundColor: AppStyles.colors['#004DFF'],
                            ':hover': {
                                bgcolor: AppStyles.colors['#0045e5'],
                                color: 'white',
                            },
                        }}
                        component={Link}
                        to={path}
                    >
                        <Typography>{content}</Typography>
                    </Button>
                ) : disable ? null : (
                    <Button
                        sx={{
                            color: AppStyles.colors['#FFFFFF'],
                            borderRadius: 3,
                            px: 3,
                            py: 1,
                            mt: 3,
                            textTransform: 'none',
                            backgroundColor: AppStyles.colors['#004DFF'],
                            ':hover': {
                                bgcolor: AppStyles.colors['#0045e5'],
                                color: 'white',
                            },
                        }}
                        onClick={openHandler}
                    >
                        <Typography>{content}</Typography>
                    </Button>
                )}
            </Box>
            {openAddClass && <CreateClassModal open={openAddClass} handleClose={closeHandler} />}
        </React.Fragment>
    )
}

export default EmptyStudySets
