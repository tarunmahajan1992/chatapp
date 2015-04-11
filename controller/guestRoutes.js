var developerModel=require(__base+'/model/developerModel.js');
var userModel=require(__base+'/model/userModel');

module.exports=function(app,express){

app.get('/',function(req,res){
    res.send('hello world');
});
/*app.get('/process',function(req,res){
	res.json(process.env);
	
	});*/
app.get('/rest/developer',function(req,res){
find(res);
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

app.post('/rest/user',function(req,res){
    var newDeveloper=req.body;
    /*console.log(JSON.stringify(newDeveloper));
    developer.push(newDeveloper);
    res.json(developer);*/
    console.log(JSON.stringify(newDeveloper))
    var develp=new userModel(newDeveloper);
    develp.save(function(err,data){
      if(err) return res.json(err);
        else find(res);
    });
   
});



var find=function(res){developerModel.find(function(err,dvp){
        if(err) return console.log("error");
        res.json(dvp);
    });
                       }

}