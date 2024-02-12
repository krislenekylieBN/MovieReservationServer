const mongoose = require('mongoose');

// const seatSchema = new mongoose.Schema({
//     seat_number: String,
//     is_available: Boolean
// });

const airingTimeSchema = new mongoose.Schema({
    start_time: Date,
    end_time: Date,
    is_premiere: Boolean,
    // seats: [seatSchema] // Embedding seat schema array
});

const movieSchema = new mongoose.Schema({
    // mov_ID: String,
    cin_ID: String,
    title: String,
    // desc: String,
    price: Number,
    image: String,
    airing_time: [airingTimeSchema] // Embedding airing time schema array
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
