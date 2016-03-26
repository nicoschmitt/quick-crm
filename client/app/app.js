/* global angular */
(function() {
    $.material.init();
    
    var app = angular.module('myApp', [ 'ngRoute', "AdalAngular", "ngMaterial" ]);
  
    app.config(["adalAppId", "o365tenant", "crmtenant", '$routeProvider','$httpProvider', 'adalAuthenticationServiceProvider',
        function (adalAppId, o365tenant, crmtenant, $routeProvider, $httpProvider, adalProvider) {
   
            $routeProvider.when("/Home", {
                templateUrl: "/app/views/home.html",
                controller: "homeCtrl",
                controllerAs: "vm"
                
            }).when("/My", {
                templateUrl: "/app/views/my.html",
                controller: "myCtrl",
                controllerAs: "vm",
                requireADLogin: true
                
            }).when("/Me", {
                templateUrl: "/app/views/me.html",
                controller: "meCtrl",
                controllerAs: "vm",
                requireADLogin: true
                           
            }).otherwise({ redirectTo: "/Home" });
            
            var spurl = "https://" + o365tenant + "-my.sharepoint.com/";
            var crmurl = "https://" + crmtenant + ".crm.dynamics.com";
            var endpoints = {};
            endpoints[crmurl] = crmurl;
            endpoints[spurl] = spurl;
            endpoints["https://graph.microsoft.com/"] = "https://graph.microsoft.com/";

            console.log(Object.keys(endpoints));
            
            adalProvider.init({
                tenant: o365tenant + '.onmicrosoft.com',
                clientId: adalAppId,
                endpoints: endpoints
            }, $httpProvider );

    }]);
   
    fetchData().then(launchApplication);

    function fetchData() {
        var initInjector = angular.injector(["ng"]);
        var $http = initInjector.get("$http");
        return $http.get("/api/config").then(function(resp){
            app.constant("adalAppId", resp.data.adalAppId);
            app.constant("o365tenant", resp.data.o365tenant);
            app.constant("crmtenant", resp.data.crmtenant);
        });
    };

    function launchApplication() {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ["myApp"]);
        });
    };
  
}());