
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');


var mailObj=function(){
	
	};
var auth = {
  auth: {
    api_key: 'key-7097b73c73b85ee149f0603958acdb7c',
    domain: 'sandboxd956a8d532df4b58af02b3d2a7703969.mailgun.org'
  }
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));
console.log("mail");

mailObj.prototype.sendMail=function(emailId_to){
  nodemailerMailgun.sendMail({
  from: 'me.kitaabikida@gmail.com',
  to: emailId_to, // An array if you have multiple recipients.
  subject: 'Hey you, awesome!',
  'h:Reply-To': 'me.kitaabikida@gmail.com',
  //You can use "html:" to send HTML email content. It's magic!
  html: '<b>Wow Big powerful letters</b>',
  //You can use "text:" to send plain-text content. It's oldschool!
  text: 'Mailgun rocks, pow pow!'
}, function (err, info) {
  if (err) {
    console.log('Error: ' + err);
  }
  else {
    console.log('Response: ' + info+"mail sent");
  }
});
}
module.exports=mailObj;
