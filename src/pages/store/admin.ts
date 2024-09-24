import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import clientService from '../helpers/client';
import { Api } from '../constants/api';

export type CustomerListInfo = {
	customer_id: number,
    email: string,
	name: string,
    stripe_customer_id: string,
}

interface ShopState {
    isAdmin: boolean;
    customersList: CustomerListInfo[];
    isLoading: boolean;
    customerListSuccess: boolean;
}

const initialState: ShopState = {
    isAdmin: false,
    customersList: [],
    isLoading: false,
    customerListSuccess: false,
};

export const getAllCustomers = createAsyncThunk(
    'customers/list',
    async (payload) => {
        const response = await clientService.post(Api.customer.getList, payload);
        return response.data;
    }
);

const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin(state, action) {
            state.isAdmin = action.payload;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCustomers.pending, (state, action) => {
            state.customersList = [];
            state.isLoading = true;
            return state;
        });
        builder.addCase(getAllCustomers.fulfilled, (state, action) => {
            state.customersList = action.payload;
            state.isLoading = false;
            state.customerListSuccess = true;
            return state;
        });
        builder.addMatcher(isAnyOf(getAllCustomers.rejected), (state, action) => {
            state.customersList = [];
            state.isLoading = false;
            return state;
        });
    }
});

export const { setAdmin } = AdminSlice.actions;
export default AdminSlice.reducer;

