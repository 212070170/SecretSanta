/*global define */
define(['angular', 'directives-module'], function(angular, directives) {
	'use strict';

    /* Directives  */
    var gameTile = function(version,dataloader){
        return {
            restrict: 'E',
            replace: true,
            require: '?ngModel',
            transclude: true,
            templateUrl:'./public/js/directives/gameTile/gameTile.html',

            link: function ($scope,element, attr) {
                $scope.dl = dataloader;
                $scope.showAllPlayers = function(){
                    // display loading sign
                    // fetch all players for this specific game
                    // display results
                    // different colors on those who already played

                    $("#allPlayers").addClass("show");
                }
                $scope.showPickedFriend = function(name){
                    $scope.$parent.pick_name = name;
                    // display loading sign
                    // fetch my secret santa for this party
                    // display results

                    $("#pickedFriend").addClass("show");
                }
                $scope.confirmDelete = function(id,eid){
                    $scope.$parent.to_delete = id;
                    $scope.$parent.event_in_focus = eid;
                    $("#confirmDelete .amMenu").toggleClass("showActionPanel");
                }
                $scope.showAllPlayers = function(eid){
                    $scope.dl.allPlayers(eid).success(function(data){
                        $scope.dl.setPlayers(data);
                        $("#allPlayers").addClass('show');
                    }).error(function(){
                        notifier.error("Nao Foi possivel acessar a lista de participantes");
                    })
                }

                return function ($scope, $element, $attr) {
                    $scope.$on('$destroy', function () {
                    });
                };
            }
        }
    }
    directives.directive('gameTile', ['version','data.loader', gameTile]);
	
	return directives;
});