import React, { useEffect } from 'react'

import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'

import { Typography } from '@mui/material'
import SelectCompo from '~/components/SelectCompo'

import { AppStyles } from '~/constants/styles'

const selectStyle = {
    border: 'none',
    backgroundColor: AppStyles.colors['#EEF2FF'],
}

const FormControlStyle = {
    mt: 1.5,
    minWidth: 260,
}
const Filter = ({ title, isRequired, onChange, value, data, isDisable, typeFilter }) => {
    const history = useHistory()
    const { search: query, pathname } = useLocation()
    const { studysetname, sorttype, pageNumber, gradeid, subjectid } = queryString.parse(query)

    const filterHandler = () => {
        let route = pathname + '?'
        if (studysetname && studysetname.trim() !== '') route += '&studysetname=' + studysetname

        if (typeFilter === 'subject') {
            if (value?.value) route += `&subjectid=${value?.value}`
            if (gradeid) route += `&gradeid=${gradeid}`
        } else if (typeFilter === 'grade') {
            if (
                (value?.value <= 2 && +subjectid === 7) ||
                (value?.value < 9 && +subjectid >= 11) ||
                (value?.value === 9 && +subjectid < 11)
            ) {
                route += `&gradeid=${value?.value}`
            } else {
                if (subjectid) route += `&subjectid=${subjectid}`
                if (value?.value) route += `&gradeid=${value?.value}`
            }
        }

        if (pageNumber) route += `&pageNumber=${pageNumber}`

        if (sorttype) route += `&sorttype=${sorttype}`

        history.push(route)
    }

    useEffect(() => {
        filterHandler()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value?.value])
    return (
        <React.Fragment>
            <Typography
                textAlign={'left'}
                variant="body1"
                fontWeight={500}
                sx={{
                    color: AppStyles.colors['#333333'],
                    pb: 0.125,
                    mb: 1,
                    fontFamily: 'Roboto !important',
                }}
            >
                {title}
            </Typography>

            <SelectCompo
                selectStyle={selectStyle}
                formControlStyle={FormControlStyle}
                onChange={onChange}
                value={value}
                isRequire={isRequired}
                data={data}
                isDisable={isDisable}
            />
        </React.Fragment>
    )
}

export default Filter
