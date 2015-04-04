global.__base = __dirname ;
var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var util = require('ejs');
var session  =require('express-session');
var cookieParser= require('cookie-parser');
var config= require('./lib/configParam');
var passport  = require('passport');
var FacebookStrategy= require('passport-facebook').Strategy;
var mongoose=require('mongoose');
mongoose.connect(config.connectionString);

app.set('view engine', 'ejs');
app.use(bodyParser.json()); // for parsing application/json
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid',resave:false,saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(multer()); // for parsing multipart/form-data

var routes=require('./controller/guestRoutes');
routes(app,express);


app.listen(config.server_port, config.server_ip_address, function(){
  console.log("Listening on " + config.server_ip_address + ", server_port " + config.server_port)
});
var passportConfig=require(__base+'/lib/passportConfig')(passport,FacebookStrategy,config);				   
var passportModule=require(__base+'/controller/profileRoutes')(app,passport);
