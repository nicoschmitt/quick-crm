(function() {
    
    var app = angular.module('myApp');
  
    app.controller('myCtrl', ["$scope", '$http', "adalAuthenticationService",
        function ($scope, $http, adal) {
            var vm = this;
            vm.isAuthenticated = function() { return adal.userInfo.isAuthenticated };
        }
    ]);
  
}());