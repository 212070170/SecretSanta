define(['angular', 'services-module','underscore'], function(angular, services,_) {
    'use strict';

    /* Services */
    services.value('version', '0.1');

    var auth = function($location) {
        var user = {};
        user.set = function(attr,val){
            if(typeof attr == 'object'){
                var keys = _.keys(attr);

                for(var k in keys){
                    this[keys[k]] = attr[keys[k]];
                }
            }else{
                this[attr] = val;
            }
        }
        user.get = function (attr){
            return this[attr];
        }
        user.clear = function (attr){
            this[attr]=null;
        }
        user.destroy = function(){
            var that = this;
            $.each(this,function(e,v){
                if(typeof(v) == 'function'){
                }else{
                    delete that[e];
                }
            })

        }

        var protect = function(){
            if( ((user.get('name') || false == false) || (user.get('username') || false == false)) == true )
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
