exports.confirmationMail=function(emailId,verifyUrl){
    var html="<h3>Hello Sir/Mam</h3><p>Thanks for registering with kitaabikida.com</p>"+
		"<p>To verify your signup please click on the below link</p>"+
		"<button><a style=\"text-decoration:none\" href=\""+verifyUrl+"\">Click to verify</a></button>"+
		"<br><p style=\"color:red\">This link will expire automatically after 24 hours."+
		"So If you have not signed up ignore this and write to tarunmahajan1992@gmail.com";
    var subject="verify email address for kitaabikida account";  
	var text="verify your email address to complete signup with kitaabikida.com"
    var mailTemplate={emailId:emailId,html:html,subject:subject,text:text};
	return mailTemplate;

}

exports.passwordResetMail=function(emailId,verifyUrl){
  var html="<h3>Hello</h3>"+
           "<p>We have recieved a password change request. To reset the password"+
		   "click on the below button"+
		   "<button><a style=\"text-decoration:none\" href=\""+verifyUrl+"\">Reset Password</a></button>"+
		   "<br><p style=\"color=red\">This link will expire after 24 hours</p><p>If you haven't requested a password change request. Please write to tarunmahajan1992@gmail.com</p>"
   var subject="Kitaabikida password change request"; 
   var text="password change request at kitaabikida.com"
   var mailTemplate={emailId:emailId,html:html,subject:subject,text:text};
	return mailTemplate;


}