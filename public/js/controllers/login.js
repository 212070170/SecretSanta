
'use strict';

define(['angular',
    'controllers-module',

], function(angular, controllers) {

    // Controller definition
    controllers.controller("LoginCtrl", ["$scope", "$rootScope","$location","data.loader","authenticate",'notifier', function($scope, $rootScope,$location,dl,Auth,notifier) {
        $scope.auth = Auth;
        $scope.doLogin = function(){
            dl.getLogin($scope.username,$scope.password).success(function(data){
                notifier.clearAll();
                $scope.auth.user = data;
                $location.path("/jogos");
                console.log("success",$scope.auth.user);
                notifier.info("Usuario e/ou senha incorretos");


            }).error(function(){
                notifier.error("Nao foi possivel efetuar o login. Tente novamente");
                $location.path("/login");

            });

        }


    }]);
});