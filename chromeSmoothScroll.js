/**
 * [chromeSmoothScroll Smooth scrolling for Chrome browser]
 * @return {[usage]} [ chromeSmoothScroll.init(); ]
 * @author Habib Hadi
 * @website http://habibhadi.com
 * @email me [at] habibhadi.com
 */

var chromeSmoothScroll = function(){

	var settings = {
		counter            : 0,
		minVal             : 0,
		maxVal             : $('html').height(),
		scrolling          : null,
		speed              : 800,
		offset             : 100,
		scrollHappen       : false,
		animTimeOut        : 50,
		mainTriggerElem    : 'html',
		animateTriggerElem : 'html, body',
		tempPos			   : 0,
		animating		   : false,
		updatedMaxVal      : false
	},

	init = function(){
		if( !isChrome() ) return false;

		$(settings.mainTriggerElem).bind('mousewheel', function(e){ 
			e.preventDefault();
			if(!settings.updatedMaxVal) updateMaxVal();

			if( settings.scrollHappen == false && $(window).scrollTop() != 0 ) updateCounter();
			settings.scrollHappen = true;

			if( e.originalEvent.wheelDelta  > 0 ) settings.counter--;
			else if( e.originalEvent.wheelDelta  < 0 ) settings.counter++;

			if( settings.counter < settings.minVal ) settings.counter = 0;
			else if( settings.counter * settings.offset > settings.maxVal ) settings.counter = settings.maxVal / settings.offset;

			if( settings.tempPos != settings.counter ) doScroll();

		});

		$(window).scroll(function(event) {
			if( settings.animating == false ) {
				var updateTimeout = null;
				clearTimeout(updateTimeout);
				updateTimeout = setTimeout(updateCounter, 1000);
			}
		});
		
	},

	updateMaxVal = function(){
		settings.maxVal = $('html').height() < $(window).height() ? $(window).height() : $('html').height();
		settings.updatedMaxVal = true;
	},

	updateCounter = function(){
		settings.counter = $(window).scrollTop() / settings.offset;
	},

	doScroll = function(){
		clearTimeout(settings.scrolling);
		settings.scrolling = setTimeout(function(){
			settings.animating = true;
			$(settings.animateTriggerElem).stop().animate({ 
				scrollTop: settings.counter * settings.offset 
			}, settings.speed, 
			function(){ 
				settings.tempPos = settings.counter; 
				settings.animating = false;
			});
		}, settings.animTimeOut);
	},

	isChrome = function(){
		return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	};

	return { init : init };
}();