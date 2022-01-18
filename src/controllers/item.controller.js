// 1. Import item mongoose model and Helper
const Item = require('../models/item.model');
const Helper = require('../helper');

// 2. Create empty obj for item controller methods
const itemController = {};

// 2.1. Controller to create a new item
itemController.Create = async (req, res) => {
	// Get name from body
	const { name } = req.body;
	// Verify that name has the correct length
	if (Helper.VerifyString(name, 2, 32)) {
		return res.status(404).json({ message: 'Firstname is not valid', min: 2, max: 32 });
	}
	try {
		// Try to find item with body name in database
		let item = await Item.findOne({ name });
		// If item is found in database
		if (item) {
			return res.status(404).json({
				message: 'Error at creating new item',
				error: 'Cannot created a duplicated item',
			});
		}
		// If item is not found in database, creates a new item and saves it to database
		item = new Item({ name });
		await item.save();
		// Print message and return success message
		console.log('New item created successfully', name);
		return res.status(200).json({ message: 'New item created successfully', name });
	} catch (err) {
		// Prints error message and returns json with message and error
		console.log('Error at creating new user', err.message);
		return res.status(500).json({ message: 'Error at creating new item', error: err.message });
	}
};

// 3. Export item controller
module.exports = itemController;
