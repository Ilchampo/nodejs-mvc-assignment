// 1. Import required node modules
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// 2. Configures dotenv path
dotenv.config({ path: path.resolve(__dirname, './.env') });

// 3. Creates method to connect to database
const database = async () => {
	try {
		// Creates new mongoose connection to database
		await mongoose.connect(process.env.URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		// Sends message to console
		console.log('connected to database');
	} catch (err) {
		// If there is an error connecting
		console.error(err.message);
		process.exit(1);
	}
};

// 4. Exports database method
module.exports = database;