const express = require('express');
const { registerUser, loginUser, verifyTokenMiddleware, getUser } = require('../repository/userRepo');
const {getRandomMovies, getMovies, getSingleMovie} = require('../repository/movieRepo');
const router = express.Router();
const passport  = require('passport');

router.post('/register', registerUser);
router.post('/login',passport.authenticate('local'), loginUser);
router.get('/userProfile', verifyTokenMiddleware, getUser)

router.get('/randomMovies', getRandomMovies);
router.get('/movies',getMovies);
router.get('/singleMovie/:id', getSingleMovie);

module.exports = router