const express = require('express');
const mongoose = require('mongoose') ;
const passport = require('passport')
const session = require('express-session') 
const authenticate = require('./authenticate');

// routers
const dishRouter = require('./routers/dishRouter');
const promoRouter = require('./routers/promoRouter');
const leaderRouter = require('./routers/leaderRouter');
const userRouter = require('./routers/userRouter') ;
const favoritesRouter = require('./routers/favoritesRouter');
const uploadRouter = require('./routers/uploadRouter');

const app = express();

/**
 * set a middelware to redirect every request to Secure port
 * if the request is comming from a secure port --->  req object has a field 'req.secure'
 */
app.all('*',(req,res,next) => {
    if(req.secure){
        return next()
    }
    res.redirect(307,`https://${req.hostname}:${app.get('secPort') }${req.url}`);
})
const PORT = 3000; 
const url  = require('./config').Mongo_URL ;

// middelwares
app.use(express.json())
app.use(express.urlencoded({extended: true})) ;
app.use(express.static('./public'))

app.use(passport.initialize());

app.use('/users', userRouter) ;
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/favorites', favoritesRouter);
app.use('/imageUpload', uploadRouter);

mongoose.connect(url)
.then(() => {
    console.log('connected to the server ...') ;
})

module.exports = app;