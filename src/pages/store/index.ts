'use client';

import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import auth from './auth';
import customer from './customer';
import automation from './automation';
import statistics from './statistics';
import shops from './shops';
import admin from './admin';
import assistant from './assistant';
import subscriptions from './subscriptions';
import emailAutomations from './emailAutomations';

const combinedReducer = combineReducers({
	auth,
	customer,
	automation,
	statistics,
	shops,
	admin,
	assistant,
	subscriptions,
	emailAutomations,
});

const rootReducer = (state: any, action: any) => {
	if (action.type === 'auth/logout') {
		state = {};
	}
	return combinedReducer(state, action);
};

export function makeStore() {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	});
}

const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>;

export default store;
