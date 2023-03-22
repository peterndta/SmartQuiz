import { useState } from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Avatar, Box, Tab, Typography } from '@mui/material'
import FullWidthHeaderWhite from '~/components/FullWidthHeaderWhite'

import Bookmarks from './Bookmarks'
import Draft from './Draft'
import MyClass from './MyClass'
import StudySets from './StudySets'

import { useStudySet } from '~/actions/study-set'
// import logo from '~/assets/images/User 5.png'
import { AppStyles } from '~/constants/styles'
import { useAppSelector } from '~/hooks/redux-hooks'

function padWithLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0')
}

const MyLibrary = () => {
    const { username, image, userId } = useAppSelector((state) => state.auth)
    const [index, setIndex] = useState('0')

    const changeIndexHandler = (_, value) => {
        setIndex(value)
    }
    const { getMyStudySets } = useStudySet()

    return (
        <FullWidthHeaderWhite maxWidthContent={1670}>
            <Box display="flex" flexDirection="column" width={700}>
                <Box display="flex" alignItems="center">
                    <Box>
                        <Avatar sx={{ height: 80, width: 80 }} src={image} alt="logo" />
                    </Box>
                    <Box ml={2}>
                        <Typography
                            fontWeight={500}
                            sx={{
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: '1',
                                textOverflow: 'ellipsis',
                                color: 'black',
                                textDecoration: 'none',
                                fontSize: 24,
                            }}
                        >
                            {username}
                        </Typography>
                        <Typography
                            fontWeight={500}
                            variant="body1"
                            sx={{
                                color: AppStyles.colors['#767680'],
                                textDecoration: 'none',
                            }}
                        >
                            ID {padWithLeadingZeros(userId, 6)}
                        </Typography>
                    </Box>
                </Box>

                <Box width="100%" mt={4}>
                    <TabContext value={index}>
                        <TabList onChange={changeIndexHandler} variant="standard">
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
                            <Tab
                                label="Đã lưu"
                                value={'2'}
                                sx={{
                                    minWidth: 100,
                                    textTransform: 'none',
                                    fontSize: 16,
                                    fontWeight: 500,
                                    color: AppStyles.colors['#333333'],
                                }}
                            />
                            <Tab
                                label="Bản nháp"
                                value={'3'}
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
                            <MyClass />
                        </TabPanel>
                        <TabPanel value={'1'} sx={{ p: 0 }}>
                            <StudySets getMyStudySets={getMyStudySets} />
                        </TabPanel>
                        <TabPanel value={'2'} sx={{ p: 0 }}>
                            <Bookmarks />
                        </TabPanel>
                        <TabPanel value={'3'} sx={{ p: 0 }}>
                            <Draft />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </FullWidthHeaderWhite>
    )
}

export default MyLibrary
