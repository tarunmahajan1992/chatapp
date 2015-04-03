var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var multer = require('multer'); 


var mongoose=require('mongoose');
var connectionString=process.env.OPENSHIFT_MONGODB_DB_URL||'mongodb://localhost/mydb';
mongoose.connect(connectionString);
var developerSchema=mongoose.Schema({
    firstname:String,lastname:String
},{collection:'developers'});
var developerModel=mongoose.model('',developerSchema);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data


var developer=[
    {firstname:'tarun',lastname:'kumar'},
    {firstname:'sarthak',lastname:'singh'},
    {firstname:'viney',lastname:'jindal'}
];
app.get('/',function(req,res){
    res.send('hello world');
});
app.get('/process',function(req,res){
	res.json(process.env);
	
	});
app.get('/rest/developer',function(req,res){
find(res);
});
app.get('/rest/developer/:index',function(req,res){
res.json(developer[req.params.index]);
});
app.delete('/rest/developer/:id',function(req,res){
developerModel.remove({_id:req.params.id},function(err){
if(!err) find(res);
    else res.json(err);
})
    console.log(req.params.id);
});

app.post('/rest/developer',function(req,res){
    var newDeveloper=req.body;
    /*console.log(JSON.stringify(newDeveloper));
    developer.push(newDeveloper);
    res.json(developer);*/
    console.log(JSON.stringify(newDeveloper))
    var develp=new developerModel(newDeveloper);
    develp.save(function(err,data){
      if(err) return res.json(err);
        else find(res);
    });
    
   
});
app.use(express.static(__dirname + '/public'));
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});

 var find=function(res){developerModel.find(function(err,dvp){
        if(err) return console.log("error");
        res.json(dvp);
    });
                       }
