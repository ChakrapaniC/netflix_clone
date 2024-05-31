const userModel = require('../model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken, verifyToken} = require('../auth/userAuth');
const SECRET_KEY = process.env.JWT_SECRET_KEY

const registerUser = async (req, res) => {
    console.log(req.body)
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            throw { status: 409, message: "User with this specific email already exists" }
        } else {
            const newUser = new userModel({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 12)
            });

            newUser.save();
            res.status(200).send({message:"user register successfylly"})
        }
    } catch (err) {
        // return res.status(500).json({ message: "Internal server error" });
        throw(err)
    }

}

const loginUser = async (req, res) => {
    try {
        if (!req.session.passport) {
            throw { status: 401, message: "Unauthorized" };
        }

        const userId = req.session.passport;
        if (!userId) {
            throw { status: 500, message: "Token generation failed" };
        }

        // GenerateToken needs to be implemented and return a valid token
        const token = generateToken(userId);
        if (!token) {
            throw { status: 500, message: "Token generation failed" };
        }
        res.status(200).send({message:"login successfully", token: token})

    } catch (error) {
        throw error;
    }
}

const verifyTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    const verificationResult = verifyToken(token);

    if (verificationResult.success) {
        req.user = verificationResult.decoded; // Attach decoded token to the request object
        next();
    } else {
        res.status(401).json({ status: 401, message: verificationResult.message });
    }
}

const getUser = async (req , res) =>{
    console.log("url hit")
    try{
        const token =  jwt.verify(req.headers.authorization , SECRET_KEY);
        console.log(req.headers.authorization);
        if(token){
          let user =   await userModel.findById(token.user);
          if(user){
             console.log(user);
             res.status(200).send(user);
          }
        }
    }catch (error){
        throw error
    }
}

const toggleFavorite = async (req, res) => {
    // Verify token and get user ID
    try {
        
        const token = jwt.verify(req.headers.authorization, SECRET_KEY);
        const userId = token.user;
    
        let user = await userModel.findById(userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const movieId = req.params._id;
        
        //for adding movie in favorite
        if (req.method === 'POST') {
            console.log("adding favorite")
            if (!user.favoriteIds.includes(movieId)) {
                user.favoriteIds.push(movieId);
                await user.save();
                return res.status(200).json({ message: "Movie added to favorites", user: user });
            } else {
                return res.status(400).json({ message: "Movie already in favorites" });
            }
        } 

        //for remove movie from favorite
        else if (req.method === 'DELETE') {
            console.log("removing favorite")
            const index = user.favoriteIds.indexOf(movieId);
            if (index > -1) {
                user.favoriteIds.splice(index, 1);
                await user.save();
                return res.status(200).json({ message: "Movie removed from favorites", user: user });
            } else {
                return res.status(400).json({ message: "Movie not found in favorites" });
            }
        } else {
            return res.status(405).json({ message: "Method not allowed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = { registerUser, loginUser,verifyTokenMiddleware , getUser , toggleFavorite };