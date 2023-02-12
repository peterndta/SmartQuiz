import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    secondarySubjects: [],
    highSchoolSubjects: [],
    universitySubjects: [],
}

const subjectSlice = createSlice({
    name: 'subject',
    initialState,
    reducers: {
        setSubjects: (state, action) => {
            const subjects = [...action.payload]
            subjects.forEach((subject) => {
                const formatSubject = { ...subject, value: subject.id, label: subject.name }
                if (formatSubject.value <= 7) {
                    state.highSchoolSubjects.push(formatSubject)
                    state.secondarySubjects.push(formatSubject)
                } else if (formatSubject.value > 7) {
                    state.universitySubjects.push(formatSubject)
                }
            })
            state.secondarySubjects.pop()
        },
    },
})

export const { setSubjects } = subjectSlice.actions

export default subjectSlice.reducer
