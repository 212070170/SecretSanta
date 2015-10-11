/*global define */
define(['angular', 'directives-module'], function(angular, directives) {
    'use strict';

    /* Directives  */

    directives.directive('ngActionMenu', [
        '$timeout',
        function($timeout) {
            return {
                restrict: 'E',
                replace: true,
                require: '?ngModel',
                transclude: true,
                template:
                    '<div class="amContainer">'+
                    '<div ng-transclude class="amMenu"></div>'+
                    '</div>',

                compile: function (element, attr) {
                    var id = attr.id;
                    var bkg = attr.background == "no" ? "background-color:transparent;":"";
                    var title = attr.title;
                    var btnToggle = attr.btnToggle;


                    return function ($scope, $element, $attr) {

                        $("#"+id+" .amMenu").children("div").each(function(){
                            var icon = $(this).attr("icon");
                            var link = $(this).attr("link");
                            var bhvr = $(this).attr("behavior");
                            var text = $(this).text();
                            var type = $(this).attr("type");
                                type = type == "detached" ? "detach" : "";

                            var buildLink = "";
                            if(bhvr == "link" || bhvr == "" || bhvr == null || bhvr == undefined){
                                buildLink = "href='"+link+"'";
                            }else if(bhvr == "modal"){
                                buildLink = 'data-toggle="modal" href="'+link+'" ';

                                //$(this).modal();
                            }

                            var foreColor = $(this).attr("color") != "" && $(this).attr("color") != undefined && $(this).attr("color") != null ? "color:"+$(this).attr("color")+";" : "";

                            var inner = "<a "+buildLink+" class='am "+type+" dismissActionMenu' style='"+foreColor+""+bkg+"'><i class='fa fa-"+icon+"'></i><span class='amlabel'>"+text+"</span></a>";
                            $(this).html(inner);;
                        });

                        if(title != "" && title != null && title != undefined){
                            var t = "<div class='am amTitle'>"+title+"</div>";
                            $(".amMenu").html(t+$(".amMenu").html());
                        }

                        if(btnToggle != null && btnToggle != undefined && btnToggle != ""){
                            $(btnToggle).click(function(){
                                $("#"+id+" .amMenu").toggleClass("showActionPanel");
                            });
                            $(".dismissActionMenu").click(function(){
                                $("#"+id+" .amMenu").toggleClass("showActionPanel");
                            })
                        }

                        $scope.$on('$destroy', function () {


                        });
                    };
                }
            }

        }]);

    return directives;
});