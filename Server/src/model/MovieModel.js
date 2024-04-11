const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const MovieSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    videoUrl:{
        type: String,
        require: true
    },
    thumbnailUrl:{
        type: String,
        require: true

    },
    genre: {
        type: String,
        require: true
    },
    duration:{
        type: String,
        require: true
    }
},{timeStamps: true});

module.exports = mongoose.model('MovieModel', MovieSchema, 'Movies')