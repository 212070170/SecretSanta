
'use strict';

define(['angular',
    'controllers-module',

], function(angular, controllers) {

    // Controller definition
    controllers.controller("LoginCtrl", ["$scope", "$rootScope","$location","user", function($scope, $rootScope,$location,User) {
        $scope.user = User;

        $scope.doLogin = function(){
            $scope.user.username = $scope.username;
            $scope.user.password = $scope.password;
            $location.path("/home");
        }


    }]);
});