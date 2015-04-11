var request=require('request');

module.exports=function(app,passport,config){
	app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/user/notify',ensureAuthenticated,function(req,res){
	sendNotification(req,res);
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
  req.logOut();
  res.redirect('/');
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/index.html')
}


function sendNotification(req,res){
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
}
}