import { useState } from 'react'

import { useLocation } from 'react-router-dom'

import { FilterAltOff } from '@mui/icons-material'
import { Grid, IconButton, Tooltip } from '@mui/material'
import FullWidthHeaderWhite from '~/components/FullWidthHeaderWhite'
import PageTitle from '~/components/PageTitle'

import logo from '../../../assets/images/Logo.png'
import Filter from './Filter'
import Search from './Search'

import { initialValue } from '~/Mock'
import { AppStyles } from '~/constants/styles'
import { useAppSelector } from '~/hooks/redux-hooks'

const SearchPageHeader = () => {
    const grades = useAppSelector((state) => state.grades)
    const { state } = useLocation()
    const [classLevel, setClassLevel] = useState(state ? state.classLevel : initialValue)
    const [subject, setSubject] = useState(state ? state.subject : initialValue)
    const [typeFilter, setTypeFilter] = useState('')
    function classChangeHandler(name, value) {
        setClassLevel(() => ({ label: name, value: value }))
        setTypeFilter('grade')
    }
    function subjectChangeHandler(name, value) {
        setSubject(() => ({ label: name, value: value }))
        setTypeFilter('subject')
    }

    const clearHandler = () => {
        setClassLevel(initialValue)
        setSubject(initialValue)
    }

    const subjects = useAppSelector((state) => state.subjects)
    return (
        <FullWidthHeaderWhite maxWidthContent={1112}>
            <Grid item xs={12}>
                <PageTitle logo={logo} text="SEARCH" />
            </Grid>
            <Grid item xs={12} mt={2}>
                <Grid container alignItems="center" spacing={4}>
                    <Grid item xs={12}>
                        <Search searchHeight={48} searchWidth={1112} inputWidth={1040} inputHeight={1.5} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} mt={3} mb={5}>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={12}>
                        <Grid container display="flex" alignItems="center" justifyContent="left" spacing={3}>
                            <Grid item md={3}>
                                <Filter
                                    isRequired={true}
                                    isDisable={false}
                                    value={classLevel}
                                    onChange={classChangeHandler}
                                    data={grades}
                                    title="Cấp học"
                                    typeFilter={typeFilter}
                                />
                            </Grid>
                            <Grid item md={3}>
                                <Filter
                                    isRequired={true}
                                    isDisable={false}
                                    value={subject}
                                    onChange={subjectChangeHandler}
                                    data={
                                        classLevel.value < 3
                                            ? subjects.secondarySubjects
                                            : classLevel.value >= 3 && classLevel.value <= 7
                                            ? subjects.highSchoolSubjects
                                            : subjects.universitySubjects
                                    }
                                    title="Lĩnh vực"
                                    typeFilter={typeFilter}
                                />
                            </Grid>
                            <Grid item md={3}>
                                <Tooltip title="Xóa bộ lọc" placement="bottom">
                                    <IconButton
                                        // size="small"
                                        sx={{
                                            height: 50,
                                            width: 50,
                                            borderRadius: 3,
                                            mt: 5,
                                            color: AppStyles.colors['#FFFFFF'],
                                            backgroundColor: AppStyles.colors['#004DFF'],
                                            borderLeft: '1px solid rgba(0, 46, 153, 0.3)',
                                            ':hover': {
                                                bgcolor: AppStyles.colors['#0045e5'],
                                                color: 'white',
                                            },
                                        }}
                                        onClick={clearHandler}
                                    >
                                        <FilterAltOff fontSize="medium" />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            {/* <Grid item md={3}>
                                <Filter data={Mock_Data.dropdown4} title="Môn học" />
                            </Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </FullWidthHeaderWhite>
    )
}

export default SearchPageHeader
