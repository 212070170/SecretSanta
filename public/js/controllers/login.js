
'use strict';

define(['angular',
    'controllers-module',

], function(angular, controllers) {

    // Controller definition
    controllers.controller("LoginCtrl", ["$scope", "$rootScope","$location","data.loader","authenticate",'notifier', function($scope, $rootScope,$location,dl,Auth,notifier) {
        notifier.clearAll();
        $scope.auth = Auth;
        $scope.doLogin = function(){
            dl.getLogin($scope.username,$scope.password).success(function(data){
                if(data.status == 'success'){
                    $scope.auth.user.set(data.data);
                    notifier.clearAll();
                    $location.path("/jogos");
                    notifier.success(data.message);
                }else{
                    notifier.clearAll();
                    notifier.error(data.message);
                }

            }).error(function(){
                notifier.error("Nao foi possivel efetuar o login. Tente novamente");
                $location.path("/login");

            });

        }


    }]);
});