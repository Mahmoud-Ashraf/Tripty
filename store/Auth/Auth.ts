import { createSlice } from '@reduxjs/toolkit';

interface TripState {
    showAuthModal: boolean,
    userCoords: { latitude: number, longitude: number } | null
}

const initialAuthState: TripState = { showAuthModal: false, userCoords: null }

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        openShowAuthModal(state) {
            state.showAuthModal = true;
        },
        closeShowAuthModal(state) {
            state.showAuthModal = false;
        },
        setCoords(state, action) {
            state.userCoords = action.payload;
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;