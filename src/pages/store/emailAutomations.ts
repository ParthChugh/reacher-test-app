import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { thunkAction } from '../helpers';
import clientService from '../helpers/client';
import { Api } from '../constants/api';

const initialState = {
    loading: false,
    data: [],
}

export const getEmailAutomations = createAsyncThunk(
    'emailAutomations/getList',
    thunkAction((payload: any) => {
      return clientService.post(Api.emailAutomations.getList, payload);
    }),
);

export const deleteEmailAutomation = createAsyncThunk(
    'emailAutomations/delete',
    thunkAction((payload: any) => {
      return clientService.post(Api.emailAutomations.remove, payload);
    }),
);

export const createEmailAutomation = createAsyncThunk(
    'emailAutomations/create',
    thunkAction((payload: any) => {
      return clientService.post(Api.emailAutomations.create, payload, {
        headers: { 'Content-Type': 'application/json' }
      });
    }),
);
export const editEmailAutomation = createAsyncThunk(
    'emailAutomations/edit',
    thunkAction((payload: any) => {
      return clientService.post(Api.emailAutomations.edit, payload, {
        headers: { 'Content-Type': 'application/json' }
      });
    }),
);
export const stopEmailAutomation = createAsyncThunk(
    'emailAutomations/create',
    thunkAction((payload: any) => {
        return clientService.post(Api.emailAutomations.stop, payload, {
        headers: { 'Content-Type': 'application/json' }
        });
    }),
);
export const startEmailAutomation = createAsyncThunk(
    'emailAutomations/create',
    thunkAction((payload: any) => {
        return clientService.post(Api.emailAutomations.start, payload, {
        headers: { 'Content-Type': 'application/json' }
        });
    }),
);
const emailAutomationSlice = createSlice({
    name: 'emailAutomations',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getEmailAutomations.pending, (state) => {
            state.loading = true;
            return state;
        });
        builder.addCase(getEmailAutomations.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            return state;
        });
        builder.addCase(getEmailAutomations.rejected, (state) => {
            state.loading = false;
            return state;
        });

        builder.addCase(deleteEmailAutomation.pending, (state) => {
            state.loading = true;
            return state;
        });
        builder.addCase(deleteEmailAutomation.fulfilled, (state, action) => {
            state.loading = false;
            return state;
        });
        builder.addCase(deleteEmailAutomation.rejected, (state) => {
            state.loading = false;
            return state;
        });

        builder.addCase(createEmailAutomation.pending, (state) => {
            state.loading = true;
            return state;
        });
        builder.addCase(createEmailAutomation.fulfilled, (state, action) => {
            state.loading = false;
            return state;
        });
        builder.addCase(createEmailAutomation.rejected, (state) => {
            state.loading = false;
            return state;
        });

        builder.addCase(editEmailAutomation.pending, (state) => {
            state.loading = true;
            return state;
        });
        builder.addCase(editEmailAutomation.fulfilled, (state, action) => {
            state.loading = false;
            return state;
        });
        builder.addCase(editEmailAutomation.rejected, (state) => {
            state.loading = false;
            return state;
        });
    },
});

export default emailAutomationSlice.reducer;