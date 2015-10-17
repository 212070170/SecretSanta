/**
 * Created by 212070170 on 8/11/2014.
 */
define([
    'require',
    'jquery',
    'angular',
    'angular-resource',
    'directives/main',
    'filters/main',
    'services/main',
    'controllers/main',
    'routes',
    'interceptors'
], function (require, $, angular, ngResource, directives, filters, services, controllers, routes, interceptors) {
    'use strict';

    /**
     * Application definition
     * This is where the AngularJS application is defined and all application dependencies declared.
     * @type {module}
     */
    var myApp = angular.module('myApp', [
        'ngResource',
        'app.controllers',
        'app.directives',
        'app.services',
        'app.filters',
        'app.routes',
        'app.interceptors'
    ]);

    myApp.run(['$location', '$rootScope', function($location, $rootScope) {


    }]);


    myApp.controller('MainCtrl',['$scope','$rootScope','Session_factory','notifier','authenticate', function($scope,$rootScope,session,notifier,authenticate){
        $scope.auth = authenticate;
        //Global application object
        $rootScope.store = notifier;
        console.log("notifier",$rootScope.store);
        window.App = $rootScope.App = {
            version: '1.0',
            name: 'Amigo Secreto',
            session: {},
            tabs: [
                {state: 'home', label: "Home"},
                {state: 'about', label: "About"}
            ]
        };



        //Unbind all widgets from datasources and widgets when page changes
        $rootScope.$on('$routeChangeStart', function () {
            //vRuntime.binder.unbindAll();
        });

        $scope.logout = function(){
            $scope.auth.user.destroy();
            $scope.auth.protect();
        }



    }])
    //Set on window for debugging
    window.myApp = myApp;


    require(['jquery','bootstrap-3.2.0'],function(){
        $('.dropdown-toggle').dropdown();
    });

    //Return the application  object
    return myApp;
});