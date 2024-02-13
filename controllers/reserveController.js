const express = require('express');
const router = express.Router();
const Reservation = require('../models/reserve.model');
const mongoose = require('mongoose');
// const Movie = require('../models/movie.model');

// get all reservations
router.get('/get-all-reservations', async (req, res) => {
    try {
      const reservation = await Reservation.find({
            is_cancelled: false }).sort({ createdAt: -1 })
                                    .populate('mov_ID');
            res.send({
                success: true,
                message: "Reservation fetched successfully",
                data: reservation,
              });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

//get reserve
router.get('/get-seat/:id', async (req, res) => {
    console.log(req.body);
    try {
        const reservation = await Reservation.findById(req.params.id);
        res.send({
            success: true,
            message: "Reserve fetched successfully",
            data: reservation,
          });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: err.message });
    }
});

//filter specific movie seats
router.get('/get-specific-reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find({
            mov_ID: req.query.mov_ID,
            airing_time: req.query.airing_time
        }).select('seat');

        console.log("Reservations:", reservations); // Log the result

        if (reservations.length > 0) {
            res.send({
                success: true,
                message: "Seat value fetched successfully",
                data: reservations.map(reservation => reservation.seat)
            });
        } else {
            res.send({
                success: false,
                message: "No reservations found for the specified movie and airing time",
                data: []
            });
        }
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
  });


// update reservation
router.post('/update-reservation/:id', async (req, res) => {
    console.log(req.body);
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id,req.body);
        res.send({
            success: true,
            message: "Movie updated successfully",
          });
        } catch (error) {
          res.send({
            success: false,
            message: error.message,
          });
    }
});

//add Reservation 
router.post('/add-reservation', async (req, res) => {
    console.log(req.body);
    try {
        const { mov_ID, airing_time, seat, discount, total_price, is_cancelled } = req.body;

        const isValidObjectId = mongoose.Types.ObjectId.isValid(mov_ID);         // Ensure correct data types //F: pass the mov_ID(objectID)
        if (!isValidObjectId) {
            return res.status(400).json({ status: 'error', error: 'Invalid mov_ID' });
        }

        // Validate airing_time if needed
        //F: pass the airing_time (objectID)

        if (!Array.isArray(seat) || seat.some(item => typeof item !== 'object')) {         // Validate seat data    //F: if exists = not clickable color=red, else clickable color
            return res.status(400).json({ status: 'error', error: 'Invalid seat data' });
        }

        const reservation = await Reservation.create({
            mov_ID: new mongoose.Types.ObjectId(mov_ID),
            airing_time: new mongoose.Types.ObjectId(airing_time), // Assuming airing_time is already a valid ObjectId
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
