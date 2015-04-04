   var mongoose=require('mongoose');
	var developerSchema=mongoose.Schema({
    firstname:String,lastname:String
    },{collection:'developers'});

    module.exports=mongoose.model('developers',developerSchema);