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
    'js/routes',
    'js/interceptors'
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
   /* this is the app run module*/
    }]);


    myApp.controller('MainCtrl',['$scope','Session_factory', function($scope,session){


    }])
    //Set on window for debugging
    window.myApp = myApp;


    require(['jquery','bootstrap-3.2.0'],function(){
        $('.dropdown-toggle').dropdown();
    });

    //Return the application  object
    return myApp;
});