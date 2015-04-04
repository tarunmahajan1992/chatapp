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
      userModel.find({id:profile.id},function(err){
		    /*if(err) return done(err);*/
		  	if(doc.length){
				return done(null, profile);
			}
			else{
				var user=new UserModel();
				user.name=profile.firstname;
				user.id=profile.id;
				userModel.save(user,function(err){
					/*if(err) return done(err);*/
					
					return done(null,profile);
				});
			}
		  
		  });
      
    });
  }
));

}