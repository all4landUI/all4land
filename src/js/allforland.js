$(function(){
	
	// Header
	$('header.home nav').hover(function() {
		$('header.home nav ul ul').stop(true, false, true).slideToggle(300);			
	});
	
	// Image Slide
	$('.owl-carousel').owlCarousel({
      	stagePadding: 0,
		loop:true,
		margin:0,
		singleItem:true,
		slideSpeed : 1000,
    	paginationSpeed : 800,
		nav:true,
		navText: [
			"<i></i>",
			"<i></i>"
		],
		dots:true,
		responsive:{
			0:{items:1,
				stagePadding: 0},
			600:{items:1,
				stagePadding: 0},
			1000:{items:1,
				stagePadding: 0},
			1200:{items:1,
				stagePadding: 0},
			1400:{items:1,
				stagePadding: 0},
			1600:{items:1,
				stagePadding: 0},
			1800:{items:1,
				stagePadding: 0}
		}
  	});
	

	//Hoverdir
	$('section.business ul > li').each(function() {$(this).hoverdir();});
	//One Page
	$('.scoll-dots button').click( function() {
		
		var scrollPosition = $(this).attr('id');
		var slide = $('.' + scrollPosition).offset().top;
		
		$('html,body').animate({scrollTop: slide});
		$('.scoll-dots button').removeClass('current');
		$(this).addClass('current');
		return false;
	});

	$('.scroll-btn').click( function() {
		if($('main.main').length == 1){
			var slide = $('section.business').offset();
			var slidetop = slide.top;
			$('html,body').animate({scrollTop: slidetop});
			return false;	
		}
	});
	
	// Menu Open
	$('header .menu').click(function() {
		if($('header').hasClass('open')){
			$('header').removeClass('open sitemap').stop().animate({right:'-100%'});
			$('header.home .sub-menu').stop().slideUp(300);
			$('html').removeClass('fix');
			$('.dim').remove();
			$('.dim, .container, header').off('scroll touchmove mousewheel');
		}else{
			$('header').addClass('open').stop().animate({right:'0'});
			$('header.home .sub-menu').stop().slideDown(300);
			$('html').addClass('fix').find('body').before('<div class="dim"></div>');
			$('.dim').fadeIn();
			$('.dim, .container, header').on('scroll touchmove mousewheel', function(event) {
			  	event.preventDefault();
			  	event.stopPropagation();
			  	return false;
			});
		}
	});
	$('#layer-site-map').click(function(e) {
		e.preventDefault();
		$('html').addClass('fix');
		$('header').addClass('open sitemap').stop().animate({right:'0'});
		$('.container, header').on('scroll touchmove mousewheel', function(event) {
			event.preventDefault();
			event.stopPropagation();
			return false;
		});
	});

	// image_hide_show
	$('.hide_show-box').on('inview', function(event, isInView) {
	  if (isInView) {
	    $(this).addClass('inside')
	  } else {
	    // not
	  }
	});
	
	//parallax
	$(window).scroll(function(e) {
		var scrollWindow = $(window).scrollTop();
		var windowHeight = $(window).height();
		var oneStart = $('.company').outerHeight();
		var twoStart = $('.business').outerHeight();
		var threeStart = $('.solution').outerHeight();
		var fourStart = $('.client').outerHeight();
		var fiveStart = $('.recruit').outerHeight();

		if(scrollWindow >= 100){
			$('header').removeClass('home').addClass('side');
			$('aside').css('display','table');
			$('.scroll-bg .c-s1,.scroll-bg .c-s3,.scroll-bg .c-s6').css('top',-scrollWindow * 0.1 + 350);
			$('.scroll-bg .c-s2,.scroll-bg .c-s7').css('top',-scrollWindow * 0.1 + 350);
			$('.scroll-bg .c-s4,.scroll-bg .c-s5').css('top',scrollWindow * 0.1 - 350);
			$('.scroll-bg .c-all').css('top',-scrollWindow * 0.1 + 300);
			$('.symbol-client').css('top',scrollWindow * 0.1 - 100);
		}if(scrollWindow == 0){
			$('header').removeClass('side').addClass('home');
			$('header .sub-menu').hide();
			$('aside').css('display','none');
		}
		if(scrollWindow >= oneStart / 2){
			$('.business').offset().top;	
		}
		$('#contents > section').each(function() {
			var activeSection = $(this).attr('class');
			if ($(this).isInViewport()) {
				$('.scoll-dots button').removeClass('current');
				$('#'+activeSection).addClass('current');
			} else {
				$('#'+activeSection).removeClass('current');
			}
		});
	});
	
	AOS.init({
		easing: 'ease-in-out',
		once : true
	});
	
	//Client Symbol
	init3D();
	
	/*$('html,body').stop().animate({scrollTop : 0},100);
    num = Number($("#one").css('height').substr(0,3));
	 function oneStart(){
        $('html,body').stop().animate({scrollTop : 0},300);
    }*/
	
	// Drop Down
	$('.d-toggle').click(function() {
		$(this).toggleClass('open').siblings('ul').slideToggle();
	});	
	
});
//parallax Control
$.fn.isInViewport = function() {
  	var elementTop = $(this).offset().top;
  	var elementBottom = elementTop + $(this).outerHeight();
  	var viewportTop = $(window).scrollTop();
  	var viewportBottom = viewportTop + $(window).height();
  	return elementBottom > viewportTop && elementTop < viewportBottom;
};

//Client Symbol
function init3D() {
	var $workItem = $(".client");
	
    symbol1 = $('.symbol-client .c-s1'),
    symbol2 = $('.symbol-client .c-s2'),
    symbol3 = $('.symbol-client .c-s3'),
    symbol4 = $('.symbol-client .c-s4'),
    symbol5 = $('.symbol-client .c-s5');

  	TweenMax.set([symbol1, symbol2, symbol3, symbol4, symbol5], { transformStyle: 'preserve-3d' });

  	$workItem.mousemove(function(e) {
    	var sxPos = e.pageX / $(this).width() * 100 - 50;
    	var syPos = e.pageY / $(this).height() * 100 - 50;

		TweenMax.to(symbol1, 2, {
		  x: -sxPos * .3,
		  y: -syPos * .1,
		  transformPerspective: 500,
		  ease: Expo.easeOut
		});
		TweenMax.to(symbol2, 2, {
		  x: -sxPos * .6,
		  y: -syPos * .15,
		  transformPerspective: 500,
		  ease: Expo.easeOut
		});
		TweenMax.to(symbol3, 2, {
		  x: -sxPos * .3,
		  y: -syPos * .1,
		  transformPerspective: 500,
		  ease: Expo.easeOut
		});
		TweenMax.to(symbol4, 2, {
		  x: -sxPos * .6,
		  y: -syPos * .2,
		  transformPerspective: 500,
		  ease: Expo.easeOut
		});
		TweenMax.to(symbol5, 2, {
		  x: -sxPos * .3,
		  y: -syPos * .1,
		  transformPerspective: 500,
		  ease: Expo.easeOut
		});
	});
	

	$workItem.on("mouseleave", function() {
		TweenMax.to($(this).data("imgOuter"), 2, {
			rotationX: 0,
			rotationY: 0,
			//transformOrigin: origin,
			ease: Expo.easeOut
		});
	});
}
	


