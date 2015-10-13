/*global define */
define(['angular', 'directives-module'], function(angular, directives) {
    'use strict';

    /* Directives  */

    directives.directive('ngMobileModal', [
        '$timeout',
        function($timeout) {
            return {
                restrict: 'E',
                replace: true,
                require: '?ngModel',
                transclude: true,
                template:
                    '<div class="ngMobileModal">'+
                    '<div class="closeMobileModal">X</div>'+
                    '<div ng-transclude class="inner"></div>'+
                    '</div>',

                compile: function (element, attr) {

                    var id = attr.id;
                    var trigger = attr.triggeredBy;

                    return function ($scope, $element, $attr) {
                         $(".closeMobileModal,.dismissModal").click(function(){
                             $(".ngMobileModal").removeClass("show");
                         });
                        $(trigger).click(function(){
                            $("#"+id).addClass("show");
                        });

                        // $scope.$apply();
                        $scope.$on('$destroy', function () {

                        });
                    };
                }
            }

        }]);

    return directives;
});
