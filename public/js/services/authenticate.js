define(['angular', 'services-module'], function(angular, services) {
    'use strict';

    /* Services */
    services.value('version', '0.1');

    var auth = function(user,$location) {
        var protect = function(){
            if(user.username != "fabiokpoeira" && user.password != "cinza5713")
                $location.path("/login");
        }


        return {
            protect:protect
        };
    }

    services.factory('authenticate',['user','$location',auth]);
    return services;
})
