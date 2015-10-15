define(['angular', 'services-module'], function(angular, services) {
    'use strict';

    /* Services */
    services.value('version', '0.1');

    var auth = function($location) {
        var user = {};
        var protect = function(){
            console.log(this.user);
            console.log("check: ",(this.user.name || false == false) || (this.user.username || false == false) );
            if( ((this.user.name || false == false) || (this.user.username || false == false)) == true )
                $location.path("/login");
        }


        return {
            user:user,
            protect:protect
        };
    }

    services.factory('authenticate',['$location',auth]);
    return services;
})
