(function() {
    
    var app = angular.module('myApp');
  
    app.controller('topNavCtrl', ["$rootScope", "$location", 'adalAuthenticationService', "$http", 
        function ($rootScope, $location, adal, $http) {
            var vm = this;
            
            vm.login = function() {
                adal.login();
            };
            
            vm.logout = function() {
                adal.logOut();
            };
            
            vm.getUsername = function() {
                var auth = adal.userInfo.isAuthenticated;
                return (auth && adal.userInfo.profile.name) || "";
            };
            
            vm.isActive = function(viewLocation) { 
                return viewLocation === $location.path();
            };
            
            vm.isAuthenticated = function() { return adal.userInfo.isAuthenticated }
        }
    ]);
  
    app.directive("topNav", function () {
        return {
            restrict: 'E',
            templateUrl: "/app/views/top-nav.html",
            controller: "topNavCtrl",
            controllerAs: "nav"
        };
    });
  
}());
