 var mongoose=require('mongoose');
 var uuid = require('node-uuid');
 var bcrypt = require('bcryptjs');

	var userSchema=mongoose.Schema({
    firstname:{type:String,default:'kk'},
	username:{type:String,index:true},
	fb_id:{type:String,default:null},
	emailid:{type:String,default:null},
	verified:{type:Boolean,default:false},
	password:{type:String,default:'kumar'},
	
    },{collection:'users'});
	
	userSchema.pre('save', function(next) {
  	var user = this;
 	var SALT_FACTOR = 5;

  	if (!user.isModified('password')) return next();
    
     var hash=bcrypt.hashSync(user.password, 8);
	 var pwd=user.password;
	 user.password=hash;
	 next();
	 console.log(bcrypt.compareSync(pwd,hash)+" find matched");
  
   });
   
   userSchema.methods.comparePassword = function(pwd, cb) {
	   var hash=this.password;
	   console.log(JSON.stringify(this)+"in compare");
	   console.log(this.password);
    bcrypt.compare(pwd, hash, function(err, isMatch) {
		console.log(isMatch);
    if (err) { console.log(err+"in compare func"); return cb(err);}
    cb(null, isMatch);
    });
   };
	
	
	var verificationTokenSchema = mongoose.Schema({
    	_userId: {type: String, required: true},
    	token: {type: String, required: true},
   		createdAt: {type: Date, required: true, default: Date.now, expires:'24hr'}
   });
   
   verificationTokenSchema.methods.createVerificationToken = function (done) {
    var verificationToken = this;
    var token = uuid.v4();
    verificationToken.set('token', token);
    verificationToken.save( function (err) {
        if (err) return done(err);
        return done(null, token);
        console.log("Verification token", verificationToken);
    });
   };

   
	var verificationTokenModel = mongoose.model('VerificationToken', verificationTokenSchema);
    exports.verificationTokenModel = verificationTokenModel;
	
	var userModel=mongoose.model('user',userSchema);
	exports.userModel=userModel
	
	exports.verifyUser = function(token, done) {
	
    verificationTokenModel.findOne({token: token}, function (err, doc){
		
        if (err){ return done(err);console.log(JSON.stringify(err));}
		console.log(JSON.stringify(doc));
		if(!doc) { var error={error:"token expired"}; return done(error);}
        userModel.findOne({username: doc._userId}, function (err, user) {
            if (err){console.log(JSON.stringify(err)+"1"); return done(err);}
            user.verified=true;
            user.save(function(err) {
				console.log(JSON.stringify(err)+"2");
                done(err);
            })
        })
    })
   }
   exports.verifyNchangePwd=function(token,password,done){
		verificationTokenModel.findOne({token:token},function(err,doc){
		 if(err) return done(err);
		 if(!doc){ var error={error:"token expired"}; return done(error);}
		 userModel.findOne({username:doc._userId},function(err,user){
			 if(err) return done(err);
			 user.password=password;
			 user.save(function(err){
				 done(err);
				 })
			 })
			})   
   }