import { createSlice } from '@reduxjs/toolkit';

interface TripState {
    showAuthModal: boolean
}

const initialAuthState: TripState = { showAuthModal: false }

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        openShowAuthModal(state) {
            state.showAuthModal = true;
        },
        closeShowAuthModal(state) {
            state.showAuthModal = false;
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;