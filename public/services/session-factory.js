/**
 * Created by 212070170 on 4/29/2015.
 */
/*global define */
console.log("session check");

define(['angular', 'services-module'], function(angular, services) {
    'use strict';

    /* Services */
    services.value('version', '0.1');

    services.factory('Session_factory',[function() {
        var factory = {};
        factory.set = function(attr,val){
            this[attr] = val;
        }
        factory.get = function (attr){
            return this[attr];
        }
        factory.clear = function (attr){
            this[attr]=null;
        }
        factory.destroy = function(){
            $.each(factory,function(e,v){
                if(typeof(v) == 'function'){
                }else{
                    delete factory[e];
                }
            })

        }
        return factory;
    }]);
        return services;
})
