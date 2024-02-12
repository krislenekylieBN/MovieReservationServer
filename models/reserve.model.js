const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seatNumber: { type: String, required: true },
});

const reservationSchema = new mongoose.Schema({
    mov_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie', // Reference to the Movie model
        required: true
    },
    airing_time: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie.airing_time' // Reference to the airing_time subdocument within the Movie model
    },
    seat: [seatSchema],
    // reserved_seats: [{
    //     type: String,
    //     ref: 'Movie.airing_time.seats' // Reference to the seats subdocument within the airing_time subdocument in the Movie model
    // }],
    // reserved_by: String,
    discount: {
        senior_citizen: Boolean,
        pwd: Boolean
    },
    total_price: Number,
    is_cancelled: Boolean
});

// // Middleware to update reserved_seats in the Movie schema when a reservation is updated
// reservationSchema.post('findOneAndUpdate', async function(doc) {
//     const movie = await mongoose.model('Movie').findByIdAndUpdate(doc.mov_ID, { $set: { 'airing_time.$[elem].seats.$[elem2].is_available': false } }, { arrayFilters: [ { 'elem._id': doc.airing_time }, { 'elem2': { $in: doc.reserved_seats } } ] });
// });

const Reserve = mongoose.model('Reservation', reservationSchema);

module.exports = Reserve;
