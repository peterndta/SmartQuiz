import { Avatar, Box, CardContent, Grid, Typography } from '@mui/material'
import CardLayout from '~/components/CardLayout'

const CardLayoutStyle = {
    borderRadius: 1,
    boxShadow: '0px 1px 2px rgba(0, 46, 153, 0.3), 0px 1px 3px 1px rgba(0, 46, 153, 0.15)',
    borderBottom: '3px solid transparent;',
    ':hover': {
        borderBottom: '3px solid #CCDBFF;',
    },
}

const MemberCard = ({ member, kickHandler, canDelete }) => {
    return (
        <Grid item>
            <CardLayout style={CardLayoutStyle}>
                <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Avatar sx={{ height: 50, width: 50 }} src={member.imageUrl} alt="logo" />
                            <Box mt={1} ml={2}>
                                <Typography
                                    variant="body1"
                                    fontWeight={500}
                                    sx={{
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: '1',
                                        textOverflow: 'ellipsis',

                                        color: 'black',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {member.name}
                                </Typography>

                                <Typography
                                    textAlign={'left'}
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: '2',
                                        textOverflow: 'ellipsis',
                                        fontSize: 14,
                                    }}
                                >
                                    {member.isClassOwner ? 'Quản trị viên' : 'Thành viên'}
                                </Typography>
                            </Box>
                        </Box>
                        {!member.isClassOwner && canDelete && (
                            <Box
                                onClick={() => kickHandler(member.id)}
                                borderRadius={2}
                                sx={{
                                    cursor: 'pointer',
                                    ':hover': {
                                        backgroundColor: '#fcf1f1',
                                    },
                                }}
                            >
                                <Typography color="error" fontWeight={500} sx={{ p: 1 }}>
                                    Xóa
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </CardLayout>
        </Grid>
    )
}

export default MemberCard
