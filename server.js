var express=require('express');
var app=express();
app.get('/',function(req,res){
    res.send('hello world');
});
var port=process.env.OPENSHIFT_NODEJS_PORT||8080;
var ip=process.env.OPENSHIFT_NODEJS_IP|'127.0.0.1';
app.listen(port,ip,function(){
console.log('listening on '+port+" "+ip);
})


