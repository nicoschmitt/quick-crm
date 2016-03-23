(function() {
    
    var app = angular.module('myApp');
  
    app.controller('homeCtrl', ['$http', "adalAuthenticationService",
        function ($http, adal) {
            var vm = this;
            
            vm.isAuthenticated = function() { return adal.userInfo.isAuthenticated };
            
            vm.loading = true;
            vm.message = "";
            
            var handleError = function(resp) {
                vm.loading = false;
                vm.message = resp.data;
                if (!vm.message) vm.message = resp;
                console.log("erreur");
                console.log(vm.message);
            };
            
            if (vm.isAuthenticated()) {
                var driveurl = "https://microsoft-my.sharepoint.com/personal/nicolass_microsoft_com/_api/v1.0/drive";
                var crmurl = "https://microsoftsales.crm.dynamics.com/api/data/v8.0/opportunities?$top=20";
                var graph = "https://graph.microsoft.com/v1.0/me";
                $http.get(graph).then(function(resp) {
                    console.log(resp.data);
                    vm.loading = false;
                }, handleError);
            }
        }
    ]);
  
}());