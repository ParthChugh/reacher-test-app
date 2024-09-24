

import dayjs, { Dayjs } from 'dayjs';
import { toast } from "react-toastify";
import {
	DATE_TIME_FORMAT_WITHOUT_SECONDS,
} from '../constants';

export const formatDateTime = (
	date: Date | Dayjs,
	format = DATE_TIME_FORMAT_WITHOUT_SECONDS,
) => {
	return date ? dayjs(date).format(format) : null;
};

export const isJsonString = (str: string) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

export const setLocalStorage = (key: string, value: any) => {
	localStorage.setItem(
		key,
		typeof value === 'object' ? JSON.stringify(value) : value,
	);
};

export const getLocalStorage = (key: string) => {
	const value = localStorage.getItem(key);

	if (value && isJsonString(value)) {
		return JSON.parse(value);
	}

	return value;
};

export const removeLocalStorage = (key: string) => {
	localStorage.removeItem(key)
}

export const thunkAction = <T = undefined>(
	callback: (payload: T, config: any) => Promise<any>,
) => {
	return async (payload: T, config: any) => {
		try {
			const res = await callback(payload, config);
			return res?.data || res;
		} catch (error: any) {
			if (error?.response) {
				return config.rejectWithValue(error?.response?.data);
			}

			throw new Error(error?.message);
		}
	};
};

export const handleError = (error: any) => {
	console.log('error', error);
	if (error === undefined) {
	  return void toast.error("Error");
	}
	if (error.detail) {
	  return void toast.error(error.detail.replace(/^[0-9]+: /, ''));
	}
	
	if (error?.errors && error?.errors?.length > 0) {
	  return void toast.error(error?.errors[0]?.message);
	}
	
	return void toast.error(error?.error ? error?.error : "Error");
  };

export const handleWarning = (error: any) => {
	console.log('error', error);
	if (error === undefined) {
		return void toast.warning("Error");
	}
	if (error.detail) {
		return void toast.warning(error.detail.replace(/^[0-9]+: /, ''));
	}

	if (error?.errors && error?.errors?.length > 0) {
		return void toast.warning(error?.errors[0]?.message);
	}

	return void toast.warning(error?.error ? error?.error : "Error");
};

export const checkEmptyValue = (value: any): boolean => {
	return value === undefined || value === null;
};