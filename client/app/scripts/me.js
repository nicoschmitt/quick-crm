(function() {
    
    var app = angular.module('myApp');
  
    app.controller('meCtrl', ["$scope", '$http', "adalAuthenticationService", "$q", 
        function ($scope, $http, adal, $q) {
            var vm = this;
            vm.loading = true;
            vm.isAuthenticated = function() { return adal.userInfo.isAuthenticated };
            
            vm.user = {
                name: adal.userInfo.profile.name,
                email: adal.userInfo.userName,
                photo: null
            };

            var handleError = function(resp) {
                vm.loading = false;
                vm.message = resp.data;
                if (!vm.message) vm.message = resp;
                console.log("erreur");
                console.log(vm.message);
            };
            
            $http.get("https://graph.microsoft.com/v1.0/me")
                .then(function(resp) {
                    vm.user.job = resp.data.jobTitle;
                }, handleError)
                .then(function() {
                    $http({
                        method: "GET",
                        responseType: "blob",
                        url: "https://graph.microsoft.com/v1.0/me/photo/$value"
                    }).then(function(resp) {
                        if (resp.data) {
                            var reader = new FileReader();
                            reader.onload = () => {$scope.$apply(function () {
                                vm.user.photo = reader.result;
                            })}; 
                            reader.readAsDataURL(resp.data);
                        } else {
                            console.log("no photo");
                        }
                        vm.loading = false;
                    }, handleError);
                });
                    
        }
    ]);
  
}());