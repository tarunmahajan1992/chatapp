var mailModule=require(__base+'/lib/mailConfig');
var uuid = require('node-uuid');
var dbModel=require(__base+'/model/userModel');


module.exports={
	sendConfimationmail:function(req,res){
	  var confirmationmail=new mailModule();
	  console.log("sending mail to" +JSON.stringify(req.user));
	  confirmationmail.sendMail(req.user.emailid);	
	  res.render('account',{mailsent:true});
	},
	
	register:function(req,res){
		var email=req.body.email;
		var password=req.body.password;
		
		dbModel.userModel.findOne({username:email},function(err,user){
			console.log(user);
			if(user!=null){
			console.log("alredy exists");
			 res.render('register',{error:"this email id already exists"});
			}
			else{ 
			var newUser=new dbModel.userModel();
			newUser.username=email;
			newUser.password=password;
			newUser.emailid=email;
			newUser.save(function(err,data){
			if(err) console.log("error in file indexjs at register");
			  console.log(JSON.stringify(data)+'in data at register');
			});
		
			var verificationentry=new dbModel.verificationTokenModel();
			verificationentry._userId=email;
			verificationentry.createVerificationToken(function(err,token){
			var message = {
        	 email: email,
   			 verifyURL: req.protocol + "://" + req.get('host') + "/verify/" + token};
		 	 console.log(message.verifyURL);
	  	   var confirmationmail=new mailModule(message);
	  	   console.log("sending mail to" +JSON.stringify(email));
	  	   confirmationmail.sendMail();	
	   		 res.render('account',{mailsent:true});
		
		   })
			}
		})
			
	},
	
	verifyToken:function (req, res, next) {
    var token = req.params.token;
	console.log("Token is "+token);
    dbModel.verifyUser(token, function(err) {
        if (err) return res.redirect("verification-failure");
		console.log('verification successful');
        res.redirect('/');
    });
}
	
   }