/**
 * Created by 212070170 on 8/11/2014.
 */
require(['js/config'], function(config){
    require(['jquery','lessjs','angular','app'], function($,less,angular,app){
        angular.bootstrap(document,[app.name]);
    })
})
