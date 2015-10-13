
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


        $scope.jogos = [
            {
                id:1,
                name:"Festa da Sueli",
                date:"25/12/2015",
                admin:0,
                played:1,
                friend:"Andre Reis"
            },
            {
                id:2,
                name:"Festa da Maria",
                date:"25/12/2015",
                admin:0,
                played:0,
                friend:""
            },
            {
                id:3,
                name:"Festa do Fabio",
                date:"25/12/2015",
                admin:1,
                played:1,
                friend:"Peter Parker"
            },
            {
                id:4,
                name:"Festa da Globo",
                date:"25/12/2015",
                admin:0,
                played:1,
                friend:"Guilherme de Padua"
            },
        ]


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
                $scope.dl.leaveGame($scope.auth.user.id,$scope.to_delete,$scope.event_in_focus).success(function(data){
                $scope.dl.setGames(data);
                notifier.success("Voce foi excluido com sucesso");

            }).error(function(){
                notifier.error("Nao foi possivel excluir te deste jogo nesse momento");
            })

            console.log("ConfirmDelete",$scope.to_delete);
        }

        $scope.createGame = function(){
            $scope.dl.createGame($scope.auth.user.id,$scope.newEvt.evtName,$scope.newEvt.evtDollarMin,$scope.newEvt.evtDollarMax,$scope.newEvt.evtDate,$scope.newEvt.evtDetails).success(function(data){
            $(".ngMobileModal").removeClass("show");
            $scope.newEvt = {};
            $scope.dl.setGames(data);
            }).error(function(){
                notifier.error("Nao foi possivel criar seu evento. Tente novamente mais tarde");
            });
        }
    }]);
});