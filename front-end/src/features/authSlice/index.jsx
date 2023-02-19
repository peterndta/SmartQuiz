import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: '',
    token: '',
    email: '',
    username: '',
    role: '',
    vip: false,
    image: '',
    exp: 0,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email
            state.username = action.payload.name
            state.role = action.payload.role
            state.image = action.payload.image
            state.exp = action.payload.exp
            state.userId = action.payload.userId
            state.token = action.payload.token
            const premium = action.payload.premium === 'False' ? false : true
            state.vip = premium
        },
        logout: (state) => {
            state.email = ''
            state.username = ''
            state.role = ''
            state.image = ''
            state.userId = ''
            state.exp = 0
            state.token = ''
            state.vip = false
        },
        checkout: (state, action) => {
            state.vip = action.payload
        },
    },
})

export const { login, logout, checkout } = authSlice.actions

export default authSlice.reducer
