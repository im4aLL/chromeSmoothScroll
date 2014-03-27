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
		maxVal             : $(window).height(),
		scrolling          : null,
		speed              : 800,
		offset             : 100,
		scrollHappen       : false,
		animTimeOut        : 50,
		mainTriggerElem    : 'html',
		animateTriggerElem : 'html, body',
		tempPos			   : 0
	},

	init = function(){
		if( !isChrome() ) return false;

		$(settings.mainTriggerElem).bind('mousewheel', function(e){ 
			e.preventDefault();

			if( settings.scrollHappen == false && $(window).scrollTop() != 0 ) updateCounter();
			settings.scrollHappen = true;

			if( e.originalEvent.wheelDelta  > 0 ) settings.counter--;
			else if( e.originalEvent.wheelDelta  < 0 ) settings.counter++;

			if( settings.counter < settings.minVal ) settings.counter = 0;
			else if( settings.counter > settings.maxVal ) settings.counter = settings.maxVal;

			console.log( settings.counter );

			if( settings.tempPos != settings.counter ) {
				clearTimeout(settings.scrolling);
				doScroll();	
			}

		});

		$(window).scroll(function(event) {
			updateCounter();
		});
	},

	updateCounter = function(){
		settings.counter = $(window).scrollTop() / settings.offset;
	},

	doScroll = function(){
		settings.scrolling = setTimeout(function(){
			$(settings.animateTriggerElem).stop().animate({ scrollTop: settings.counter * settings.offset }, settings.speed, function(){ settings.tempPos = settings.counter });
		}, settings.animTimeOut);
	},

	isChrome = function(){
		return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	};

	return { init : init };
}();