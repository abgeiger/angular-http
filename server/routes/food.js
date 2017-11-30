var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function(req, res) {
    pool.connect(function (err, db, done) {
        if (err) {
            //error connecting to database
            console.log('there was an error connecting: ', err);
            res.sendStatus(500);
        } else {
            //connected to database
            db.query('SELECT * FROM food;', function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});

router.post('/', function(req, res) {
    var newFood = req.body;
    pool.connect(function (err, db, done) {
        if (err) {
            //error connecting to database
            console.log('there was an error connecting: ', err);
            res.sendStatus(500);
        } else {
            //connected to database
            db.query(`INSERT INTO food (name, deliciousness_rating, is_hot)
                    VALUES ($1, $2, $3);`, [newFood.name, newFood.deliciousness_rating, newFood.is_hot], 
            function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

module.exports = router;