const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/audioDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Create multer instance with storage options
const upload = multer({ storage: storage });

// Define schema for storing file details in MongoDB
const audioSchema = new mongoose.Schema({
    filename: String,
    path: String
});

const Audio = mongoose.model('Audio', audioSchema);

// Handle file upload
app.post('/upload', upload.single('audioFile'), (req, res) => {
    // Access uploaded file details
    const file = req.file;

    // Save file details to MongoDB
    const audio = new Audio({
        filename: file.originalname,
        path: file.path
    });

    audio.save()
        .then(() => console.log('File details saved to MongoDB'))
        .catch(err => console.error('Error saving file details', err));

    res.send('File uploaded successfully!');
});

// Serve uploaded audio files
app.get('/audio/:id', (req, res) => {
    const fileId = req.params.id;

    // Find the audio file by ID in MongoDB
    Audio.findById(fileId, (err, audio) => {
        if (err || !audio) {
            return res.status(404).send('Audio file not found');
        }

        // Serve the audio file
        res.sendFile(audio.path);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});