const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: false
    },
    password: {
        type: String,
        required: false // Make password optional for OAuth users
    },
    accountId: {
        type: String,
    },
    favoriteIds: {
        type: [String],
        required: false
    }
}, { timestamps: true });

// UserSchema.index({ googleId: 1 }, { unique: true, sparse: true });
// UserSchema.index({ email: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('UserModel', UserSchema, 'User');