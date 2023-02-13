import { useState } from 'react'

import { useLocation } from 'react-router-dom'

import { Grid } from '@mui/material'
import FullWidthHeaderWhite from '~/components/FullWidthHeaderWhite'
import PageTitle from '~/components/PageTitle'

import logo from '../../../assets/images/Logo.png'
import Filter from './Filter'
import Search from './Search'

import { initialValue } from '~/Mock'
import { useAppSelector } from '~/hooks/redux-hooks'

const SearchPageHeader = () => {
    const grades = useAppSelector((state) => state.grades)
    const { state } = useLocation()
    const [classLevel, setClassLevel] = useState(state ? state.classLevel : grades[7])
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
    // const classChangeHandler = (name, value) => setClassLevel(() => ({ label: name, value: value }))

    // const subjectChangeHandler = (name, value) => setSubject(() => ({ label: name, value: value }))

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
                            {/* <Grid item md={3}>
                                <Filter data={Mock_Data.dropdown3} title="Lớp" />
                            </Grid>
                            <Grid item md={3}>
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
