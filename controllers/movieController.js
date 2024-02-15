const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.model');

//get all movies 
router.get("/get-all-movies", async (req, res) => {
  try {
    const selectedDate = req.query.date;
    console.log('Selected Date:', selectedDate); // Log selected date

    let query = {};

    if (selectedDate) {
      // Convert selected date to UTC
      const startDate = new Date(selectedDate);
      startDate.setUTCHours(0, 0, 0, 0);

      // Query for movies where at least one airing time has the exact start date
      query = {
        "airing_time.start_time": startDate
      };
    }
    console.log('Query:', query); // Log query

    const movies = await Movie.find(query);

    res.send({
      success: true,
      message: "Movies fetched successfully",
      data: movies,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//addMovie
router.post('/addMovie', async (req, res) => {
    console.log(req.body);
    try {
        const movie = await Movie.create({
            mov_ID: req.body.mov_ID,
            cin_ID: req.body.cin_ID,
            title: req.body.title,
            // desc: req.body.desc,
            price: req.body.price,
            airing_time: req.body.airing_time,
            image: req.body.image,
        });
        res.json({ status: 'ok', movie });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: err.message });
    }
});

module.exports = router;
