/**
 * https://github.com/im4aLL/chromeSmoothScroll
 */

var chromeSmoothScroll = function(){
    'use strict';

    var settings = {
        counter            : 0,
        minVal             : 0,
        maxVal             : $(window).height() + 500,
        speed              : 800,
        offset             : 100,
        scrollHappen       : false,
        mainTriggerElem    : 'html',
        animateTriggerElem : 'html, body',
        tempPos            : 0,
        animating          : false,
        updatedMaxVal      : false,
        chromeOnly         : true
    },

    ticking = false,

    init = function(){
        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame       ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    function( callback ){
                        window.setTimeout(callback, 1000 / 60);
                    };
        })();

        if( settings.chromeOnly === true && !isChrome() ) {
            return false;
        }

        var eventName = 'mousewheel';
        if( settings.chromeOnly === false ) eventName += ' DOMMouseScroll';

        $(settings.mainTriggerElem).bind(eventName, function(e){
            e.preventDefault();
            if(!settings.updatedMaxVal) updateMaxVal();

            if( settings.scrollHappen === false && $(window).scrollTop() !== 0 ) updateCounter();
            settings.scrollHappen = true;

            e = e.originalEvent ? e.originalEvent : e;
            var delta = e.detail ? e.detail*(-40) : e.wheelDelta;

            if( delta > 0 ) settings.counter--;
            else if( delta < 0 ) settings.counter++;

            if( settings.counter < settings.minVal ) settings.counter = 0;
            else if( settings.counter * settings.offset > settings.maxVal ) settings.counter = settings.maxVal / settings.offset;

            if( settings.tempPos != settings.counter ) {
                if(!ticking) {
                    requestAnimFrame(function(){
                        doScroll();
                    });
                    ticking = true;
                }
            }

        });

        var updateTimeout = null;
        $(window).scroll(function(event) {
            if( settings.animating === false ) {
                clearTimeout(updateTimeout);
                updateTimeout = setTimeout(updateCounter, 1000);
            }
        });

        keyboard();

    },

    updateMaxVal = function(){
        settings.maxVal = $(document).height() < $(window).height() ? $(window).height() : $(document).height();
        settings.updatedMaxVal = true;
    },

    updateCounter = function(){
        settings.counter = $(window).scrollTop() / settings.offset;
    },

    doScroll = function(){
        settings.animating = true;
        $(settings.animateTriggerElem).stop().animate({
            scrollTop: settings.counter * settings.offset
        }, settings.speed,
        function(){
            settings.tempPos = settings.counter;
            settings.animating = false;
        });

        ticking = false;
    },

    isChrome = function(){
        return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    },

    keyboard = function(){
        $(settings.mainTriggerElem).keydown(function (e) {
            switch (e.which) {
                case 38:
                    $(settings.animateTriggerElem).stop().animate({
                        scrollTop: $(window).scrollTop() - settings.offset * 2
                    }, settings.speed);
                    break;

                case 40:
                    $(settings.animateTriggerElem).stop().animate({
                        scrollTop: $(window).scrollTop() + settings.offset * 2
                    }, settings.speed);
                    break;
            }

            if(e.which == 38 || e.which == 40) return false;
        });
    };

    return { init : init };
}();

chromeSmoothScroll.init();
