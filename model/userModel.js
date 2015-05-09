 var mongoose=require('mongoose');
	var userSchema=mongoose.Schema({
    firstname:String,
	username:{type:String,index:true},
	fb_id:{type:String,default:null},
	emailid:{type:String,default:null},
	verified:{type:Boolean,default:false},
	password:{type:String,default:'kumar'}
    },{collection:'users'});

    module.exports=mongoose.model('user',userSchema);