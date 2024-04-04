const express = require('express');
const { registerUser, loginUser } = require('../repository/userRepo');
const router = express.Router();
const passport  = require('passport');

router.post('/register', registerUser);
router.post('/login',passport.authenticate('local'), loginUser)

module.exports = router