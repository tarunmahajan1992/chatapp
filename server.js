var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var util = require('util');
var session  =require('express-session');
var cookieParser= require('cookie-parser');
var config= require('./lib/config');
var passport  = require('passport');
var FacebookStrategy= require('passport-facebook').Strategy;


var mongoose=require('mongoose');
var connectionString=process.env.OPENSHIFT_MONGODB_DB_URL||'mongodb://localhost/mydb';
mongoose.connect(connectionString);
var developerSchema=mongoose.Schema({
    firstname:String,lastname:String, projects:[projectSchema]
},{collection:'developers'});

var projectSchema=mongoose.Schema({project:String},{collection:'projects'});
var developerModel=mongoose.model('',developerSchema);
app.set('view engine', 'ejs');
app.use(bodyParser.json()); // for parsing application/json
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid',resave:false,saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(multer()); // for parsing multipart/form-data



app.get('/',function(req,res){
    res.send('hello world');
});
/*app.get('/process',function(req,res){
	res.json(process.env);
	
	});*/
app.get('/rest/developer',function(req,res){
find(res);
});



app.delete('/rest/developer/:id',function(req,res){
developerModel.remove({_id:req.params.id},function(err){
if(!err) find(res);
    else res.json(err);
})
    console.log(req.params.id);
});

app.post('/rest/developer',function(req,res){
    var newDeveloper=req.body;
    /*console.log(JSON.stringify(newDeveloper));
    developer.push(newDeveloper);
    res.json(developer);*/
    console.log(JSON.stringify(newDeveloper))
    var develp=new developerModel(newDeveloper);
    develp.save(function(err,data){
      if(err) return res.json(err);
        else find(res);
    });
    
   
});
app.use(express.static(__dirname + '/public'));
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});

 var find=function(res){developerModel.find(function(err,dvp){
        if(err) return console.log("error");
        res.json(dvp);
    });
                       }
					   
					   
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      //Check whether the User exists or not using profile.id
      //Further DB code.
      return done(null, profile);
    });
  }
));

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { 
       successRedirect : '/', 
       failureRedirect: '/login' 
  }),
  function(req, res) {
    res.redirect('/');
  });
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
