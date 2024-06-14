const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();
const userModel = require('./src/model/UserModel');
const session = require('express-session');
const cors = require('cors');
const routes = require('./src/router/userRouter');
const MongoDBStore = require('connect-mongodb-session')(session);
const { passportAuth } = require('./src/auth/userAuth');
const googleAuth = require('./src/auth/googleAuth');
const githubAuth = require('./src/auth/githubAuth')
const DB_URI = process.env.DB_URI;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); 
const store = new MongoDBStore({
    uri: DB_URI,
    collection: 'app_session'
});

app.use(session({
    secret: SECRET_KEY,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 4,
    },
    store: store,
    resave: false
}))
mongoose.connect(DB_URI);
mongoose.connection.once('open', () => {
    console.log('connected to db');
    // userModel.collection.dropIndex('githubId_1', (err, result) => {
    //     if (err) {
    //         console.error('Error dropping index:', err);
    //     } else {
    //         console.log('Index dropped:', result);
    //     }
    // });
}).on('error', () => {
    console.log('error');
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser( async (_id , done)=> {
    try{
        const user = await userModel.findById(_id);
        done(null, user)
    }catch (err) {
        done(null ,user)
    } 
})


passport.use(passportAuth());

app.use('/api/v1', routes);
app.use('/',(req , res)=> {
    res.send("server id ruuning")
})
let port = process.env.PORT || 8000


app.listen(port, () => {
    console.log(port)
    console.log('server is runnnig');
}) 