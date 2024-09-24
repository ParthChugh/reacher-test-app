import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import clientService from '../helpers/client';
import { Api } from '../constants/api';

interface Subscriptions {
    renewal_dates : string[];
    loadCompleted: boolean;
}

const initialState: Subscriptions = {
    renewal_dates: [],
    loadCompleted: false,
};

export const getRenevalDates = createAsyncThunk(
    'subscriptions/getSubscriptions',
    async (payload) => {
        const response = await clientService.post(Api.stripePayment.getRenevalDates, payload);
        return response.data;
    }
);

const subscriptionsSlice = createSlice({
    name: 'subscriptions',
    initialState,
    reducers: {
        clearSubscriptions: (state) => {
            state.renewal_dates = [];
            state.loadCompleted = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRenevalDates.pending, (state) => {
                state.loadCompleted = false;
            })
            .addCase(getRenevalDates.fulfilled, (state, action) => {
                state.renewal_dates = action.payload;
                state.loadCompleted = true;
            })
            .addCase(getRenevalDates.rejected, (state) => {
                state.loadCompleted = false;
            });
    },
});

export const { clearSubscriptions } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;

