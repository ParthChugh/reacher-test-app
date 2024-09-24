import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { thunkAction } from '../helpers';
import clientService from '../helpers/client';
import { Api } from '../constants/api';
import { CustomerBasicInfo } from '../models/customer';
import { DEFAULT_LIMIT, DEFAULT_PAGE_INDEX } from '../constants';

interface CustomerListModel {
	data: CustomerBasicInfo[],
	page: number,
	total: number,
	pageSize: number,
	params: {},
}

const initialState = {
	loading: false,

	customers: {
		data: [],
		total: 0,
		page: DEFAULT_PAGE_INDEX,
		pageSize: DEFAULT_LIMIT,
		params: {
			page: DEFAULT_PAGE_INDEX,
			pageSize: DEFAULT_LIMIT,
		},
	} as CustomerListModel,

	customerBasicInfo: {} as CustomerBasicInfo,

	customersSearch: {
		data: [],
		total: 0,
		page: DEFAULT_PAGE_INDEX,
		pageSize: DEFAULT_LIMIT,
		params: {
			page: DEFAULT_PAGE_INDEX,
			pageSize: DEFAULT_LIMIT,
		},
	} as CustomerListModel,

	customerShops: {
		loading: false,
		data: [],
		total: 0,
		page: DEFAULT_PAGE_INDEX,
		pageSize: DEFAULT_LIMIT,
	},
};

const CustomerSlice = createSlice({
	name: 'customer',
	initialState,
	reducers: {
		setCustomersQueryParams(state, action) {
			state.customers.params = { ...state.customers.params, ...action.payload };
			return state;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCustomers.fulfilled, (state, action) => {
			state.loading = false;
			state.customers = action.payload;

			return state;
		});

		builder.addCase(getCustomerBasicInfo.fulfilled, (state, action) => {
			state.loading = false;
			state.customerBasicInfo = action.payload.data;

			return state;
		});

		// builder.addCase(getCustomerShops.fulfilled, (state, action) => {
		//   state.customerShops.loading = false;
		//   state.customerShops.data = action.payload.data;
		//   state.customerShops.total = action.payload.total;
		//   state.customerShops.page = action.payload.page;
		//   state.customerShops.pageSize = action.payload.pageSize;
		//   return state;
		// });
		// builder.addCase(getCustomerShops.pending, (state) => {
		//   state.customerShops.loading = true;

		//   return state;
		// });
		// builder.addCase(getCustomerShops.rejected, (state) => {
		//   state.customerShops.loading = false;
		//   return state;
		// });

		builder.addMatcher(isAnyOf(
			postRegisterCustomer.fulfilled,
			putEditCustomerBasicInfo.fulfilled,
		), (state) => {
			state.loading = false;

			return state;
		});

		builder.addMatcher(isAnyOf(
			getCustomers.pending,
			getCustomerBasicInfo.pending,
			postRegisterCustomer.pending,
			putEditCustomerBasicInfo.pending,
		), (state) => {
			state.loading = true;

			return state;
		});

		builder.addMatcher(isAnyOf(
			getCustomers.rejected,
			getCustomerBasicInfo.rejected,
			postRegisterCustomer.rejected,
			putEditCustomerBasicInfo.rejected,
		), (state) => {
			state.loading = false;

			return state;
		});
	},
});

export const getCustomers = createAsyncThunk(
	'customer/getCustomers',
	thunkAction((params: any) => {
		return clientService.get(Api.customer.getList, { params });
	}),
);

export const postRegisterCustomer = createAsyncThunk(
	'customer/registerCustomer',
	thunkAction((payload: any) => {
		return clientService.post(Api.customer.register, payload);
	}),
);

export const putEditCustomerBasicInfo = createAsyncThunk(
	'customer/putCustomerBasicInfo',
	thunkAction((payload: any) => {
		return clientService.put(Api.customer.editBasicInfo, payload);
	}),
);

export const getCustomerBasicInfo = createAsyncThunk(
	'customer/getCustomerBasicInfo',
	thunkAction(() => {
		return clientService.get(Api.customer.basicInfo);
	}),
);

// export const getCustomerShops = createAsyncThunk(
//   'shops/getCustomerShops', thunkAction(async (payload: any) => {
//     return await clientService.get(Api.customer.management.customerShops, {
//       params: payload,
//     });
//   }),
// );

export const { setCustomersQueryParams } = CustomerSlice.actions;
export default CustomerSlice.reducer;
