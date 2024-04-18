const userModel = require('../model/UserModel');
const bcrypt = require('bcrypt');
const {generateToken, verifyToken} = require('../auth/userAuth');

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
module.exports = { registerUser, loginUser,verifyTokenMiddleware };