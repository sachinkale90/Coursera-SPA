(function(){
  'use strict';
   var app = angular.module('MenuSeachApp',[]);
   app.controller('NarrowItDownController',NarrowItDownController);
   app.service('MenuSearchService',MenuSearchService);
   app.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com");
   app.directive('foundItems',FoundItems)

   function FoundItems(){
     var ddo = {
       template:'{{item.name}},{{item.short_name}},{{item.description}}'
     };
     return ddo;
   };

   NarrowItDownController.$inject = ['MenuSearchService'];
   function NarrowItDownController(MenuSearchService){
     var menu = this;
     menu.itemName = "";
     menu.message = "";
     menu.searchItem = function(){
       if(menu.itemName === ""){
         menu.message = "Nothing found";
       }else{
       var promise = MenuSearchService.getMatchedMenuItems (menu.itemName);
       promise.then(function(result){
         if(result.length === 0){
           menu.message = "Nothing found";
         }else{
           menu.message ="";
       }
        menu.found = result;
       }).catch(function(errorMessage){
         console.log(errorMessage);
       });
     };
   }   
   menu.narrowItemList = function(itemIndex){
     menu.found.splice(itemIndex, 1);
   }
 };

   MenuSearchService.$inject =['$http','ApiBasePath'];
   function MenuSearchService($http,ApiBasePath){
     var service = this;
     service.getMatchedMenuItems = function(searchTerm){
       return $http({
         method:"GET",
         url:(ApiBasePath+"/menu_items.json")
       }).then(function(result){
          var foundItems = [];
          angular.forEach(result.data, function(value, key){
             angular.forEach(value, function(v, key){
              if(v.description.indexOf(searchTerm) !== -1){
                 foundItems.push(v);
              }
             });
          });
          return foundItems;
       });
     };
   };

})();
