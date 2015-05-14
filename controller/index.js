var mailModule=require(__base+'/lib/mailConfig');
var uuid = require('node-uuid');
var dbModel=require(__base+'/model/userModel');
var mailTemplates=require(__base+'/lib/mailTemplates');


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
			/*var message = {
        	 email: email,
   			 verifyURL: req.protocol + "://" + req.get('host') + "/verify/" + token};
		 	 console.log(message.verifyURL);*/
			 var verifyURL=req.protocol + "://" + req.get('host') + "/verify/" + token;
			 var confirmationMailTemplate=mailTemplates.confirmationMail(email,verifyURL)
	  	   var confirmationmail=new mailModule(confirmationMailTemplate);
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
        if (err) return res.render("message",{message:"verification failed. Url may have expired or some other reason. Try again"});
		console.log('verification successful');
        res.redirect('/');
    });
},
  
    forgotPassword:function(req,res,next){
		var email=req.body.email;
		dbModel.userModel.findOne({username:email},function(err,user){
			if(user){
			  var verificationentry=new dbModel.verificationTokenModel();
			  verificationentry._userId=email;
			  verificationentry.createVerificationToken(function(err,token){
			  var verifyURL=req.protocol + "://" + req.get('host') + "/verifyPasswordChange/" + token;
			  var pwdResetMailTemplate=mailTemplates.passwordResetMail(email,verifyURL)
	  	      var pwdresetnmail=new mailModule(pwdResetMailTemplate);
	  	      console.log("sending mail to" +JSON.stringify(email));
	  	      pwdresetnmail.sendMail();	
	   		  res.render('message',{message:"Email with a password reset link has been sent to your email ID"});
		
		   })
			}
			else{
			 res.render('forgot',{message:"No user with this email Id"});	
			}
		});
		
	},
	changePassword:function(req,res,next){
		var token=req.body.token;
		var password=req.body.password;
		dbModel.verifyNchangePwd(token,password, function(err) {
        if (err) return res.render("message",{message:"Token expired or some other error while password reset. Try again"});
		console.log('verification successful');
        res.redirect('/');
    });
		
			
	}
	
   }