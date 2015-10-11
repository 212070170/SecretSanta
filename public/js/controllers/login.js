
'use strict';

define(['angular',
    'controllers-module',

], function(angular, controllers) {

    // Controller definition
    controllers.controller("LoginCtrl", ["$scope", "$rootScope","$location","data.loader","authenticate", function($scope, $rootScope,$location,dl,Auth) {
        $scope.auth = Auth;
        $scope.doLogin = function(){
            dl.getLogin($scope.username,$scope.password).success(function(data){
                $scope.auth.user = data;
                $location.path("/jogos");
                console.log("success",$scope.auth.user);

            }).error(function(){
                $location.path("/login");
                console.log("error");

            });

        }


    }]);
});