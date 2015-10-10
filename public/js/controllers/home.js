
'use strict';

define(['angular',
    'controllers-module',

], function(angular, controllers) {

    // Controller definition
    controllers.controller("HomeCtrl", ["$scope", "$rootScope","$location","authenticate", function($scope, $rootScope,$location, Auth) {
        Auth.protect();


    }]);
});