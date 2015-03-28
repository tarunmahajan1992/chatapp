var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var multer = require('multer'); 

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
app.get('/rest/developer',function(req,res){
res.json(developer);
});
app.get('/rest/developer/:index',function(req,res){
res.json(developer[req.params.index]);
});
app.delete('/rest/developer/:index',function(req,res){
developer.splice(req.params.index,1);
    res.json(developer);
});

app.post('/rest/developer',function(req,res){
    var newDeveloper=req.body;
    developer.push(newDeveloper);
    res.json(developer);
});
app.use(express.static(__dirname + '/public'));
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});


