import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import clientService from '../helpers/client';
import { Api } from '../constants/api';
import { thunkAction } from '../helpers';

const initialState = {
    statusLoading: false,
    statusData: [],
    statusLoadCompleted: false,
    updateActionPending: false,
    updateActionJson: {},
    startPending: false,
    messageSettings: {},
    messageSettingsLoading: false,
    messageSettingsLoadCompleted: false,
    messageSettingsUpdating: false,
    assistantHistoryLoading: false,
    assistantHistory: [],
    assistantHistoryLoadCompleted: false,
}

export const getAssistantStatus = createAsyncThunk(
    'assistant/getAssistantStatus',
    thunkAction((payload: any) => {
      return clientService.post(Api.assistant.getStatusTable, payload);
    }),
);

export const updateContentGuideSetting = createAsyncThunk(
    'assistant/updateContentGuideSetting',
    async (payload: FormData, { rejectWithValue }) => {
      try {
        const response = await clientService.post(Api.assistant.updateContentGuideSetting, payload, {
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

export const removeContentGuideSetting = createAsyncThunk(
    'assistant/removeContentGuideSetting',
    async (payload: FormData, { rejectWithValue }) => {
        try {
            const response = await clientService.post(Api.assistant.removeContentGuide, payload, {
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

export const updateAction = createAsyncThunk(
    'assistant/updateAction',
    thunkAction((payload: any) => {
      return clientService.post(Api.assistant.updateAction, payload);
    }),
);

export const startAssistant = createAsyncThunk(
    'assistant/startAssistant',
    thunkAction((payload: any) => {
      return clientService.post(Api.assistant.startAssistant, payload);
    }),
);

export const getMessageSettings = createAsyncThunk(
    'assistant/getMessageSettings',
    thunkAction((payload: any) => {
      return clientService.post(Api.assistant.getMessageSettings, payload);
    }),
);

export const updateMessageSettings = createAsyncThunk(
    'assistant/updateMessageSettings',
    thunkAction((payload: any) => {
      return clientService.post(Api.assistant.updateMessageSettings, payload);
    }),
);

export const getAssistantHistory = createAsyncThunk(
    'assistant/getAssistantHistory',
    thunkAction((payload: any) => {
      return clientService.post(Api.assistant.getAssistantHistory, payload);
    }),
);

const AssistantSlice = createSlice({
    name: 'assistant',
    initialState,
    reducers: {
        resetAssistantStatus(state) {
            state.statusData = [];
            state.statusLoadCompleted = false;
            return state;
        },
        resetAssistantTables(state){
            state.statusData = [];
            state.statusLoadCompleted = false;
            state.messageSettings = {};
            state.messageSettingsLoadCompleted = false;
            return state;
        },
        addToUpdateActionJson(state, action){ // action will be an object to add to updateActionJson
            state.updateActionJson = {...state.updateActionJson, ...action.payload};
            return state;
        },
        resetUpdateActionJson(state){
            state.updateActionJson = {};
            return state;
        },
        removeFromUpdateActionJson(state, action){ // action will be a key to remove from updateActionJson
            const {[action.payload]: _, ...newUpdateActionJson} = state.updateActionJson;
            state.updateActionJson = newUpdateActionJson;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAssistantStatus.pending, (state) => {
            state.statusLoading = true;
            return state;
        });
        builder.addCase(getAssistantStatus.fulfilled, (state, action) => {
            state.statusLoading = false;
            state.statusData = action.payload;
            state.statusLoadCompleted = true;
            return state;
        });
        builder.addCase(getAssistantStatus.rejected, (state) => {
            state.statusLoading = false;
            return state;
        });

        builder.addCase(getMessageSettings.pending, (state) => {
            state.messageSettingsLoading = true;
            return state;
        });
        builder.addCase(getMessageSettings.fulfilled, (state, action) => {
            state.messageSettingsLoading = false;
            state.messageSettings = action.payload;
            state.messageSettingsLoadCompleted = true;
            return state;
        });
        builder.addCase(getMessageSettings.rejected, (state) => {
            state.messageSettingsLoading = false;
            return state;
        });

        builder.addCase(updateContentGuideSetting.pending, (state) => {
            state.messageSettingsUpdating = true;
            return state;
        });
        builder.addCase(updateContentGuideSetting.fulfilled, (state) => {
            state.messageSettingsUpdating = false;
            state.messageSettingsLoadCompleted = false;
            return state;
        });
        builder.addCase(updateContentGuideSetting.rejected, (state) => {
            state.messageSettingsUpdating = false;
            return state;
        });

        builder.addCase(removeContentGuideSetting.pending, (state) => {
            state.messageSettingsUpdating = true;
            return state;
        });
        builder.addCase(removeContentGuideSetting.fulfilled, (state) => {
            state.messageSettingsUpdating = false;
            state.messageSettingsLoadCompleted = false;
            return state;
        });
        builder.addCase(removeContentGuideSetting.rejected, (state) => {
            state.messageSettingsUpdating = false;
            return state;
        });
        
        builder.addCase(updateMessageSettings.pending, (state) => {
            state.messageSettingsUpdating = true;
            return state;
        });
        builder.addCase(updateMessageSettings.fulfilled, (state) => { //Update the state after the message settings updated on backend
            state.messageSettingsUpdating = false;
            state.messageSettingsLoadCompleted = false;
            return state;
        });
        builder.addCase(updateMessageSettings.rejected, (state) => {
            state.messageSettingsUpdating = false;
            return state;
        });

        builder.addCase(startAssistant.pending, (state) => {
            state.startPending = true;
            return state;
        });
        builder.addCase(startAssistant.fulfilled, (state) => {
            state.startPending = false;
            state.statusLoadCompleted = false;
            return state;
        });
        builder.addCase(startAssistant.rejected, (state) => {
            state.startPending = false;
            return state;
        });

        builder.addCase(updateAction.pending, (state) => {
            state.updateActionPending = true;
            return state;
        });
        builder.addCase(updateAction.fulfilled, (state) => {
            state.updateActionPending = false;
            state.statusLoadCompleted = false;
            state.updateActionJson = {};
            return state;
        });
        builder.addCase(updateAction.rejected, (state) => {
            state.updateActionPending = false;
            return state;
        });

        builder.addCase(getAssistantHistory.pending, (state) => {
            state.assistantHistoryLoading = true;
            return state;
        });
        builder.addCase(getAssistantHistory.fulfilled, (state, action) => {
            state.assistantHistoryLoading = false;
            state.assistantHistory = action.payload;
            state.assistantHistoryLoadCompleted = true;
            return state;
        });
        builder.addCase(getAssistantHistory.rejected, (state) => {
            state.assistantHistoryLoading = false;
            return state;
        });
    }
});

export const { resetAssistantStatus, resetAssistantTables, addToUpdateActionJson, removeFromUpdateActionJson, resetUpdateActionJson } = AssistantSlice.actions;
export default AssistantSlice.reducer;