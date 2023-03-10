import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import { Add, BookmarkAdd, CheckBox, Delete, Description, Edit, Star } from '@mui/icons-material'
import { Avatar, Box, Button, Divider, IconButton, Tooltip, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'
import AlertConfirm from '~/components/ConfirmDialog'
import CreateClassModal from '~/components/CreateClassModal'
import QuestionCard from '~/components/QuestionList/QuestionCard'

import AddModal from './AddModal'
import LearnModal from './LearnModal'
import RateModal from './RateModal'
import TestModal from './TestModal'

import logo from '~/assets/images/User 5.png'
import { AppStyles } from '~/constants/styles'
import { useAppSelector } from '~/hooks/redux-hooks'

const DetailHeader = ({ info, id, questions, userId, deleteStudySetHandler }) => {
    const { userId: idUser } = useAppSelector((state) => state.auth)
    const [openLearn, setOpenLearn] = useState(false)
    const [openTest, setOpenTest] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)
    const [openAddClass, setOpenAddClass] = useState(false)
    const [openRate, setOpenRate] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)

    const handleOpenLearn = () => setOpenLearn(true)
    const handleCloseLearn = () => setOpenLearn(false)

    const handleOpenConfirm = () => setOpenConfirm(true)
    const handleCloseConfirm = () => setOpenConfirm(false)

    const handleOpenTest = () => setOpenTest(true)
    const handleCloseTest = () => setOpenTest(false)

    const handleOpenAdd = () => setOpenAdd(true)
    const handleCloseAdd = () => setOpenAdd(false)

    const handleOpenAddClass = () => {
        setOpenAddClass(true)
    }
    const handleCloseAddClass = () => setOpenAddClass(false)

    const handleOpenRate = () => setOpenRate(true)
    const handleCloseRate = () => setOpenRate(false)

    const history = useHistory()
    const ButtonStyle = {
        color: AppStyles.colors['#000F33'],
        textTransform: 'none',
        height: 56,
        minWidth: 413,
        backgroundColor: AppStyles.colors['#CCDBFF'],
        ':hover': {
            bgcolor: AppStyles.colors['#004DFF'],
            color: 'white',
        },
    }

    return (
        <React.Fragment>
            <LearnModal open={openLearn} handleClose={handleCloseLearn} id={id} />
            <TestModal open={openTest} handleClose={handleCloseTest} id={id} numberOfQuestion={info.questions.length} />
            {openAdd && (
                <AddModal open={openAdd} handleClose={handleCloseAdd} handleOpenAddClass={handleOpenAddClass} />
            )}
            <RateModal open={openRate} handleClose={handleCloseRate} id={id} numberOfQuestion={info.questions.length} />
            {openAddClass && <CreateClassModal open={openAddClass} handleClose={handleCloseAddClass} />}
            <Typography sx={{ fontWeight: 500, fontSize: 32, color: AppStyles.colors['#333333'] }}>
                {info.name}
            </Typography>
            <Button
                sx={{
                    textTransform: 'none',
                    ':hover': {
                        bgcolor: '#eef2ff',
                    },
                }}
                onClick={handleOpenRate}
            >
                <Star fontSize="small" sx={{ color: AppStyles.colors['#FFAF00'] }} />
                <Typography
                    sx={{
                        mt: 0.5,
                        ml: 1,
                        color: AppStyles.colors['#586380'],
                        fontSize: 15,
                        fontWeight: 500,
                    }}
                >
                    4.5 (17 đánh giá)
                </Typography>
            </Button>

            <Divider
                sx={{ mt: 2, borderBottomWidth: 2, backgroundColor: AppStyles.colors['#000F33'], opacity: '30%' }}
            />
            <Box display="flex" mt={4} justifyContent="space-between">
                <Box display="flex" alignItems="center">
                    <Avatar sx={{ height: 40, width: 40 }} src={logo} alt="logo" />
                    <Typography
                        sx={{
                            ml: 2,
                            color: AppStyles.colors['#333333'],
                            fontSize: 16,
                            fontWeight: 500,
                        }}
                    >
                        {info?.creator}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                    <Tooltip title="Thêm" placement="bottom">
                        <IconButton size="large" sx={{ border: '1px solid #767680', mr: 2 }} onClick={handleOpenAdd}>
                            <Add fontSize="small" sx={{ color: AppStyles.colors['#767680'] }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Lưu" placement="bottom">
                        <IconButton size="large" sx={{ border: '1px solid #767680', mr: 2 }}>
                            <BookmarkAdd fontSize="small" sx={{ color: AppStyles.colors['#767680'] }} />
                        </IconButton>
                    </Tooltip>
                    {idUser === userId && (
                        <React.Fragment>
                            <Tooltip title="Sửa" placement="bottom">
                                <IconButton
                                    size="large"
                                    sx={{ border: '1px solid #767680', mr: 2 }}
                                    onClick={() => history.push(`/study-sets/${id}/update`)}
                                >
                                    <Edit fontSize="small" sx={{ color: AppStyles.colors['#767680'] }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa" placement="bottom">
                                <IconButton
                                    size="large"
                                    sx={{ border: '1px solid #767680', mr: 2 }}
                                    onClick={handleOpenConfirm}
                                >
                                    <Delete fontSize="small" sx={{ color: AppStyles.colors['#767680'] }} />
                                </IconButton>
                            </Tooltip>
                        </React.Fragment>
                    )}
                </Box>
            </Box>
            <Box mt={2.5}>
                <QuestionCard question={questions[0]} index={0} />
                <Box display="flex" alignItems="center" justifyContent="space-between" mt={3}>
                    <ButtonCompo style={ButtonStyle} onClick={handleOpenLearn}>
                        <Description fontSize="medium" />
                        <Typography ml={1.5} sx={{ fontSize: 16, fontWeight: 500 }}>
                            Học
                        </Typography>
                    </ButtonCompo>
                    <ButtonCompo style={ButtonStyle} onClick={handleOpenTest}>
                        <CheckBox fontSize="medium" />
                        <Typography ml={1.5} sx={{ fontSize: 16, fontWeight: 500 }}>
                            Kiểm tra
                        </Typography>
                    </ButtonCompo>
                </Box>
            </Box>
            <Box display="flex" mt={8}>
                <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Tất cả câu hỏi</Typography>
                <Typography sx={{ ml: 2, fontWeight: 600, fontSize: 20, color: AppStyles.colors['#767680'] }}>
                    ({info.questions.length})
                </Typography>
            </Box>
            {openConfirm && (
                <AlertConfirm
                    title="Xóa học phần"
                    open={openConfirm}
                    onClose={handleCloseConfirm}
                    btnConfirmText="Delete"
                    onConfirm={deleteStudySetHandler}
                >
                    Bạn có muốn xóa học phần này không?
                </AlertConfirm>
            )}
        </React.Fragment>
    )
}

export default DetailHeader
