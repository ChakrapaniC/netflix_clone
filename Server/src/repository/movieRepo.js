const MovieModel = require('../model/MovieModel');

const getRandomMovies = async(req ,res) => {
    try{
        let data = await MovieModel.find({});
        let randomIndex = Math.floor(Math.random() * data.length);
        let randomMovie = data.at(randomIndex);
        res.status(200).send(randomMovie);

    }catch (err){
        throw err
    }
}

const getMovies = async(req, res) => {
    try{
        let data = await MovieModel.find({});
        res.status(200).send(data)
    }catch (err){
        throw err
    }
}
module.exports = {getRandomMovies, getMovies}