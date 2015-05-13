 var mongoose=require('mongoose');
 var uuid = require('node-uuid');
 var bcrypt = require('bcrypt');

	var userSchema=mongoose.Schema({
    firstname:{type:String,default:'kk'},
	username:{type:String,index:true},
	fb_id:{type:String,default:null},
	emailid:{type:String,default:null},
	verified:{type:Boolean,default:false},
	password:{type:String,default:'kumar'},
	
    },{collection:'users'});
	
	
	
	
	var verificationTokenSchema = mongoose.Schema({
    	_userId: {type: String, required: true},
    	token: {type: String, required: true},
   		createdAt: {type: Date, required: true, default: Date.now, expires: '4h'}
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