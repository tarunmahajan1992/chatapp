var app=angular.module("chatapp",[]);
app.controller("chatcontroller",function($scope,$http){
    $http.get("/rest/developer")
    .success(function(response){
    $scope.developers=response;
    });
});