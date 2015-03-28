var express=require('express');
var app=express();

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
app.use(express.static(__dirname + '/public'));
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});


