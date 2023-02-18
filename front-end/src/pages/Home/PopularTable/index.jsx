import { useState } from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Paper, Tab, Typography } from '@mui/material'

import TableContent from './TableContent'

import { AppStyles } from '~/constants/styles'

const PopularTable = ({ studySet }) => {
    const [index, setIndex] = useState('0')

    const changeIndexHandler = (_, value) => {
        setIndex(value)
    }

    return (
        <Box>
            <Typography
                textAlign={'left'}
                variant="h6"
                fontWeight={600}
                sx={{
                    color: 'black',
                    pb: 0.125,
                    mb: 2,
                }}
            >
                Nổi bật trong tuần
            </Typography>

            <Paper elevation={0} sx={{ borderRadius: 2.5, backgroundColor: AppStyles.colors['#FAFBFF'] }}>
                <TabContext value={index}>
                    <TabList onChange={changeIndexHandler} variant="fullWidth">
                        <Tab
                            label="Lớp học của tôi"
                            value={'0'}
                            sx={{
                                minWidth: 100,
                                textTransform: 'none',
                                fontSize: 16,
                                fontWeight: 500,
                                color: AppStyles.colors['#333333'],
                            }}
                        />
                        <Tab
                            label="Học phần của tôi"
                            value={'1'}
                            sx={{
                                minWidth: 100,
                                textTransform: 'none',
                                fontSize: 16,
                                fontWeight: 500,
                                color: AppStyles.colors['#333333'],
                            }}
                        />
                    </TabList>
                    <TabPanel value={'0'} sx={{ p: 0 }}>
                        <Paper
                            elevation={1}
                            sx={{
                                borderRadius: 2.5,
                                height: '100%',
                                backgroundColor: AppStyles.colors['#FAFBFF'],
                            }}
                        >
                            <TableContent studySet={studySet} />
                        </Paper>
                    </TabPanel>
                    <TabPanel value={'1'} sx={{ p: 0 }}>
                        <Paper
                            elevation={1}
                            sx={{
                                borderRadius: 2.5,
                                height: '100%',
                                backgroundColor: AppStyles.colors['#FAFBFF'],
                            }}
                        >
                            <TableContent studySet={studySet} />
                        </Paper>
                    </TabPanel>
                </TabContext>
            </Paper>
        </Box>
    )
}

export default PopularTable
