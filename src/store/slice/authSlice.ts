import { createSlice } from '@reduxjs/toolkit'

interface AuthSliceProp {
    isAuthenticated: boolean,
    user : any
}

const initialState :AuthSliceProp = {
        isAuthenticated : false,
        user : null //stores all user data
    }

export const authSlice = createSlice( {
    name : 'auth',
    initialState,
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

