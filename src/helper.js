// 1. Create empty obj for Helper methods
const Helper = {};

// 1.1. Helper to verify the length of a string
Helper.VerifyString = (string, min, max) => {
	// Return boolean depending if string matches condition
	return string.length < min || string.length > max;
};

// 1.2. Helper to verify date format (dd-mm-yyyy)
Helper.VerifyDateFormat = (string) => {
	// Splits date string and parse it to Int
	const day = parseInt(string.split('-')[0]);
	const month = parseInt(string.split('-')[1]);
	const year = parseInt(string.split('-')[2]);
	// If day, month or year is not a number
	if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
	// If day or month are out of range
	if (day < 1 || day > 31 || month < 1 || month > 12) return false;
	// If the year is less than current year and more than 10 years ahead
	if (year < 2022 || year > 2030) return false;
	// If none of the conditions above meet, return true
	return true;
};

// 1.3. Helper to format date to database format
Helper.ToDateFormat = (string) => {
	// Splits date string and parse it to Int
	const day = parseInt(string.split('-')[0]);
	const month = parseInt(string.split('-')[1]);
	const year = parseInt(string.split('-')[2]);
	// Creates a new date
	const date = new Date(year, month-1, day);
	// Returns new date
	return date;
};

// 2. Exports Helper
module.exports = Helper;
