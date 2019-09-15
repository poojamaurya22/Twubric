(function(angular) {
  'use strict';
function UserListController($http) {
  var ctrl = this;

  $http.get('db.json').then(function(response) {
   ctrl.list = response.data;
});

 var ctrl = this;
 
  ctrl.delete = function(a) {
    var idx = ctrl.list.indexOf(a);
    if (idx >= 0) {
      ctrl.list.splice(idx, 1);
    }
  };

  ctrl.orderProperty = "";

  ctrl.setOrderProperty = function(propertyName) {
        if (ctrl.orderProperty === propertyName) {
            ctrl.orderProperty = '-' + propertyName;
        } else if (ctrl.orderProperty === '-' + propertyName) {
            ctrl.orderProperty = propertyName;
        } else {
            ctrl.orderProperty = propertyName;
        }
    };

  
}

angular.module('userApp').filter('dateRange', function() {
        return function( items, fromDate, toDate ) {
            var filtered = [];
            var from_date = Date.parse(fromDate);
            var to_date = Date.parse(toDate);
            
            if(fromDate == null && toDate == null){
              angular.forEach(items, function(item) {
                    filtered.push(item);
              });
            }
            else if(fromDate == null && toDate != null){
              angular.forEach(items, function(item) {
                if(item.join_date <= to_date) {
                    filtered.push(item);
                }
            });
            }
            else if(fromDate != null && toDate == null){
              angular.forEach(items, function(item) {
                if(item.join_date >= from_date) {
                    filtered.push(item);
                }
            });
            }
            else{
               angular.forEach(items, function(item) {
                if(item.join_date >= from_date && item.join_date <= to_date) {
                    filtered.push(item);
                }
              });
            }
            return filtered;
        };
    }).component('userList', {
  templateUrl: 'userList.html',
  controller: UserListController
});
})(window.angular);
