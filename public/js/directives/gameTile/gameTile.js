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

            link: function ($scope,element, attr) {
                $scope.showAllPlayers = function(){
                    // display loading sign
                    // fetch all players for this specific game
                    // display results
                    // different colors on those who already played

                    $("#allPlayers").addClass("show");
                }
                $scope.showPickedFriend = function(){
                    // display loading sign
                    // fetch my secret santa for this party
                    // display results

                    $("#pickedFriend").addClass("show");
                }
                $scope.confirmDelete = function(){
                    // display loading sign
                    // fetch my secret santa for this party
                    // display results

                    $("#confirmDelete .amMenu").toggleClass("showActionPanel");
                }

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