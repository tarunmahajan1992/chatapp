var developerModel=require(__base+'/model/developerModel.js');
var userModel=require(__base+'/model/userModel');
var routes=require(__base+'/controller');

module.exports=function(app,express){

app.get('/',function(req,res){
    res.send('hello world');
});
/*app.get('/process',function(req,res){
	res.json(process.env);
	
	});*/
/*app.get('/list',function(req,res){
find(res);
});*/

app.get('/signup',function(req,res){
	res.render('register',{error:null});
	})
	
app.get('/forgot', function(req, res) {
  res.render('forgot', {message:"enter email id"}
  );
 app.post('/forgot', routes.forgotPassword);
  
});
app.post('/changePassword',routes.changePassword);

app.get("/verifyPasswordChange/:token", function(req,res){
	 var token = req.params.token;

	res.render('changePassword',{token:token});
	});




/*app.post('/delete:id',function(req,res){
developerModel.remove({_id:req.params.id},function(err){
if(!err) find(res);
    else res.json(err);
})
    console.log(req.params.id);
});

app.post('/add',function(req,res){
    var newDeveloper=req.body;
    console.log(JSON.stringify(newDeveloper));
    developer.push(newDeveloper);
    res.json(developer);
    console.log(JSON.stringify(newDeveloper))
    var develp=new developerModel(newDeveloper);
    develp.save(function(err,data){
      if(err) return res.json(err);
        else find(res);
    });
   
});

app.post('/rest/user',function(req,res){
    var newDeveloper=req.body;
    console.log(JSON.stringify(newDeveloper));
    developer.push(newDeveloper);
    res.json(developer);
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
                       }*/

}