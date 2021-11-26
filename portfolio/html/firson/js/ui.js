;(function($, window, undefined){
	'use strict';
	
	if('undefined' === typeof window.UI){
		var UI = window.UI = {};
	}
	$(function(){
		Layout.bodyEvent();
		Layout.conSize();
		Layout.headGnb();
		Layout.gnbPlus();
		Layout.m_gnbNav();
	});
	
	$(document).ready(function(){		
		
	});			
	var Layout = UI.Layout = {
		bodyEvent : function(){	
			function inLoad(){
				$("body").addClass("load");
			}		
			function inScroll(){
				var scrollTop = $(window).scrollTop()
				scrollTop > 0 ? $("body").addClass("scroll") : $("body").removeClass("scroll");
			}
			function inRes(){
				var winW = $(window).width();
				if(isMobile || winW <= 1024){
					$("body").addClass("bodyMobile").removeClass("bodyPC");			
				}else{
					$("body").removeClass("bodyMobile").addClass("bodyPC");	
				}
			}
			$(window).load(function(){
				inLoad();
			})
			$(window).scroll(function(){
				inScroll();				
			});
			$(document).ready(function(){
				inScroll();
				inRes();
			});			
			$(window).resize(function(){
				inRes();
			});
		},
		conSize : function(){			
			function inEvent(){
				var winW = $(window).width();
				var winH = $(window).height();
				var contents = $("#contents");
				var headerH = $("#header").outerHeight();		
				var footerH = $("#footer").outerHeight();
				
				contents.css({"min-height":winH - footerH});
			}
			
			$(document).ready(function(){
				inEvent();
			});			
			$(window).resize(function(){
				inEvent();
			});
		},
		headGnb : function(){
			var obj = $("#header .gnb_wrap .gnb > li");
			var header = $("#header");
			function inScroll(){
				if($("body").hasClass("scroll")){
					header.addClass("active");
				}else{
					header.removeClass("active");
					if(header.hasClass("gnbOpen")){
						header.addClass("active");
					};
				}
			}
			function inReady(){
				obj.mouseenter(function(){
					header.addClass("active").addClass('gnbOpen');
				}).mouseleave(function(){
					header.removeClass('active').removeClass('gnbOpen');
					if($("body").hasClass("scroll")){
						header.addClass("active");
					}
				});			
			}
			$(window).scroll(function(){
				inScroll();
			});	
			$(document).ready(function(){
				inScroll();
				inReady();
			});			
		},
		gnbPlus : function(){
			var obj = $(".gnb li");
			obj.each(function(){
				var leng = $(this).children("ul").children("li").length;
				if(leng > 0){
					$(this).addClass("plus");
				}else{
					$(this).removeClass("plus");
				}
				if(leng == 0){
					$(this).children("ul").remove();
				}
			});
		},
		m_gnbNav : function(){	
			var obj = $("#nav .gnb .dp1");
			function inEvent(){
				var winW = $(window).width();
				obj.each(function(){
					var leng = $(this).next(".dp2").find("li").length;					
					if(isMobile || winW <= 1024){
						if( leng > 0){		
							$(this).attr("href","javascript:void(0)").addClass("arrow");
							if($(this).attr("target")){
								$(this).removeAttr("target")
							}
						}						
					}else{	
						obj.removeClass("arrow");
						obj.parent("li").removeClass("active");
					}
				})
			};			
			obj.each(function(){
				$(this).click(function(){
					if($(this).hasClass("arrow")){				
						$(this).parent("li").toggleClass("active");
						$(this).parent("li").siblings("").removeClass("active");
					}
				})					
			})
			$(document).ready(function(){
				inEvent();				
			});			
			$(window).resize(function(){
				inEvent();
			});
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
				if(objT >= winH*0.9){
					$el.addClass('wait-animation');
				}
				$el.addClass('animated '+aniClass);
	
				$el.waypoint(function(){					
					if(check){
						check = false;
						$el.removeClass('wait-animation');							
					}else{
						//$el.toggleClass("on");						
					};
				}, { offset: '90%' });
			});
		},
		ieFixed : function(){
			var fix = function(){
				if(navigator.userAgent.match(/Trident\/7\./)) {
					$('body').on("mousewheel", function () {
						event.preventDefault();			
						var wheelDelta = event.wheelDelta;			
						var currentScrollPosition = window.pageYOffset;
						window.scrollTo(0, currentScrollPosition - wheelDelta);						
					});
				}
			};			
			
			$.fn.extend({
				mouse_wheel: function() {
					$(this).on('mousewheel', function(e) {						
						if (e.originalEvent.wheelDelta >= 120) {
							this.scrollTop -= 50;
						} else if (e.originalEvent.wheelDelta <= -120) {
							this.scrollTop += 50;
						}
						return false;
					});
				}
			});			 
			
			var winW = $(window).width();
			if(!(isMobile) && !($('body').hasClass('pop')) && !(winW <= 1024)){				
				fix();
				$('.js_mouse_wheel').mouse_wheel();				
				$('textarea').mouse_wheel();
			}
		},
		skrInit : function(){
			$(document).ready(function(){		
				var skr = skrollr.init({
					smoothScrolling: false,
					forceHeight: false
				});	
			})
		}	
	}
	var Slider = UI.Slider = {
		mainVisual : function(){
			var Wrap = $(".main_visual_wrap");
			var SlideWrap = Wrap.find(".visual");			
			SlideWrap.slick({
				fade: true,
				arrows: true,
				dots: true,
				autoplay: true,			
				autoplaySpeed: 4000,
				speed: 500,
				appendDots: Wrap.find('.dot_wrap'),						
				prevArrow: Wrap.find('.control_box .prev'),
				nextArrow: Wrap.find('.control_box .next')				
			});	
			//products
			var slideWrap = $('.main_prod_slide');
			var slide = slideWrap.find('.slides');
			slide.slick({
				dots: true,
				infinite: true,
				speed: 500,
				slidesToShow: 2,
				arrows: false,
				autoplay: true,
				autoplaySpeed: 4000
			});				
			SlideWrap.on('afterChange',function(){
				Wrap.find(".progress").addClass('proAni');
			});
			SlideWrap.on('beforeChange',function(){
				Wrap.find(".progress").removeClass('proAni');
			});
			Wrap.find('.control_box .pause').clickToggle(function(){
				SlideWrap.slick('slickPause');
				$(this).find(".xi").removeClass("xi-pause").addClass("xi-play");
			},function(){				
				SlideWrap.slick('slickPlay');
				$(this).find(".xi").removeClass("xi-play").addClass("xi-pause");
			});
			
			SlideWrap.find('.el').eq(0).addClass('activeAni');			
			SlideWrap.on('beforeChange', function(event, slick, currentSlide, nextSlide){				
				SlideWrap.find('.el').removeClass('activeAni');
				SlideWrap.find('.el').eq(nextSlide).addClass('activeAni');
			});	
		}
	}	

})(jQuery, window);