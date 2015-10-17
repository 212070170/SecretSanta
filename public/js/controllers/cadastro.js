
'use strict';

define(['angular',
    'controllers-module',

], function(angular, controllers) {

    // Controller definition
    controllers.controller("RegisterCtrl", ["$scope", "$rootScope","$location","data.loader",'notifier', function($scope, $rootScope,$location,dataloader,notifier) {
        $scope.dl = dataloader;
        $scope.doRegister = function(){
            var user = $scope.user;
            $scope.dl.register(user.name,user.tel,user.pw1,user.username,user.email1).success(function(data){
                console.log(data);
                if(data.status == 'error')
                    notifier.error(data.message);
                else
                    notifier.success(data.message);

            }).error(function(){
                    notifier.error("Nao foi possivel cadastra-lo devido a um erro no sistema");
            })
        }

    }]);
});