 var mongoose=require('mongoose');
	var userSchema=mongoose.Schema({
    firstname:String,fb_id:String
    },{collection:'users'});

    module.exports=mongoose.model('user',userSchema);