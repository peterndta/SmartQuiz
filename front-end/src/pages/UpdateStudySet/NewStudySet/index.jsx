import { memo } from 'react'

import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import { Box, InputBase } from '@mui/material'

import SelectField from './SelectField/index'

import { AppStyles } from '~/constants/styles'
import { useAppSelector } from '~/hooks/redux-hooks'

const NewStudySet = ({ infoStudySetHandler, infoStudySet }) => {
    const { titleChangeHandler, classChangeHandler, subjectChangeHandler } = infoStudySetHandler

    const { classLevel, subject, title } = infoStudySet
    const grades = useAppSelector((state) => state.grades)
    const subjects = useAppSelector((state) => state.subjects)
    return (
        <Box sx={{ backgroundColor: AppStyles.colors['#004DFF'], p: 4, mt: 5, borderRadius: 2 }}>
            <Box display="flex" alignItems="flex-end" mb={1} ml={3} maxWidth="50%">
                <InputBase
                    placeholder="Tiêu đề"
                    type="text"
                    sx={{
                        borderBottom: `0.5px solid #fefefe`,
                        pl: 2,
                        py: 1.4,
                        '& ::placeholder': {
                            color: AppStyles.colors['#FAFBFF'],
                        },
                        color: AppStyles.colors['#FFAF00'],
                        mr: 2.4,
                        fontSize: 32,
                    }}
                    fullWidth
                    onChange={titleChangeHandler}
                    value={title}
                    className="text-field"
                    required
                />
                <DriveFileRenameOutlineIcon sx={{ color: '#FFFFFF' }} />
            </Box>
            <Box sx={{ mt: 3 }} display="flex">
                <SelectField
                    label="Cấp học"
                    isRequired={true}
                    isDisable={false}
                    value={classLevel}
                    onChange={classChangeHandler}
                    data={grades}
                />
                <SelectField
                    label="Lĩnh vực"
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
                />
            </Box>
        </Box>
    )
}

export default memo(NewStudySet)
