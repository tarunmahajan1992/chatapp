var request=require('request');
var routes=require(__base+'/controller');

module.exports=function(app,passport,config){
	

app.get('/user/notify',ensureAuthenticated,function(req,res){
	sendNotification(req,res);
	});
	
app.post('/login',
  passport.authenticate('local', { successRedirect: '/index.html',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
app.get('/login', function(req, res){
	console.log('in login');
  res.render('login', { user: req.user, message: 'invalid username/password' });
});

app.get('/auth/facebook', passport.authenticate('facebook',{authType: 'reauthenticate'}));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { 
       successRedirect : '/', 
       failureRedirect: '/login' 
  }),
  function(req, res) {
    res.redirect('/');
  });
app.get('/logout', function(req, res){
		console.log(" iam here ");

  req.logOut();
  res.redirect('/');
});
function ensureAuthenticated(req, res, next) {
		console.log(" iam here ");

  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.get('/myaccount',ensureAuthenticated,function(req,res){
	//console.log(" iam here LLLLLL");
	res.render('account',{verified:req.user.verified, mailsent:false});
	})
	
app.get('/sendConfirmationmail',ensureAuthenticated,routes.sendConfimationmail);

app.post('/register',routes.register);

app.get("/verify/:token", routes.verifyToken);

/*function sendNotification(req,res){
	url='https://graph.facebook.com/'+req.user.id+'/notifications?access_token='+config.facebook_api_key|config.facebook_api_secret;
	console.log(url);
	var accesstoken=config.facebook_api_key|config.facebook_api_secret;
	console.log(accesstoken);
	request.post(url,
    { form: { access_token:accesstoken ,
	           href:'/index.html',
			   template:'first notification'} },
    function (error, response) {
        if(error) {console.log("error in notification");
		  res.send(error);
        }
		else{
			
		}res.send(JSON.stringify(response)+"jhgjhg");
    }
);
}*/
}