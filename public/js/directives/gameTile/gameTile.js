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

                $scope.pickAPlayer = function (eid,uid){
                    $scope.dl.pickAPlayer(eid,uid).success(function(data){
                        $scope.dl.setGames(data);
//                        notifier.success('Parabens! Voce tirou seu papelzinho!');
                    }).error(function(){
//                        notifier.error('Tente novamente!');
                    });
                }
                $scope.showPickedFriend = function(name,message){
                    $scope.$parent.pick_name = name;
                    $scope.$parent.pick_message = message;
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