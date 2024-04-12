const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/carpoolingDB')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });

// Define a schema for the ride data
const rideSchema = new mongoose.Schema({
    origin: String,
    destination: String,
    date: Date,
    time: String
});

// Create a Mongoose model based on the schema
const Ride = mongoose.model('Ride', rideSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle adding a ride
app.post('/add-ride', (req, res) => {
    const { origin, destination, date, time } = req.body;

    // Create a new ride instance
    const newRide = new Ride({
        origin,
        destination,
        date,
        time
    });

    // Save the ride to the database
    newRide.save()
        .then(savedRide => {
            console.log('Ride saved successfully:', savedRide);
            res.status(201).json(savedRide);
        })
        .catch(err => {
            console.error('Error saving ride:', err.message);
            res.status(500).json({ error: 'Failed to save ride' });
        });
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route handler for the root URL
app.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public', 'test.html'));
    } catch (error) {
        console.error('Error sending file:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});