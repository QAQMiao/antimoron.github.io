/*
Author:AntiMoron
Usage :Left index bar.
Date  :2014-8-14
*/
define(['jquery'],
       function($){
            var result = {
                              init:function(){
                                var sideBarFilter = "#indexLeftBar";
                                var sideIndex = $(topBarFilter);
                                if(topIndex == null || topIndex.length == 0){
                                    $("body").append("<div id=\""+sideBarFilter.substr(1)+"\"></div>");
                                    $(topBarFilter).append("<div id=\"indexLeftBar-background\"></div>");
                                    sideIndex = $(sideBarFilter);
                                }
                                if(sideIndex == null)
                                {
                                    console.log("sideIndexBar not found");
                                }
                                console.log("side bar index");
                                //Position
                                sideIndex.css('left','0px');
                                sideIndex.css('top','0px');
                                sideIndex.css('position','fixed');
                                //Rendering
                                sideIndex.css('z-index','10000');
                                sideIndex.css('width','100%');
                                sideIndex.css('height','50px');
                                sideIndex.css('background-color','rgba(255,0,0,0.5)');
                                //Font
                                var background = topIndex.find("#indexLeft-background");
                                topIndex.hide();
                                topIndex.slideDown(500);
                              }
                        };
        return result;
    });