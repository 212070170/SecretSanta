
'use strict';

define(['angular',
    'controllers-module',

], function(angular, controllers) {

    // Controller definition
    controllers.controller("LoginCtrl", ["$scope", "$rootScope","$location","data.loader","authenticate",'notifier', function($scope, $rootScope,$location,dl,Auth,notifier) {
        $scope.auth = Auth;
        $scope.doLogin = function(){
            dl.getLogin($scope.username,$scope.password).success(function(data){
                $scope.auth.user.set(data);
                notifier.clearAll();
                $location.path("/jogos");
                notifier.info("Usuario e/ou senha incorretos");


            }).error(function(){
                notifier.error("Nao foi possivel efetuar o login. Tente novamente");
                $location.path("/login");

            });

        }


    }]);
});