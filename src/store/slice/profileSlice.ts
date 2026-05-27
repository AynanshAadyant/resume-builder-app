import { createSlice } from '@reduxjs/toolkit'

export const profileSlice = createSlice( {
    name : "profile",
    initialState: {
        profile : null //stores all data of profile
    },
    reducers : {
        setProfile : (state,action) => {
            state.profile = action.payload
        },
        logout : ( state ) => {
            state.profile = null
        }
    }
})

export const {setProfile, logout} = profileSlice.actions

export default profileSlice.reducer
