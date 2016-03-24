(function() {
    
    var app = angular.module('myApp');
  
    app.controller('homeCtrl', ["crmtenant", '$http', "adalAuthenticationService",
        function (crmtenant, $http, adal) {
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
            
            var crmurl = "https://" + crmtenant + ".crm.dynamics.com";
            
            if (vm.isAuthenticated()) {
                var driveurl = "https://microsoft-my.sharepoint.com/personal/nicolass_microsoft_com/_api/v1.0/drive";
                var crmurl = crmurl + "/api/data/v8.0/opportunities?$top=20";
                $http.get(crmurl).then(function(resp) {
                    console.log(resp.data);
                    vm.loading = false;
                }, handleError);
            }
        }
    ]);
  
}());