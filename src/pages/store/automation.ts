import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { thunkAction } from '../helpers';
import clientService from '../helpers/client';
import { Api } from '../constants/api';
import { DEFAULT_LIMIT, DEFAULT_PAGE_INDEX } from '../constants';

const initialState = {
  loading: false,
  data: [],
  total: 0,
  page: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_LIMIT,
  params: {
    page: DEFAULT_PAGE_INDEX,
    pageSize: 20,
    orderBy: '',
  },
};

const AutomationSlice = createSlice({
  name: 'automation',
  initialState,
  reducers: {
    filterAutomation(state, action) {
      state.params = action.payload.data;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAutomations.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.page = action.payload.page;
      state.total = action.payload.total;
      state.pageSize = action.payload.pageSize;

      return state;
    });

    builder.addMatcher(
      isAnyOf(startAutomation.fulfilled,
        stopAutomation.fulfilled), (state) => {
          state.loading = false;

          return state;
        });

    builder.addMatcher(
      isAnyOf(postAddAutomation.fulfilled,
        deleteAutomation.fulfilled), (state) => {
          state.loading = false;

          return state;
        });
    
    builder.addMatcher(
      isAnyOf(updateAutomation.fulfilled), (state) => {
        state.loading = false;

        return state;
      });

    builder.addMatcher(
      isAnyOf(getAutomations.pending,
        postAddAutomation.pending,
        deleteAutomation.pending,
        updateAutomation.pending), (state, action) => {
          state.loading = true;

          return state;
        });

    builder.addMatcher(
      isAnyOf(startAutomation.pending,
        stopAutomation.pending), (state, action) => {
          state.loading = true;

          return state;
        });

    builder.addMatcher(
      isAnyOf(getAutomations.rejected,
        postAddAutomation.rejected,
        startAutomation.rejected,
        stopAutomation.rejected,
        deleteAutomation.rejected,
        updateAutomation.rejected), (state, action) => {
          state.loading = false;

          return state;
        });
  },
});

export const getAutomations = createAsyncThunk(
  'automation/getAutomations',
  thunkAction((payload: any) => {
    return clientService.post(Api.automations.getList, payload);
  }),
);

export const postAddAutomation = createAsyncThunk(
  'automation/postAddAutomation',
  async (payload: FormData, {rejectWithValue} ) => {
    try {
      const response = await clientService.post(Api.automations.create, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const startAutomation = createAsyncThunk(
  'automation/startAutomation',
  thunkAction((payload: any) => {
    return Promise.all([
      clientService.post(Api.automations.start, payload),
      clientService.post(Api.automations.followupStart, payload),
      clientService.post(Api.automations.repliesStart, payload),
    ]);
  }),
);
export const stopAutomation = createAsyncThunk(
  'automation/stopAutomation',
  thunkAction((payload: any) => {
    return clientService.post(Api.automations.stop, payload);
  }),
);

export const deleteAutomation = createAsyncThunk(
  'automation/deleteAutomation',
  thunkAction((payload: any) => {
    return clientService.post(Api.automations.remove, payload);
  }),
);

export const updateAutomation = createAsyncThunk(
  'automation/updateAutomation',
  thunkAction((payload: any) => {
    return clientService.post(Api.automations.update, payload);
  }),
);

export const { filterAutomation } = AutomationSlice.actions;
export default AutomationSlice.reducer;