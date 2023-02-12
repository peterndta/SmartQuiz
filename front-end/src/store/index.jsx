import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '~/features/authSlice'
import GradeReducer from '~/features/gradeSlice'
import SubjectReducer from '~/features/subjectSlice'

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        grades: GradeReducer,
        subjects: SubjectReducer,
    },
})
