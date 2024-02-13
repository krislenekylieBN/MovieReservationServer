const mongoose = require('mongoose');

const airingTimeSchema = new mongoose.Schema({
    start_time: Date,
    end_time: Date,
    is_premiere: Boolean,
});

const movieSchema = new mongoose.Schema({
    cin_ID: String,
    title: String,
    price: Number,
    image: String,
    airing_time: [airingTimeSchema] // Embedding airing time schema array
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
