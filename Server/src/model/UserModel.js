const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true 
    },
    favoriteIds:{
        type:  [String],
        required: false
    }
},{timestamps: true});

module.exports = mongoose.model('UserModel', UserSchema, 'User')