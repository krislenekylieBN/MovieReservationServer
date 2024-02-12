const express = require('express');
const router = express.Router();
const Reservation = require('../models/reserve.model');
const mongoose = require('mongoose');

router.post('/addReservation', async (req, res) => {
    console.log(req.body);
    try {
        const { mov_ID, airing_time, seat, discount, total_price, is_cancelled } = req.body;

        // Ensure correct data types
        const isValidObjectId = mongoose.Types.ObjectId.isValid(mov_ID);
        if (!isValidObjectId) {
            return res.status(400).json({ status: 'error', error: 'Invalid mov_ID' });
        }

        // Validate airing_time if needed

        // Validate seat data
        if (!Array.isArray(seat) || seat.some(item => typeof item !== 'object')) {
            return res.status(400).json({ status: 'error', error: 'Invalid seat data' });
        }

        const reservation = await Reservation.create({
            mov_ID: mongoose.Types.ObjectId(mov_ID),
            airing_time: mongoose.Types.ObjectId(airing_time), // Assuming airing_time is already a valid ObjectId
            seat,
            discount,
            total_price,
            is_cancelled
        });
        res.json({ status: 'ok', reservation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: err.message });
    }
});

module.exports = router;
