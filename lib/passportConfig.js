var userModel=require(__base+'/model/userModel');
module.exports=function(passport,FacebookStrategy,config){
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
		console.log(JSON.stringify(profile));
		userModel.find({fb_id:profile.id},function(err,user){
			if(err) { console.log("error"); return done(err);}
			if(user) {
				console.log(JSON.stringify(user)+"    in user");
				return done(null,profile);}
			else{
				newUser=new userModel();
				newUser.fb_id=profile.id;
				newUser.firstname=profile.displayName;
				console.log("tarun");
				newUser.save(function(err,data){
					console.log(JSON.stringify(data)+'in data');
					if(err) return done(err);
					return done(null,profile);
					});
			}
			
			
			});
	}
	
	);
  }
));

}