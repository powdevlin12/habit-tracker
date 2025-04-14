const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Habit = require('./models/habit');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(
	bodyParser.urlencoded({
		extends: true,
	}),
); // Parse JSON request bodies
app.use(bodyParser.json()); // Parse JSON request bodies

// MongoDB Connection
const mongoURI =
	'mongodb+srv://thudatdl123:thudatvanvosongtoan@cluster0.s9ypdsa.mongodb.net/habit-tracker?retryWrites=true&w=majority&appName=Cluster0';

mongoose
	.connect(mongoURI)
	.then(() => console.log('MongoDB connected successfully'))
	.catch(err => console.error('MongoDB connection error:', err));

// Sample data (replace with database logic later if needed)
// TODO: Define Mongoose Schema and Model for Habits
const habits = [
	{ id: 1, name: 'Read book' },
	{ id: 2, name: 'Exercise' },
	{ id: 3, name: 'Meditate' },
];

// Define the GET /habits route
app.get('/habits', async (req, res) => {
	// Mark as async for potential DB operations
	console.log('Received GET request for /habits');
	try {
		// TODO: Replace with actual database query using the Habit model
		// const fetchedHabits = await Habit.find();
		// res.json(fetchedHabits);
		res.json(habits); // Send the sample habits data for now
	} catch (error) {
		console.error('Error fetching habits:', error);
		return res.status(500).json({ message: 'Error fetching habits' });
	}
});

// create habit
app.post('/habits', async (req, res) => {
	try {
		const { title, color, repeatMode, reminder } = req.body;

		const newHabit = new Habit({
			title,
			color,
			repeatMode,
			reminder,
		});

		const savedHabit = await newHabit.save();

		console.log('New habit created:', savedHabit);

		return res.status(201).json(savedHabit);
	} catch (error) {
		console.log('🚀 ~ app.post ~ error:', error);
		return res.status(401).json({ message: 'Error creating habit' });
	}
});

// Start the server
app.listen(port, () => {
	console.log(`API server listening at http://localhost:${port}`);
});
