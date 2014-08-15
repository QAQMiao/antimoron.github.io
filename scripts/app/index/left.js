/*
Author:AntiMoron
Usage :Top index bar.
Date  :2014-8-14
*/
define(['jquery'],function($,require,exports,module){
       var topBarFilter = "#indexTopBar";
       var topIndex = $(topBarFilter);
       if(topIndex == null || topIndex.length == 0){
            $("body").append("<div id=\""+topBarFilter.substr(1)+"\"></div>");
            $(topBarFilter).append("<div id=\"indexLeftBar-background\"></div>");
            $(topBarFilter).append("<div id=\"indexTopBar-text\"></div>");
            topIndex = $(topBarFilter);
       }
       if(topIndex == null)
       {
            console.log("topIndexBar not found");
       }
       console.log("top bar index");
       //Position
       topIndex.css('left','0px');
       topIndex.css('top','0px');
       topIndex.css('position','fixed');
       //Rendering
       topIndex.css('z-index','10000');
       topIndex.css('width','100%');
       topIndex.css('height','50px');
       //Font

       var background = topIndex.find("#indexTopBar-background");
       var text = topIndex.find("#indexTopBar-text");
       
       background.css('position','relative');
       background.css('left','0px');
       background.css('top','0px');
       background.css('opacity','0.5');
       background.css('width','100%');
       background.css('background','#000000');
       background.css('opacity','0.5');
       background.css('height','50px');
       
       text.css('position','absolute');
       text.css('left','3px');
       text.css('top','3px');
       text.css('color','#ffffff');
       text.css('font-size','32px');
       text.css('font-family','Copperplate / Copperplate Gothic Light, sans-serif');
       text.css('font-size','32px');
       text.append('AntiMoron\'s Home Page');

       topIndex.hide();
       topIndex.slideDown(500);
    });