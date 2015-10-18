
'use strict';

define(['angular',
    'controllers-module',


], function(angular, controllers) {

    // Controller definition
    controllers.controller("JogosCtrl", ["$scope", "$rootScope","$location","authenticate","data.loader","notifier", function($scope, $rootScope,$location,Auth,dataloader,notifier) {
        $scope.auth = Auth;
        $scope.dl = dataloader;
        $scope.auth.protect();
        $scope.newEvt = {};
        $scope.game = {};
        $scope.form = {}

        $scope.originalUser = angular.copy($scope.auth.user);

        //enable spinner
        if($scope.dl.getGames().length == 0)
            $scope.dl.loadGames($scope.auth.user.id).success(function(data){
                //hide spinner
                $scope.dl.setGames(data);
                console.log($scope.dl.games);
            }).error(function(){
                // hide spinner
                // show error

            })

        $scope.toggleVisibility = function(e,id){
            var $element = e.target;
            var chevron  = $($element).find('div i');
            var list = $("#"+id);
            chevron.toggleClass('fa-chevron-down');
            chevron.toggleClass('fa-chevron-up');
            list.toggleClass('show');
            list.toggleClass('hide');

        }

        $scope.confirmDelete = function(){
                $scope.dl.leaveGame($scope.auth.user.id,$scope.to_delete,$scope.game.event_in_focus).success(function(data){
                $scope.dl.setGames(data);
                notifier.success("Voce foi excluido com sucesso");

            }).error(function(){
                notifier.error("Nao foi possivel excluir te deste jogo nesse momento");
            })

        }

        $scope.deletePlayer = function(uid,jid,eid){
            $scope.dl.deletePlayer(uid,jid,eid)
                .success(function(data){
                    $scope.dl.setPlayers(data);
                    notifier.success("Participante excluido com sucesso");

                }).error(function() {
                    notifier.error("Nao foi possivel remover esse participante");
                });
        }

        $scope.createGame = function(){
            $scope.dl.createGame($scope.auth.user.id,$scope.newEvt.evtName,$scope.newEvt.evtDollarMin,$scope.newEvt.evtDollarMax,$scope.newEvt.evtDate,$scope.newEvt.evtDetails).success(function(data){
                if(data.status == "success"){
                    $(".ngMobileModal").removeClass("show");
                    $scope.newEvt = {};
                    notifier.success(data.message);
                }else{
                    notifier.error(data.message);
                }

            $scope.dl.setGames(data.data);
            }).error(function(){
                notifier.error("Nao foi possivel criar seu evento. Tente novamente mais tarde");
            });
        }

        $scope.addPlayer = function(){
            console.log($scope.game.userToAdd,$scope.dl.getPlayers().event_id);
            $scope.dl.addPlayer($scope.game.userToAdd,$scope.dl.getPlayers().event_id).success(function(data){
            $scope.game.userToAdd = "";
            $scope.dl.setPlayers(data);
            }).error(function(){
                notifier.error("Nao foi possivel adicionar essa pessoa");
            });
        }

        $scope.cancelChanges = function(){
            $scope.auth.user = angular.copy($scope.originalUser);
            $scope.form.myInfoForm.$setPristine();
            $(".slidingPanel").removeClass("slide-away");
        }

        $scope.saveChanges = function(){
            $scope.dl.saveChanges($scope.auth.user).success(function(data){
                if(data.status == "success"){
                    notifier.success(data.message);
                    $(".slidingPanel").removeClass("slide-away");
                    $scope.form.myInfoForm.$setPristine();
                }else{
                    notifier.error(data.message);
                }
            }).error(function(data){
                notifier.error("Nao foi possivel conectar com o banco de dados");
            });
        }

    }]);
});