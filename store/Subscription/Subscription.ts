import { createSlice } from '@reduxjs/toolkit';

interface SubscriptionState {
    showStartSubscriptionModal: boolean,
    showTripsFinishedModal: boolean,
    showOffersFinishedModal: boolean,
    check: string
}

const initialSubscriptionState: SubscriptionState = { showStartSubscriptionModal: false, showTripsFinishedModal: false, showOffersFinishedModal: false, check: '' }

const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState: initialSubscriptionState,
    reducers: {
        openStartSubscriptionModal(state) {
            state.showStartSubscriptionModal = true;
        },
        closeStartSubscriptionModal(state) {
            state.showStartSubscriptionModal = false;
        },
        openTripsFinishedModal(state) {
            state.showTripsFinishedModal = true;
        },
        closeTripsFinishedModal(state) {
            state.showTripsFinishedModal = false;
        },
        openOffersFinishedModal(state) {
            state.showOffersFinishedModal = true;
        },
        closeOffersFinishedModal(state) {
            state.showOffersFinishedModal = false;
        },
        // changeSubscriptionCheck(state, action) {
        //     state.check = action.payload;
        // }
    }
})

export const subscriptionActions = subscriptionSlice.actions;

export default subscriptionSlice.reducer;