import type { CompleteProfile } from "@/types/profile.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
    profile: CompleteProfile | null;
}

const initialState: ProfileState = {
    profile: null,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<CompleteProfile>) => {
            state.profile = action.payload;
        },
        logout: (state) => {
            state.profile = null;
        },
    },
});

export const { setProfile, logout } = profileSlice.actions;
export default profileSlice.reducer;