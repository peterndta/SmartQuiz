import { useState } from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import FullWidthHeaderWhite from '~/components/FullWidthHeaderWhite'

import MyInfo from './MyInfo'

import { AppStyles } from '~/constants/styles'

const Settings = () => {
    const [index, setIndex] = useState('0')

    const changeIndexHandler = (_, value) => {
        setIndex(value)
    }
    return (
        <FullWidthHeaderWhite maxWidthContent={1440}>
            <Box width={800} margin="0 auto">
                <TabContext value={index}>
                    <TabList
                        onChange={changeIndexHandler}
                        variant="standard"
                        sx={{
                            width: '100%',
                            '& .MuiTabs-flexContainer': {
                                display: 'flex',
                                justifyContent: 'center',
                            },
                        }}
                    >
                        <Tab
                            label="Thông tin cá nhân"
                            value={'0'}
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
                        <Box
                            sx={{
                                backgroundColor: '#eef2ff',
                                position: 'absolute',
                                mt: 5,
                                maxWidth: 800,
                                width: '100%',
                            }}
                        >
                            <MyInfo />
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>
        </FullWidthHeaderWhite>
    )
}

export default Settings
