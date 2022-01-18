// 1. Import required node modules and instance Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 2. Create a new mongoose schema
const rentalSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			unique: false,
		},
		item: {
			type: Schema.Types.ObjectId,
			required: true,
			unique: false,
		},
		rentalDate: {
			type: Schema.Types.Date,
			required: true,
			default: Date.now(),
			unique: false,
		},
		finalDate: {
			type: Schema.Types.Date,
			required: true,
			unique: false,
		},
		returnDate: {
			type: Schema.Types.Date,
			required: false,
			unique: false,
		},
		returned: {
			type: Schema.Types.Boolean,
			required: true,
			default: false,
		},
		penalty: {
			type: Schema.Types.Boolean,
			required: false,
		},
	},
	{ collection: 'rentals' }
);

// 3. Export the schema as model
module.exports = mongoose.model('Rental', rentalSchema);
