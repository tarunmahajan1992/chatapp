var app=angular.module("chatapp",[]);
app.controller("chatcontroller",function($scope,$http){
    $http.get("/list")
    .success(function(response){
    $scope.developers=response;
    });
    $scope.remove=function(id){
        console.log("delete");
        $http.post('/delete/'+id)
        .success(function(response){
            $scope.developers=response;
        });
    };
    $scope.add=function(dev){
       // alert('here');
        $http.post('/add',dev) 
         .success(function(response){
			if(response.error=="true") $scope.error="Login to continue";
			else
            $scope.developers=response;
			
        }) 
		.error(function(error){
			$scope.error="Login to continue";
			})
				
			
		
        }
        
    
});