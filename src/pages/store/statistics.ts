import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import clientService from '../helpers/client';
import { Api } from '../constants/api';
import { thunkAction } from '../helpers';

interface MessagedCreator {
  automation_name: string;
  content: string | null;
  creator_name: string;
  date: string;
}

interface MessagedCreatorsState {
  loading: boolean;
  rows: [];
  total: number;
  params: any;
  statsCountData: any;
  messagesChartData: any;
  repliesChartData: any;
  messagedCreators: MessagedCreator[];
  messagedCreatorsLoading: boolean;
  messagedCreatorsLoadCompleted: boolean;
  emailedCreators: any[];
  emailedCreatorsLoading: boolean;
  emailedCreatorsLoadCompleted: boolean;
}

const initialState: MessagedCreatorsState = {
  loading: false,
  rows: [],
  total: 0,
  params: {},
  statsCountData: {},
  messagesChartData: {},
  repliesChartData: {},
  messagedCreators: [],
  messagedCreatorsLoading: false,
  messagedCreatorsLoadCompleted: false,
  emailedCreators: [],
  emailedCreatorsLoading: false,
  emailedCreatorsLoadCompleted: false,
};

export const getMessagedCreators = createAsyncThunk(
  'assistant/getMessagedCreators',
  thunkAction((payload: any) => {
    return clientService.post(Api.statistics.messagedCreators, payload);
  }),
);

export const getEmailedCreators = createAsyncThunk(
  'statistics/getEmailedCreators',
  thunkAction((payload: any) => {
    return clientService.post(Api.statistics.getEmailedCreators, payload);
  }),
);

const getStatisticsAndCharts = createAsyncThunk(
  'statistics/getStatisticsAndCharts',
  async (payload, { dispatch }) => {
    try {
      // Dispatch all three async thunks concurrently
      const [statsResponse, messagesResponse, repliesResponse] = await Promise.all([
        dispatch(getStatistics(payload)),
        dispatch(getMessageChartData(payload)),
        dispatch(getRepliesChartData(payload)),
      ]);

      // Return the combined result
      return {
        stats: statsResponse.payload,
        messages: messagesResponse.payload,
        replies: repliesResponse.payload,
      };
    } catch (error) {
      throw error;
    }
  }
);

const StatisticsSlice = createSlice({
  name: 'Statistics',
  initialState,
  reducers: {
    resetMessagedCreators: (state) => {
      state.messagedCreators = {};
      state.messagedCreatorsLoadCompleted = false;
      state.messagedCreatorsLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStatisticsAndCharts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStatisticsAndCharts.fulfilled, (state, action) => {
      state.loading = false;
      const { stats, messages, replies } = action.payload;
      state.statsCountData = stats;
      state.messagesChartData = messages;
      state.repliesChartData = replies;
    });
    builder.addCase(getMessagedCreators.pending, (state) => {
      state.messagedCreatorsLoading = true;
    });
    builder.addCase(getMessagedCreators.fulfilled, (state, action) => {
      state.messagedCreatorsLoading = false;
      state.messagedCreatorsLoadCompleted = true;
      state.messagedCreators = action.payload;
    });
    builder.addCase(getMessagedCreators.rejected, (state) => {
      state.messagedCreatorsLoading = false;
    });
    builder.addCase(getEmailedCreators.pending, (state) => {
      state.emailedCreatorsLoading = true;
      state.emailedCreatorsLoadCompleted = false;
    });
    builder.addCase(getEmailedCreators.fulfilled, (state, action) => {
      state.emailedCreatorsLoading = false;
      state.emailedCreatorsLoadCompleted = true;
      state.emailedCreators = action.payload;
    });
    builder.addCase(getEmailedCreators.rejected, (state) => {
      state.emailedCreatorsLoading = false;
      state.emailedCreatorsLoadCompleted = true;
    });
    builder.addMatcher(isAnyOf(getStatisticsAndCharts.rejected), (state) => {
      state.loading = false;
    });
  },
});

export const getStatistics = createAsyncThunk(
  'statistics/getStatistics',
  async (payload) => {
    const response = await clientService.post(Api.statistics.stats, payload);
    return response.data;
  }
);

export const getMessageChartData = createAsyncThunk(
  'statistics/messages',
  async (payload) => {
    const response = await clientService.post(Api.statistics.messages, payload);
    return response.data;
  }
);

export const getRepliesChartData = createAsyncThunk(
  'statistics/replies',
  async (payload) => {
    const response = await clientService.post(Api.statistics.replies, payload);
    return response.data;
  }
);

export { getStatisticsAndCharts };
export default StatisticsSlice.reducer;
export const { resetMessagedCreators } = StatisticsSlice.actions;
