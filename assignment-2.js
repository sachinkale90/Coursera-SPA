(function(){
  'use strict';
  var app = angular.module('ShoppingApp',[]);
  app.controller('ParentShoppingController',ParentShoppingController);
  app.controller('ChildShoppingController',ChildShoppingController);
var toBuyList = [
  {name:"Milk", quantity :10},
  {name:"Donuts", quantity :12},
  {name:"Pepto Bismol", quantity :5},
  {name:"Cookies", quantity :20},
  {name:"Chocolate", quantity :10},
];
var boughtItemsList = [];
 ParentShoppingController.$inject = ['$scope'];
 function ParentShoppingController($scope){
   $scope.toBuyItems = toBuyList;
   $scope.boughtItemsList = boughtItemsList;
   $scope.AlreadyBroughtMessage = 'Nothing bought yet';
   $scope.ToBuyMessage = '';
   $scope.AddToBroughtList = function(index){
     var newItem = {
           name: $scope.toBuyItems[index].name,
           quantity: $scope.toBuyItems[index].quantity
         };
         $scope.boughtItemsList.push(newItem);
         $scope.toBuyItems.splice(index,1);
         var itemsListLengths = {
             toBuyItemsLength : $scope.toBuyItems.length,
             boughtItemsLength : $scope.boughtItemsList.length
         };
         $scope.$broadcast('parent',itemsListLengths);
   }
 };
 ChildShoppingController.$inject = ['$scope'];
 function ChildShoppingController($scope){

   $scope.$on('parent', function (event, data) {
    if(data.boughtItemsLength > 0){
      $scope.AlreadyBroughtMessage = '';
    }
    if(data.toBuyItemsLength === 0){
      $scope.ToBuyMessage = 'Everything is bought';
    }

  });

 };

})();
