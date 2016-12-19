(function(){
  'use strict';
 var app = angular.module('CustomModuleApp',[]);
 app.controller('CustomCtrl',CustomCtrl);
 app.filter('loves',LovesFilterFactory);
app.filter('truth',TruthFilter);
 CustomCtrl.$inject = ['$scope','lovesFilter'];

 function CustomCtrl($scope,lovesFilter){
   $scope.Message = 'Sachin likes Sowmya';
  $scope.Name = '';
   $scope.sayMessage = function(){
     return $scope.Message;
   };

   $scope.sayLoveMessage = function(){
     return lovesFilter($scope.Message);
   }
 };


function  LovesFilterFactory(){
  return function(input){
    input = input || "";
    input = input.replace('likes','loves');
    return input;
  };
}

function TruthFilter(){
  return function (input,target,replace){
    input = input || "";
    input = input.replace(target,replace);
    return input;
  };
}

})();
