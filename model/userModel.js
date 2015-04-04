 var mongoose=require('mongoose');
	var userSchema=mongoose.Schema({
    firstname:String,id:String
    },{collection:'users'});

    module.exports=mongoose.model('users',userSchema);