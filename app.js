(function(){
'use strict';

var app = angular.module('myFirstApp',[]);
app.controller('myFirstController', names);


})();

function names($scope) {
      $scope.name = "Roshan";
      $scope.sayHello = function(){
        return "Hi everyone!";
      }
  }
