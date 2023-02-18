import React from 'react'

import { Link } from 'react-router-dom'

import { Avatar, Box, Button, Typography } from '@mui/material'

import Crown from '~/assets/images/Crown.png'
import banner from '~/assets/images/Rectangle-3.png'
import logoBanner from '~/assets/images/Vector.png'
import { AppStyles } from '~/constants/styles'

const Banner = () => {
    return (
        <Box
            height={240}
            display="flex"
            style={{
                backgroundImage: `url(${banner})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                borderRadius: 12,
                overflow: 'hidden',
            }}
        >
            <Box display="flex" width="100%">
                <Box
                    sx={{
                        backgroundColor: AppStyles.colors['#0045e5'],
                        width: '62%',
                        height: '100%',
                        borderRadius: 4,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 100,
                    }}
                />
                <Box
                    display="flex"
                    sx={{
                        backgroundColor: AppStyles.colors['#0045e5'],
                        width: '10%',
                        height: '100%',
                        borderRadius: 4,
                        transform: 'skew(-22deg)',
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 100,
                        ml: -8,
                    }}
                >
                    <Typography
                        sx={{
                            color: AppStyles.colors['#CCDBFF'],
                            width: '15%',
                            fontSize: '320px',
                            transform: 'skew(22deg)',
                            ml: -82,
                            mt: -14,
                            opacity: 0.2,
                            userSelect: 'none',
                            fontWeight: 'bold',
                        }}
                    >
                        -50%
                    </Typography>
                    <Box mt={4} ml={12} display="flex" flexDirection="column" sx={{ transform: 'skew(20deg)' }}>
                        <Typography
                            variant="h6"
                            textAlign="left"
                            sx={{ userSelect: 'none', color: AppStyles.colors['#FFFFFF'] }}
                        >
                            Trãi nghiệm
                        </Typography>
                        <Box display="flex" alignItems="center" mt={0.5}>
                            <Box
                                component="img"
                                alt="CQUIZ"
                                src={logoBanner}
                                draggable={false}
                                sx={{
                                    aspectRatio: '16 / 9',
                                    objectFit: 'contain',
                                }}
                            />
                            <Button
                                sx={{
                                    color: AppStyles.colors['#000F33'],
                                    ml: 3,
                                    borderRadius: '12px',
                                    pr: 3,
                                    backgroundColor: AppStyles.colors['#FEDA01'],
                                    ':hover': {
                                        bgcolor: '#e4c400',
                                        color: AppStyles.colors['#000F33'],
                                    },
                                }}
                                draggable={false}
                                variant="contained"
                                startIcon={<Avatar src={Crown} />}
                                component={Link}
                                to="/upgrade"
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    PREMIUM
                                </Typography>
                            </Button>
                        </Box>
                        <Typography
                            mt={8.5}
                            variant="caption"
                            textAlign="left"
                            sx={{ userSelect: 'none', color: AppStyles.colors['#FFFFFF'] }}
                        >
                            (*) Chương trình chỉ áp dụng cho thành viên mới
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Banner
