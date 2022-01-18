// 1. Import item, rental and user mongoose model
const Item = require('../models/item.model');
const Rental = require('../models/rental.model');
const User = require('../models/user.model');
const Helper = require('../helper');

// 2. Create empty obj for rental controller methods
const rentalController = {};

// 2.1. Controller to create a new rental
rentalController.Create = async (req, res) => {
	// Get user and item id from params
	const { user, item } = req.params;
	// If the params are not found
	if (!user || !item) {
		// Return error message
		return res
			.status(404)
			.json({ message: 'Error at creating new rental', error: 'Params are required' });
	}
	// Get finalDate from body
	const { finalDate } = req.body;
	// Verify that final date has the correct format (dd-mm-yyyy)
	if (!Helper.VerifyDateFormat(finalDate)) {
		return res.status(404).json({ message: 'Final Date is not valid' });
	}
	try {
		// Try to find user and item in database
		let userDb = await User.findById(user);
		let itemDb = await Item.findById(item);
		// If there is no user found in database
		if (!userDb) {
			// Return error
			return res.status(404).json({
				message: 'Error at creating new rental',
				error: 'User not found in database',
			});
		}
		// If there is no item found in database
		if (!itemDb) {
			// Return error
			return res.status(404).json({
				message: 'Error at creating new rental',
				error: 'Item not found in database',
			});
		}
		// Create new rental and saves it to database
		const rental = new Rental({
			user,
			item,
			finalDate: Helper.ToDateFormat(finalDate),
		});
		await rental.save();
		// Print message and return success message
		console.log('Rental created successfully');
		return res.status(200).json({ message: 'Rental created successfully' });
	} catch (err) {
		// Prints error message and returns json with message and error
		console.log('Error at creating new rental', err.message);
		return res
			.status(500)
			.json({ message: 'Error at creating new rental', error: err.message });
	}
};

// 2.2. Controller to calculate how much penalty fee is during date range
rentalController.Calculate = async (req, res) => {
	// Get startDate and endDate from body
	let { startDate, endDate } = req.body;
	// Verify that startDate and endDate has the correct format (dd-mm-yyyy)
	if (!Helper.VerifyDateFormat(startDate) || !Helper.VerifyDateFormat(endDate)) {
		return res.status(404).json({ message: 'The date range is not valid' });
	}
	// Transform string to date type
	startDate = Helper.ToDateFormat(startDate);
	endDate = Helper.ToDateFormat(endDate);
	try {
		// Try to find rentals that have fees and meet the condition that
		// 1- Have a penalty
		// 2- RentalDate is less than endDate
		// 3- FinalDate is less than endDate
		// 4- ReturnDate is greater than startDate
		const rentals = await Rental.find({
			penalty: true,
			rentalDate: { $lt: endDate },
			finalDate: { $lt: endDate },
			returnDate: { $gt: startDate },
		});
		// If no rentals are found
		if (!rentals) {
			// Return message
			return res.status(200).json({
				message: 'There are no rentals fees in that date range',
				startDate,
				endDate,
			});
		}
		// Create variable to count total penalty value
		let penaltyValue = 0;
		// Iterates through all the rentals
		for (let i = 0; i < rentals.length; i++) {
			// Finds the item of the current rental
			let item = await Item.findById(rentals[i].item);
			// This conditionals ensure that the dates are in range of the defined dates by the user
			// If the finalDate of the rental is less thatn startDate, finalDate is startDate
			if (rentals[i].finalDate < startDate) rentals[i].finalDate = startDate;
			// If the returnDate of the rental is less thatn endDate, fireturnDatealDate is endDate
			if (rentals[i].returnDate > endDate) rentals[i].returnDate = endDate;
			// Adds to penaltyValue the result of (delayed days * penalty fee) and rounds it as days cant be decimals
			penaltyValue +=
				Math.round((rentals[i].returnDate - rentals[i].finalDate) / (1000 * 3600 * 24)) *
				item.penalty;
		}
		// Creates response object
		const response = {
			message: 'The total penalty fee is',
			total: penaltyValue,
		};
		// Returns success message and values
		return res.status(200).render('calculate', {
			response,
		});
	} catch (err) {
		// Prints error message and returns json with message and error
		console.log('Error at calculating rental penalty fee', err.message);
		return res
			.status(500)
			.json({ message: 'Error at calculating rental penalty fee', error: err.message });
	}
};

// 2.3. Controller to get all the rentals
rentalController.Get = async () => {
	try {
		// Gets all the rentals from database
		let rentals = await Rental.find().sort({ $natural: -1 });
		if (!rentals) {
			// If there is no rentals in database
			return res.status(404).json({ message: 'There is no rentals available' });
		}
		// Creates empty array to store formated data
		let result = [];
		// Iterates through all the rentals
		for (let i = 0; i < rentals.length; i++) {
			// Looks for item and user depending on ID in rental
			let item = await Item.findById(rentals[i].item);
			let user = await User.findById(rentals[i].user);
			// Push formatted values to result array
			result.push({
				user: user.firstname + ' ' + user.lastname,
				item: item.name,
				rentalDate:
					rentals[i].rentalDate.getDate() +
					1 +
					'-' +
					(rentals[i].rentalDate.getMonth() + 1) +
					'-' +
					rentals[i].rentalDate.getFullYear(),
				finalDate:
					rentals[i].finalDate.getDate() +
					1 +
					'-' +
					(rentals[i].finalDate.getMonth() + 1) +
					'-' +
					rentals[i].finalDate.getFullYear(),
				returnDate:
					rentals[i].returnDate.getDate() +
					1 +
					'-' +
					(rentals[i].returnDate.getMonth() + 1) +
					'-' +
					rentals[i].returnDate.getFullYear(),
				penalty: rentals[i].penalty,
			});
		}
		return result;
	} catch (err) {
		// Prints error message and returns json with message and error
		console.log('Error at getting rentals', err.message);
		return res.status(500).json({ message: 'Error at getting rentals', error: err.message });
	}
};

// 3. Export rental controller
module.exports = rentalController;
