(function(){
  'use strict';
 var app = angular.module('LunchCheck',[]);
 app.controller('LunchCheckController',LunchCheckController);
 LunchCheckController.$inject = ['$scope'];

 function LunchCheckController($scope){
   $scope.foodList = '';
   $scope.Message = '';
   $scope.textColor = 'black';
   $scope.borderColor = 'black';
   $scope.FoodListSeparatedWithComma = [];
   $scope.checkFoodList = function(){
      var length = getLength($scope.foodList);
      switch (true) {
        case length > 0 && length <=3:
                $scope.Message = "Enjoy!";
                $scope.textColor = 'green';
                $scope.borderColor = 'green';
        break;
        case length > 3:
                $scope.Message = "Too much!";
                $scope.textColor = 'red';
                $scope.borderColor = 'red';
        break;
        default:
        $scope.Message = 'Please enter data';
        $scope.textColor = 'red';
        $scope.borderColor = 'black';
        break;

      }
    }
 };
 function getLength(foodList){
   var foodItemCount = 0;
   var foodListSplitBasedOnComma = foodList.split(',');
   for(var i=0;i<foodListSplitBasedOnComma.length;i++){
     foodItemCount+=checkStringValue(foodListSplitBasedOnComma[i])
   }
   return foodItemCount;
 };


 function checkStringValue(foodItem){
   foodItem = foodItem.replace(/['"]+/g, '');
   foodItem = foodItem.replace(" ",'');
  if(foodItem.length < 1){
       return 0;
   }
   return 1;
 }



})();
