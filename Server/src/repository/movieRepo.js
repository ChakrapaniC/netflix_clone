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

const getSingleMovie = async(req, res) => {
    try{
        let id = req.params.id;
        console.log(id)
        if(typeof id !== 'string'){
            throw new Error('Invalid Id');
        }

        if(!id){
            throw new Error('Invalid Id');
        }

        let movie = await MovieModel.findOne({_id:id});
        if(!movie){
            throw new Error('Invalid Id');
        }

        res.status(200).json(movie);
    }
    catch (error) {
        console.log(error);
        res.status(400).end()
    }
}
module.exports = {getRandomMovies, getMovies, getSingleMovie}