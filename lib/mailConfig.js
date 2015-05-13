
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');


var mailObj=function(mailTemplate){
	this.mailTemplate=mailTemplate;
	};
var auth = {
  auth: {
    api_key: 'key-7097b73c73b85ee149f0603958acdb7c',
    domain: 'sandboxd956a8d532df4b58af02b3d2a7703969.mailgun.org'
  }
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));
console.log("mail");

mailObj.prototype.sendMail=function(){
  nodemailerMailgun.sendMail({
  from: 'me.kitaabikida@gmail.com',
  to: this.mailTemplate.email, // An array if you have multiple recipients.
  subject: "verify email",
  'h:Reply-To': 'me.kitaabikida@gmail.com',
  //You can use "html:" to send HTML email content. It's magic!
  html: "<b>Verify email by clicking on</b><a href=\""+this.mailTemplate.verifyURL+"\">Click</a>",
  //You can use "text:" to send plain-text content. It's oldschool!
  text: "click on verify link"
}, function (err, info) {
  if (err) {
    console.log('Error: ' + err);
  }
  else {
    console.log('Response: ' + JSON.stringify(info)+"mail sent");
  }
});
}
module.exports=mailObj;
