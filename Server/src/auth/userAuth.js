const UserModel = require('../model/UserModel');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY
console.log(SECRET_KEY)
const passportAuth = () => {
    return new LocalStrategy({ usernameField: 'email', passwordField: "password" }, async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ email: username });
            
            if (!user) {
                console.log('err');
                return done(null, false, { status: 409, message: "Invalid email id" });
            }
            
            if (bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { status: 409, message: "Invalid password" });
            }
        } catch (err) {
            return done(err);
        }
    });
}

const generateToken =  (user) => {
    return jwt.sign(user, SECRET_KEY, { expiresIn: '1d' });
}

const verifyToken = (token) => {
    console.log("verify token is ", token);
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return {
            success: true,
            message: "Token verified successfully",
            decoded
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Token verification failed: " + error.message
        };
    }
}


module.exports = {passportAuth, generateToken , verifyToken}