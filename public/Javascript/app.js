var app=angular.module("chatapp",[]);
app.controller("chatcontroller",function($scope,$http){
    $http.get("/rest/developer")
    .success(function(response){
    $scope.developers=response;
    });
    $scope.remove=function(id){
        
        $http.delete('/rest/developer/'+id)
        .success(function(response){
            $scope.developers=response;
        });
    };
    $scope.add=function(dev){
       // alert('here');
        $http.post('/rest/developer',dev) 
         .success(function(response){
            $scope.developers=response;
        }) 
        }
        
    
});