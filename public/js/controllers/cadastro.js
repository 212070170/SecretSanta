
'use strict';

define(['angular',
    'controllers-module',

], function(angular, controllers) {

    // Controller definition
    controllers.controller("RegisterCtrl", ["$scope", "$rootScope","$location", function($scope, $rootScope,$location) {
        $scope.doRegister = function(){
            console.log("Create Registration");
            console.log("On Success : Go back to login");
            console.log("On Error : Display Message and Stay on Page");
            console.log($scope.user);
        }

    }]);
});