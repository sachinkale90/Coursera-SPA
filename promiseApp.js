(function(){
  'use strict';
  var app = angular.module("ShoppingListApp",[])
  app.controller("ShoppingListController",ShoppingListController);
  app.service("ShoppingListService",ShoppingListService);
  app.service("WeighLossFilterService",WeighLossFilterService);

  ShoppingListController.$inject = ['ShoppingListService'];
  function ShoppingListController(ShoppingListService){
    var list = this;
    list.items = ShoppingListService.getItems();
    list.itemName = "";
    list.itemQuantity = "";

    list.addItem = function(){
      ShoppingListService.addItem(list.itemName,list.itemQuantity);
    };

    list.removeItem = function(index){
      ShoppingListService.removeItem(index);
    };
  };

ShoppingListService.$inject = ['$q','WeighLossFilterService']
  function ShoppingListService($q,WeighLossFilterService){
    var service = this;

    var items = [];
    service.getItems = function(){
      return items;
    };
    service.addItem = function(itemName,itemQuantity){
      var promise = WeighLossFilterService.checkName(itemName);
      var nextPromise = WeighLossFilterService.checkQuantity(itemQuantity);

      $q.all([promise,nextPromise]).then(function(result){
        var item = {
          name : itemName,
          quantity : itemQuantity
        };
        items.push(item);
      }).catch(function(errorResponse){
          console.log(errorResponse.message);
      });
    };
    service.removeItem = function(index){
      items.splice(index,1);
    };
};
  WeighLossFilterService.$inject = ['$q','$timeout']
  function WeighLossFilterService($q,$timeout){
    var service = this;

    service.checkName = function(itemName){
      var deferred = $q.defer();
      var result = {
        message:""
      };
      $timeout(function () {
        if(itemName.toLowerCase().indexOf('cookie') === -1){
          deferred.resolve(result);
        }else{
          result.message = "No cookies";
          deferred.reject(result);
        }
      }, 3000);
     return deferred.promise;
    };

    service.checkQuantity = function(quantity){
      var deferred = $q.defer();
      var result = {
        message:""
      };
      $timeout(function () {
        if(quantity <= 5){
          deferred.resolve(result);
        }else{
          result.message = "quantity more than 5";
          deferred.reject(result);
        }
      }, 1000);
     return deferred.promise;
   };
  }
})();
