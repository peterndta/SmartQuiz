import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const gradeSlice = createSlice({
    name: 'grade',
    initialState,
    reducers: {
        setGrades: (state, action) => {
            const grades = [...action.payload]
            grades.forEach((grade) => {
                const formatGrade = { ...grade, value: grade.id, label: grade.name }
                state.push(formatGrade)
            })
        },
    },
})

export const { setGrades } = gradeSlice.actions

export default gradeSlice.reducer
