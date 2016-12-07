(function(){
  'use strict';
 var app = angular.module('LunchCheck',[]);
 app.controller('LunchCheckController',LunchCheckController);
 LunchCheckController.$inject = ['$scope'];

 function LunchCheckController($scope){
   $scope.foodList = '';
   $scope.Message = '';
   $scope.Textcolor = 'black';
   $scope.FoodListSeparatedWithComma = [];
   $scope.checkFoodList = function(){
      var length = getLength($scope.foodList);
      switch (true) {
        case length > 0 && length <=3:
                $scope.Message = "Enjoy!";
                $scope.Textcolor = 'green';
        break;
        case length > 3:
                $scope.Message = "Too much!";
                $scope.Textcolor = 'red';
        break;
        default:
        $scope.Message = '';
        $scope.Textcolor = 'black';
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
