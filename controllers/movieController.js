// movieController.js

const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.model');

router.post('/addMovie', async (req, res) => {
    console.log(req.body);
    try {
        const movie = await Movie.create({
            mov_ID: req.body.mov_ID,
            cin_ID: req.body.cin_ID,
            title: req.body.title,
            desc: req.body.desc,
            price: req.body.price,
            airing_time: req.body.airing_time,
        });
        res.json({ status: 'ok', movie });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: err.message });
    }
});

module.exports = router;
