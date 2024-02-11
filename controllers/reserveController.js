const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation.model'); // Assuming Reservation schema is in a separate file

router.post('/addReservation', async (req, res) => {
    console.log(req.body);
    try {
        const reservation = await Reservation.create({
            mov_ID: req.body.mov_ID,
            airing_time: req.body.airing_time,
            reserved_seats: req.body.reserved_seats,
            reserved_by: req.body.reserved_by,
            discount: req.body.discount,
            total_price: req.body.total_price,
            is_cancelled: req.body.is_cancelled
        });
        res.json({ status: 'ok', reservation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: err.message });
    }
});

module.exports = router;
