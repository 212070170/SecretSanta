/*global define */
define(['angular', 'directives-module'], function(angular, directives) {
	'use strict';

    /* Directives  */
    var gameTile = function(){
        return {
            restrict: 'E',
            replace: true,
            require: '?ngModel',
            transclude: true,
            templateUrl:'./public/js/directives/gameTile/gameTile.html',

            link: function (element, attr) {


                return function ($scope, $element, $attr) {
                    $scope.$on('$destroy', function () {
                    });
                };
            }
        }
    }
    directives.directive('gameTile', ['version', gameTile]);
	
	return directives;
});