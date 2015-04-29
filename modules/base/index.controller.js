
'use strict';

define(['angular',
    'controllers-module',

], function(angular, controllers) {

    // Controller definition
    controllers.controller("baseCtrl", ["$scope", "$rootScope", function($scope, $rootScope) {
        $scope.showKeywords = true;

    }]);
});