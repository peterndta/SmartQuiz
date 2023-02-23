/* eslint-disable no-extra-boolean-cast */
import React, { useEffect } from 'react'

import queryString from 'query-string'
// import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'

import { FormControl, MenuItem, Select } from '@mui/material'

import { AppStyles } from '~/constants/styles'

const Sort = () => {
    const history = useHistory()
    const { search: query, pathname } = useLocation()
    const { studysetname, sorttype, pageNumber, gradeid, subjectid } = queryString.parse(query)
    const [type, setType] = React.useState(sorttype ? sorttype : 'Newest')

    const handleChange = (event) => {
        setType(event.target.value)
    }

    const filterHandler = () => {
        let route = pathname + '?'
        if (studysetname && studysetname.trim() !== '') route += '&studysetname=' + studysetname

        if (subjectid) route += `&subjectid=${subjectid}`

        if (gradeid) route += `&gradeid=${gradeid}`

        if (pageNumber) route += `&pageNumber=${pageNumber}`

        if (!!type) route += `&sorttype=${type}`

        history.push(route)
    }

    useEffect(() => {
        filterHandler()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type])

    return (
        <FormControl sx={{ minWidth: 100 }}>
            <Select
                value={type}
                variant="outlined"
                onChange={handleChange}
                sx={{
                    bgcolor: AppStyles.colors['#FAFBFF'],
                    borderRadius: 3,
                    boxShadow: '0px 1px 2px rgba(0, 46, 153, 0.3), 0px 1px 3px 1px rgba(0, 46, 153, 0.15)',
                    '& svg': {
                        color: AppStyles.colors['#004DFF'],
                    },
                }}
            >
                <MenuItem value={'Newest'}>Mới nhất</MenuItem>
                <MenuItem value={'Oldest'}>Cũ nhất</MenuItem>
            </Select>
        </FormControl>
    )
}

export default Sort
