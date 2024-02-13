const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.model');

router.get('/schedule/:id', async (req, res) => {
    console.log(req.body);
    try {
        const movie = await Movie.findById(req.params.id);
        res.send({
            success: true,
            message: "Movies fetched successfully",
            data: movie,
          });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: err.message });
    }
});

module.exports = router;