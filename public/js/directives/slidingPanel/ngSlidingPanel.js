/*global define */
define(['angular', 'directives-module'], function(angular, directives) {
    'use strict';

    /* Directives  */

    directives.directive('ngSlidingPanel', [
        '$timeout',
        function($timeout) {
            return {
                restrict: 'E',
                replace: true,
                require: '?ngModel',
                transclude: true,
                template:
                    '<div class="slidingPanel">' +
                    '<div ng-transclude></div>' +
                    '</div>',

                compile: function (element, attr) {
                    var id = attr.id;
                    var dir = attr.from;
                    var bhvr = attr.behavior;
                    var currClass = element[0].className;
                    if(dir == "left"){
                        element[0].className = currClass + " left";
                    }else{
                        element[0].className = currClass + " right";
                    }

                    var btn = attr.buttonOpen;
                    $("#"+btn).click(function(){
                        $("#"+id).toggleClass("slide-away");
                        if($("#"+id).attr("behavior") == "push" && $("#"+id).attr("from") == "left"){
                            $('body').css("overflow-x","hidden");
                            $(".container").toggleClass("push").toggleClass("push-away-left");
                        }else if($("#"+id).attr("behavior") == "push" && $("#"+id).attr("from") == "right"){
                            $(".container").toggleClass("push").toggleClass("push-away-right");
                            $('body').css("overflow-x","hidden");
                        }
                    });

                    $('.dismissSliders').click(function(){
                        $(".slidingPanel").removeClass("slide-away");
                        $(".container").removeClass("push").removeClass("push-away-left").removeClass("push-away-right");
                        $('body').css("overflow-x","auto");
                    });

//                    $("#"+id).click(function(){
//                        $(this).toggleClass("slide-away");
//                        if($("#"+id).attr("behavior") == "push" && $("#"+id).attr("from") == "left"){
//                            $(".container").toggleClass("push").toggleClass("push-away-left");
//                        }else if($("#"+id).attr("behavior") == "push" && $("#"+id).attr("from") == "right"){
//                            $(".container").toggleClass("push").toggleClass("push-away-right");
//                        }
//                    })
                    return function ($scope, $element, $attr) {
                        $scope.$on('$destroy', function () {
                        });
                    };
                }
            }

        }]);

    return directives;
});