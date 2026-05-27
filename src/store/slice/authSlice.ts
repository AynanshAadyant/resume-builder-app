import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice( {
    name : 'auth',
    initialState : {
        isAuthenticated : false,
        user : null //stores all user data
    },
    reducers : {
        authenticate : (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        logout : (state) => {
            state.isAuthenticated = false,
            state.user = null
        }
    }
})

export const { authenticate, logout } = authSlice.actions

export default authSlice.reducer

