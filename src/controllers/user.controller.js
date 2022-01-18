// 1. Import user mongoose model and Helper
const User = require('../models/user.model');
const Helper = require('../helper');

// 2. Create empty obj for user controller methods
const userController = {};

// 2.1. Controller to create a new user
userController.Create = async (req, res) => {
	// Get firstname and lastname from body
	const { firstname, lastname } = req.body;
    // Verify that firstname has the correct length
	if (Helper.VerifyString(firstname, 2, 32)) {
		return res.status(404).json({ message: 'Firstname is not valid', min: 2, max: 32 });
	}
    // Verify that lastname has the correct length
    if (Helper.VerifyString(firstname, 2, 32)) {
		return res.status(404).json({ message: 'Lastname is not valid', min: 2, max: 32 });
	}
	try {
		// Creates a new user and saves it to database
		const user = new User({
			firstname,
			lastname,
		});
		await user.save();
		// Print message and return success message
		console.log('New user created successfully', firstname, lastname);
		return res.status(200).json({
			message: 'New user created successfully',
			fullname: firstname + ' ' + lastname,
		});
	} catch (err) {
		// Prints error message and returns json with message and error
		console.log('Error at creating new user', err.message);
		return res.status(500).json({ message: 'Error at creating new user', error: err.message });
	}
};

// 3. Export user controller
module.exports = userController;