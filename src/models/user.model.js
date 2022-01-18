// 1. Import required node modules and instance Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 2. Create a new mongoose schema
const userSchema = new Schema(
	{
		role: {
			type: Schema.Types.String,
			required: true,
			default: 'student',
		},
		firstname: {
			type: Schema.Types.String,
			required: true,
			minlength: 2,
			maxlength: 32,
		},
		lastname: {
			type: Schema.Types.String,
			required: true,
			minlength: 2,
			maxlength: 32,
		},
	},
	{ collection: 'users' }
);

// 3. Export the schema as model
module.exports = mongoose.model('User', userSchema);
