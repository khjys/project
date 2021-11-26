;(function($, window, undefined){
	'use strict';
	
	if('undefined' === typeof window.UI){
		var UI = window.UI = {};
	}
	
	$(document).ready(function(){
		Layout.conSize();
		Layout.topGnb();
		Layout.topSiteMap();
		Layout.topLang();	
		Motion.scrollAni();
	});
	
	var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
			
	var Layout = UI.Layout = {
		bodyLoad : function(){
			$(window).load(function(){
				$("body").addClass("load");
			})
		},
		bodyScroll : function(){
			$(window).scroll(function(){
				var ST = $(window).scrollTop()
				if(ST > 0){
					$("body").addClass("scroll");
				}else{
					$("body").removeClass("scroll");
				}
			})	
		},
		conSize : function(){			
			$(window).bind('ready resize', function(){
				var winW = $(window).width();
				var winH = $(window).height();
				var headerH = $("#header").outerHeight();		
				var footerH = $("#footer").outerHeight();
				
				$("#contents").css({"min-height":winH-headerH,"padding-top":headerH});				
			});
		},
		topGnb : function(){
			var header = $("#header");
			var gnb = $("#header .gnb_wrap .gnb");	
			var gnbDP2 = $("#header .gnb_wrap .gnb .dp2");
			
			gnb.mouseenter(function(){				
				gnbDP2.slideDown(200);
				header.addClass("gnbOpen");					
			}).mouseleave(function(){
				gnbDP2.stop().slideUp(100);	
				header.removeClass("gnbOpen");
			});	
		},
		topSiteMap : function(){
			var Btn = $("#header .etc_wrap .allBtn");
			if(isMobile.any()){
				return false;
			}else{
				Btn.click(function(){
					toggleClass(this,"html")
				});	
			}
		},
		topLang : function(){
			var Btn = $("#header .etc_wrap .lang");				
			var pcLang = function(){
				Btn.mouseenter(function(){				
					$(this).addClass("on");
				}).mouseleave(function(){
					$(this).removeClass("on")		
				});	
			};
			var mobileLang = function(){
				Btn.click(function(){
					$(this).toggleClass("on")
				});
			};		
			if(isMobile.any()){
				mobileLang();
			}else{
				pcLang();
			}		
		}
	}
	
	var Motion = UI.Motion = {
		scrollAni : function(){
			var $obj = $( '*[data-animation]' );			
			var winH = $(window).height()
			$obj.each( function( i, el ) {
				var $el = $( el ),
					aniClass = $el.data('animation'),
					$delay = $el.data('delay'),
					$duration = $el.data('duration'),
					check = true;
				
				if($delay>0){
					$el.css({
						'-webkit-animation-delay':$delay+'s',
						'animation-delay':$delay+'s'
					})
				}
				if($duration>0){
					$el.css({
						'-webkit-animation-duration':$duration+'s',
						'animation-duration':$duration+'s'
					})
				}	
				
				var objT = $el.offset().top;
				if(objT > winH){
					$el.addClass('wait-animation');
				}
				$el.addClass('animated '+aniClass);
	
				$el.waypoint(function(){
					if(check){
						check = false;
						$el.removeClass('wait-animation');
					}else{
						$el.toggleClass("on");
					};
				}, { offset: '100%' });
			});
		},
		linkScroll : function(no){
			var Y = $(".linkScroll[data-no='"+no+"']").offset().top;
			var headerH = $("#header").outerHeight();
			$('body, html').animate({ scrollTop: Y-headerH }, 500);
		},
		scrollFix : function(obj,p){
			var offset = $(obj).offset().top;
			var objH = $(obj).outerHeight();			
			var docH = $(document).height();
			if(!p){
				p = 0;
			}			
			var footerH = $("#footer").outerHeight()+p;
			var headerH = $("#header").outerHeight();
			$(window).scroll(function(){
				var scrollT = $(window).scrollTop()				
				if(scrollT > docH - footerH - objH){
					$(obj).addClass("bottom");
					$(obj).css("top","auto");
				}else if(scrollT > offset-headerH){
					$(obj).removeClass("bottom").addClass("scroll");					
					$(obj).css("top",headerH+20);
				}else{
					$(obj).removeClass("bottom").removeClass("scroll");
					$(obj).css("top",0);
				}
			})			
		},
		scrollCheck : function(obj,nav){
			$(window).scroll(function(){
			var scrollTop = $(window).scrollTop();
			var winH = $(window).height();
			var headerH = $("#header").outerHeight();
			$(obj).each(function(){
				var idx = $(this).data("no");
				var Offset = $(this).offset().top;
				var VA = scrollTop+((winH-headerH)*.2);
				var H = $(this).outerHeight();
				if(VA > Offset){
					$(nav).removeClass("on")
					$(nav+"[data-no='"+idx+"']").addClass("on")
				}
			})
			})	
		},
		stellarAni : function(){
			var stella = function(){
				$.stellar({
					horizontalScrolling: false,		
					hideDistantElements: false,	
					responsive: true,
					verticalOffset: 150
				});
			};
			if(isMobile.any()){
				return false;
			}else{
				stella();
			}
		},
		ieFixed : function(){
			if(navigator.userAgent.match(/Trident\/7\./)) {
				$('body').on("mousewheel", function () {
					event.preventDefault();			
					var wheelDelta = event.wheelDelta;			
					var currentScrollPosition = window.pageYOffset;
					window.scrollTo(0, currentScrollPosition - wheelDelta);
				});			
//				$('body').keydown(function (e) {
//					e.preventDefault();
//					var currentScrollPosition = window.pageYOffset;			
//					switch (e.which) {			
//						case 38:
//							window.scrollTo(0, currentScrollPosition - 120);
//							break;			
//						case 40:
//							window.scrollTo(0, currentScrollPosition + 120);
//							break;			
//						default: return;
//					} 
//				});
			}
		}
	}
	var Slider = UI.Slider = {
		mainVisual : function(){
			var Wrap = $(".mainVisual_wrap");
			var slideWrap = $(".mainVisual_wrap .mainVisual");
			var html = $("#slogan_wrap").html();
			Wrap.find(".slogan_wrap").append(html);
			slideWrap.slick({
				fade: true,
				arrows: false,
				dots: true,
				autoplay: true,			
				autoplaySpeed: 4000,	
				speed: 500,
				prevArrow: Wrap.find('.arrow_wrap .prev'),
				nextArrow: Wrap.find('.arrow_wrap .next')
			});				
			slideWrap.find('.item').eq(0).addClass('activeAni');			
			slideWrap.on('beforeChange', function(event, slick, currentSlide, nextSlide){
				$(this).find('.item').eq(nextSlide).addClass('activeAni').siblings().removeClass('activeAni');
			});
			$(window).bind('ready resize', function(){				
				var winH = $(window).height();
				var headerH = $("#header").outerHeight();				
				$(".mainVisual_wrap, .mainVisual_wrap .mainVisual, .mainVisual_wrap .mainVisual .item").css("height",winH-headerH);	
			});
		},		
		profileImg : function(){
			var Wrap = $(".healerSlide_wrap");
			var slideFor = $(".healerSlide_wrap .slider_for");
			var slideNav = $(".healerSlide_wrap .slider_nav");
			var html = slideFor.html();
			slideNav.append(html);
			slideFor.slick({
				infinite: false,							
				autoplay: true,	
				asNavFor: slideNav,
				prevArrow: Wrap.find('.arrow_wrap .prev'),
				nextArrow: Wrap.find('.arrow_wrap .next')
			});
			slideNav.slick({
				infinite: false,			
				arrows: false,				
				slidesToShow: 5,
  				slidesToScroll: 1,				
				focusOnSelect: true,
				asNavFor: slideFor
			});	
			slideNav.on('mouseenter', function(){
				slideFor.slick('slickPause');
			});
			slideNav.on('mouseleave', function(){
				slideFor.slick('slickPlay');
			});
		}
	}
	
})(jQuery, window);