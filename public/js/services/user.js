define(['angular', 'services-module'], function(angular, services) {
    'use strict';

    /* Services */
    services.value('version', '0.1');

    services.factory('user',[function() {
        var user = {};
        user.set = function(attr,val){
            this[attr] = val;
        }
        user.get = function (attr){
            return this[attr];
        }
        user.clear = function (attr){
            this[attr]=null;
        }
        user.destroy = function(){
            $.each(factory,function(e,v){
                if(typeof(v) == 'function'){
                }else{
                    delete factory[e];
                }
            })

        }
        return user;
    }]);
    return services;
})
