const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	color: {
		type: String,
		required: true,
	},
	repeatMode: {
		type: String,
		enum: ['daily', 'weekly', 'monthly'],
		default: 'daily',
		required: true,
	},
	reminder: {
		type: Boolean,
		default: false,
	},
	completed: {
		type: Object,
		default: {},
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
