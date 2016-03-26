(function() {
    
    var app = angular.module('myApp');
  
    app.controller('homeCtrl', ['$http', "adalAuthenticationService",
        function ($http, adal) {
            var vm = this;
            
            vm.loading = false;
            vm.isAuthenticated = function() { return adal.userInfo.isAuthenticated };
            
            vm.message = "";
            
            var handleError = function(resp) {
                vm.loading = false;
                vm.message = resp.data;
                if (!vm.message) vm.message = resp;
                console.log("erreur");
                console.log(vm.message);
            };
            
            if (vm.isAuthenticated()) {
                vm.loading = true;
                $http.get("/api/oppty/my").then(function(resp) {
                    console.log(resp.data);
                    vm.loading = false;
                }, handleError);
            }
        }
    ]);
  
}());