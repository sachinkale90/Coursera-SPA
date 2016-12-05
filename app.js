(function(){
'use strict';

var app = angular.module('myFirstApp',[])
app.controller('myFirstController',['$scope', function ($scope) {
    $scope.name = "Sachin";
    $scope.sayHello = function(){
      return "Hi everyone!";
    }
}]);

})();
