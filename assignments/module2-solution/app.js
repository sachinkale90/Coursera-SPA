(function(){
  'use strict';
  var app = angular.module('ShoppingApp',[]);
  app.controller('ParentShoppingController',ParentShoppingController);
  app.controller('ChildShoppingController',ChildShoppingController);
  app.service('ShoppingListCheckOffService',ShoppingListCheckOffService);


 ParentShoppingController.$inject = ['ShoppingListCheckOffService'];
 function ParentShoppingController(ShoppingListCheckOffService){
   var parent = this;
   parent.message = '';
   parent.items = ShoppingListCheckOffService.getItemsToBuy();
   parent.AddToBroughtList = function (item){
      ShoppingListCheckOffService.buyingItem(item);
      if(parent.items.length === 0){
      parent.message = 'Everything is bought';
     }
   }
 };

 ChildShoppingController.$inject = ['ShoppingListCheckOffService'];
 function ChildShoppingController(ShoppingListCheckOffService){
     var child = this;
     child.message ='Nothing bought yet';
     child.items = ShoppingListCheckOffService.getItemsBought();     
 };

 function ShoppingListCheckOffService(){
   var service = this;
   var toBuyList = [
     {name:"Milk", quantity :10},
     {name:"Donuts", quantity :12},
     {name:"Pepto Bismol", quantity :5},
     {name:"Cookies", quantity :20},
     {name:"Chocolate", quantity :10}
   ];
   var boughtItemsList = [];
   service.getItemsToBuy = function(){
     return toBuyList;
   };

   service.getItemsBought = function(){
     return boughtItemsList;
   };

   service.buyingItem = function(item){
     boughtItemsList.push(item);
     var index = toBuyList.indexOf(item);
     toBuyList.splice(index,1);
   }
 }

})();
