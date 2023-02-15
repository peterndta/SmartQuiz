import React, { useEffect, useState } from 'react'

import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

import { Box, Grid, Typography } from '@mui/material'
import ListStudySets from '~/components/ListStudySets'

import Paging from './Pagination'
import Sort from './Sort'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { useStudySet } from '~/actions/study-set'
import { AppStyles } from '~/constants/styles'
import Loading from '~/pages/Loading'

const filterStringGenerator = ({ studysetname, sorttype, pageNumber, gradeid, subjectid }) => {
    let filterString = '?'
    if (studysetname && studysetname.trim() !== '') filterString += 'StudySetName=' + studysetname

    if (subjectid !== undefined) filterString += `&SubjectId=${subjectid}`

    if (gradeid !== undefined) filterString += `&GradeId=${gradeid}`

    if (pageNumber !== undefined) filterString += `&pageNumber=${pageNumber}`

    filterString += `&pageSize=${12}`

    if (sorttype !== undefined) filterString += `&sorttype=${sorttype}`

    return filterString
}

const SearchPageBottom = () => {
    const { search: query } = useLocation()
    const { studysetname, sorttype = 'Newest', pageNumber, gradeid, subjectid } = queryString.parse(query)
    const { getStudySetList } = useStudySet()
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [studySet, setStudySet] = useState({ list: [], pageCount: 1 })
    const [studySetLength, setStudySetLength] = useState()
    const showSnackbar = useSnackbar()
    // console.log(filterStringGenerator({ studysetname, sorttype, pageNumber, gradeid, subjectid }))
    useEffect(() => {
        const params = filterStringGenerator({ studysetname, sorttype, pageNumber, gradeid, subjectid })

        const controller = new AbortController()
        const signal = controller.signal

        getStudySetList(params, signal)
            .then((response) => {
                const listStudySet = response.data.data
                setStudySetLength(response.data.data.length)
                let totalPages
                if (response.data.meta) {
                    totalPages = response.data.meta.totalPages
                } else {
                    totalPages = 1
                }
                setStudySet({ list: listStudySet, pageCount: totalPages })
                setIsFirstRender(false)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
                setIsFirstRender(false)
            })

        return () => {
            controller.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studysetname, sorttype, pageNumber, gradeid, subjectid])
    return (
        <Grid maxWidth={1670} container sx={{ m: '0 auto', mt: 2 }} flexDirection="column">
            <Box mt={1} display="flex" justifyContent="space-between" alignItems="center">
                <Typography
                    textAlign="left"
                    variant="h6"
                    fontWeight={600}
                    sx={{
                        color: 'black',
                        mb: 2,
                    }}
                >
                    Kết quả tìm kiếm
                </Typography>
                <Sort />
            </Box>
            <Box mt={4}>
                {isFirstRender ? (
                    <Loading />
                ) : (
                    <React.Fragment>
                        {studySetLength > 0 ? (
                            <React.Fragment>
                                <ListStudySets studySets={studySet.list} md={3} />{' '}
                                {studySet.pageCount !== 1 ? (
                                    <Box display="flex" justifyContent="center" mt={6} mb={10}>
                                        <Paging size={studySet.pageCount} />
                                    </Box>
                                ) : (
                                    <Typography
                                        mt={5}
                                        mb={10}
                                        textAlign="center"
                                        variant="body2"
                                        fontWeight={400}
                                        sx={{
                                            color: AppStyles.colors['#767680'],
                                        }}
                                    >
                                        Có {studySet.list.length} kết quả tìm kiếm phù hợp
                                    </Typography>
                                )}
                            </React.Fragment>
                        ) : (
                            <Box alignItems="center" justifyContent="center" display="flex" flexDirection="column">
                                <Typography fontSize={32} fontWeight={700} sx={{ color: AppStyles.colors['#000F33'] }}>
                                    Chúng tôi không tìm thấy bất kỳ kết quả nào.
                                </Typography>
                                <Typography
                                    fontSize={20}
                                    mt={2}
                                    fontWeight={600}
                                    sx={{ color: AppStyles.colors['#000F33'] }}
                                >
                                    Sau đây là một số đề xuất để cải thiện kết quả tìm kiếm của bạn:
                                </Typography>
                                <Box mt={1}>
                                    <Typography
                                        fontSize={20}
                                        component="li"
                                        sx={{ color: AppStyles.colors['#000F33'] }}
                                    >
                                        Kiểm tra chính tả hoặc thử các cách viết khác
                                    </Typography>
                                    <Typography
                                        fontSize={20}
                                        component="li"
                                        sx={{ color: AppStyles.colors['#000F33'] }}
                                    >
                                        Tìm kiếm bằng các từ khóa khác nhau
                                    </Typography>
                                    <Typography
                                        fontSize={20}
                                        component="li"
                                        sx={{ color: AppStyles.colors['#000F33'] }}
                                    >
                                        Xóa bộ lọc của bạn
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </React.Fragment>
                )}
            </Box>
        </Grid>
    )
}

export default SearchPageBottom
