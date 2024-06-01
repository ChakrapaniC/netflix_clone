const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false // Make password optional for OAuth users
    },
    googleId: {
        type: String,
        required: false, // This field is for storing Google ID
        unique: true
    },
    favoriteIds: {
        type: [String],
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('UserModel', UserSchema, 'User');