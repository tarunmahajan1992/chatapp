var dbModel=require(__base+'/model/userModel');

module.exports=function(passport,FacebookStrategy,LocalStrategy,config){
	
	passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new LocalStrategy(
  function(username, password, done) {
	  process.nextTick(function () {
	  console.log(username+password);
    dbModel.userModel.findOne({ username: username }, function(err, user) {
		console.log(JSON.stringify(user));
      if (err) { return done(err); }
      if (!user) {
		  console.log("incorrect username");
        return done(null, false);
      }
      /*if (password!=user.password) {
        return done(null, false);
      }
	  console.log("finaly here");
      return done(null, user);*/
	 
	 user.comparePassword(password,function(error,matched){
		  	  console.log(user.password+"in passport config");

		  console.log("matched "+matched);
		  if(matched) return done(null,user);
		  else return done(null,false);
		  
		  });
    });
	  })
  }
  
  
));



passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url,
	 passReqToCallback: true
  },
  function(req,accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
	   /* userModel.remove({fb_id:profile.id},function(err){console.log("emove")});*/
	    req.session.fbAccessToken = accessToken;
		dbModel.userModel.find({fb_id:profile.id},function(err,user){
			if(err) { console.log("error"); return done(err);}
			if(user.length) {
				//console.log(JSON.stringify(user)+"    in user");
				console.log(JSON.stringify(profile.emails));
				return done(null,user);}
			else{
				newUser=new dbModel.userModel();
				newUser.fb_id=profile.id;
				if(profile.emails[0]!=null) {
					newUser.emailid=profile.emails[0].value;
					newUser.username=profile.emails[0].value;
				}
				newUser.firstname=profile.displayName;
				console.log(profile.emails[0].value);
				newUser.save(function(err,data){
					console.log(JSON.stringify(data)+'in data');
					if(err) return done(err);
					return done(null,user);
					});
			}
			
			
			});
	}
	
	);
  }
));

}