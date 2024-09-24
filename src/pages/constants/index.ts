export const HOUR_TIME_FORMAT = 'HH:mm';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const YEAR_MONTH_FORMAT = 'YYYY/MM';
export const DATE_FORMAT_WITH_STROKE = 'YYYY/MM/DD';
export const DATE_FORMAT_BRIEF_WITH_STROKE = 'YY/MM/DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_TIME_FORMAT_WITHOUT_SECONDS = 'YYYY-MM-DD HH:mm';
export const DATE_TIME_FORMAT_WITHOUT_TIME = 'YYYY-MM-DD 00:00:00';

export const DEFAULT_LIMIT = 10;

export const DEFAULT_PAGE_INDEX = 1;

export const LOCAL_STORAGE_KEY = {
	ACCESS_TOKEN: 'ACCESS_TOKEN',
	REFRESH_TOKEN: 'REFRESH_TOKEN',
	USERNAME: 'USERNAME',
};

// Regex for password at least 8 characters and has at least 1 character and 1 numeric.
export const PASSWORD_REGEX_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;