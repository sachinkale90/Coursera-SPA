(function(){
'use strict';
var app = angular.module('NameCalculator',[]);

app.controller('NameCalculatorController', function($scope){
  $scope.name ="";
  $scope.TotalValue= 0;
  $scope.displayStringLength = 0;
  $scope.displayNumeric = function(){
    var TotalNameValue = calculateNumericValue($scope.name);
    $scope.TotalValue = TotalNameValue;
  };  
 $scope.displayLength = function(){
   $scope.displayStringLength = getLength($scope.name);
 };
});
  function calculateNumericValue(string){
    var totalStringValue = 0;
    for(var i=0;i<string.length;i++){
      totalStringValue +=string.charCodeAt(i);
    }
    return totalStringValue;
  }

  function getLength(string){
    return string.length;
  }

})();
