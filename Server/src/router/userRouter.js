const express = require('express');
const { registerUser, loginUser, verifyTokenMiddleware, getUser, toggleFavorite } = require('../repository/userRepo');
const { getRandomMovies, getMovies, getSingleMovie } = require('../repository/movieRepo');
const passport = require('passport');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', passport.authenticate('local'), loginUser);
router.get('/userProfile', verifyTokenMiddleware, getUser);

router.get('/randomMovies', getRandomMovies);
router.get('/movies', getMovies);
router.get('/singleMovie/:id', getSingleMovie);
router.post('/favoriteMovies/:_id', toggleFavorite);
router.delete('/favoriteMovies/:_id', toggleFavorite);

// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('http://127.0.0.1:5173/profile'); // Redirect to your frontend route on successful login
});

module.exports = router;