
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
    }]);
});