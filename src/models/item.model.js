// 1. Import required node modules and instance Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 2. Create a new mongoose schema
const itemSchema = new Schema(
	{
		name: {
			type: Schema.Types.String,
			required: true,
			minlength: 2,
			maxlength: 32,
			index: { unique: true },
		},
		penalty: {
			type: Schema.Types.Decimal128,
			required: true,
			default: 5.0,
			min: 0.0,
			max: 10.0,
		},
	},
	{ collection: 'items' }
);

// 3. Export the schema as model
module.exports = mongoose.model('Item', itemSchema);
