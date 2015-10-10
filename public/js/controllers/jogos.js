
'use strict';

define(['angular',
    'controllers-module',

], function(angular, controllers) {

    // Controller definition
    controllers.controller("JogosCtrl", ["$scope", "$rootScope","$location","user","authenticate", function($scope, $rootScope,$location,User,Auth) {
        Auth.protect();
        $scope.user = User;

        $scope.jogos = [
            {
                name:"Festa da Sueli",
                date:"25/12/2015",
                admin:0,
                played:1,
                friend:"Andre Reis"
            },
            {
                name:"Festa da Maria",
                date:"25/12/2015",
                admin:0,
                played:0,
                friend:""
            },
            {
                name:"Festa do Fabio",
                date:"25/12/2015",
                admin:1,
                played:1,
                friend:"Peter Parker"
            },
            {
                name:"Festa da Globo",
                date:"25/12/2015",
                admin:0,
                played:1,
                friend:"Guilherme de Padua"
            },
        ]

    }]);
});