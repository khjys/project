;(function($, window, undefined){
	'use strict';
	
	if('undefined' === typeof window.UI){
		var UI = window.UI = {};
	}
	$(function(){
		Layout.bodyLoad();
		Layout.bodyScroll();
		Layout.bodyClass();
		Layout.headerGnb();
		Layout.contentSize();
		Layout.contentGnb();
		Layout.navGnb();
		Layout.quickShow();
	});
	
	$(document).ready(function(){		
		
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
				var scrollTop = $(window).scrollTop()
				scrollTop > 0 ? $("body").addClass("scroll") : $("body").removeClass("scroll");
			})	
		},
		bodyClass : function(){
			function resizeLinks(){
				var winW = $(window).width();
				if(isMobile.any() || winW <= 1024){
					$("body").addClass("bodyMobile").removeClass("bodyPC");			
				}else{
					$("body").removeClass("bodyMobile").addClass("bodyPC");	
				}
			}
			$(document).ready(function(){
				resizeLinks();
			});			
			$(window).resize(function(){
				resizeLinks();
			});
		},
		telLink : function(no,obj){
			if(isMobile.any()){
				var tel = no.split('-');
				$(obj).attr("href","tel:"+tel[0]+tel[1]+tel[2]);
			}else{
				return false;
			}
		},
		contentSize : function(){			
			function resizeLinks(){
				var winW = $(window).width();
				var winH = $(window).height();
				var contents = $("#contents");
				var headerH = $("#header").outerHeight();		
				var footerH = $("#footer").outerHeight();
				if(isMobile.any() || winW <= 1024){
					contents.css({"min-height":winH-headerH-footerH});
				}else{
					contents.css({"min-height":winH});
				}
			}
			$(document).ready(function(){
				resizeLinks();
			});			
			$(window).resize(function(){
				resizeLinks();
			});
		},
		headerFix : function(){
			var wrap = $("body");
			var header = $("#header");
			var contents = $("#contents");
			var headH = header.outerHeight();
			var offset = $("#header .gnb_wrap").offset().top;			
			$(window).on({
				scroll : inEvent,
				resize : inEvent
			});			
			function inEvent(){
				var scrollT = $(window).scrollTop();
				if(scrollT >= offset){					
					wrap.addClass("wrapFix");										
					contents.css("padding-top",headH);
				}else{
					wrap.removeClass("wrapFix");
					contents.css("padding-top","0");
				}
			}
		},
		headerGnb : function(){
			var wrap = $("body");		
			var headerU = $("#header .gnb_wrap .util");
			var gnbWrap = $("#header .gnb_wrap .gnbDp2_on");
			var gnb = $("#header .gnb_wrap .gnb");
			var gnbDp1 = $("#header .gnb_wrap .gnb > li");
			var gnbDp2 = $("#header .gnbDp2_wrap .gnb > li");			
			
			gnbDp1.each(function(i){
				$(this).attr("data-index", i);
			});
			gnbDp2.each(function(i){
				$(this).attr("data-index", i);
			});
				
			gnbDp1.mouseenter(function(){
				var thisIndex = $(this).attr("data-index");
				gnbDp1.eq(thisIndex).addClass("hover").siblings().removeClass("hover");
				gnbDp2.eq(thisIndex).addClass("open").fadeIn(200).siblings().removeClass("open").hide();
				wrap.addClass("gnb_open");
				
				var dp1Tit = $(this).find(".dp1 .va").text();
				$("#header .gnbDp2_wrap .gnb_tit").attr("data-index", thisIndex);
				$("#header .gnbDp2_wrap .gnb_tit .tt").text(dp1Tit);
			});
			
			function closeEvent(){
				gnbDp2.hide();
				gnbDp1.removeClass("hover");
				wrap.removeClass("gnb_open");
			}			
			gnbWrap.mouseleave(function(){		
				closeEvent();
			});
			headerU.mouseenter(function(){
				closeEvent();
			});	
		},
		contentGnb : function(){
			var wrap = $("#contents .sub_page_menu .menu .def");
			var obj = $("#contents .sub_page_menu .menu .def ul > li > a");
			function resizeLinks1(){
				var winW = $(window).width();
				obj.each(function(){
					var leng = $(this).next("ul").children("li").length;
					if( leng > 0){
						$(this).addClass("plus");
						if(isMobile.any() || winW <= 1024){
							$(this).parent("li").removeClass("hover");
						}else{							
							$(this).parent("li").addClass("hover");
						}
					}
				})
			}
			function resizeLinks2(){
				var winW = $(window).width();				
				wrap.each(function(){								
					if(isMobile.any() || winW <= 1024){
						$(this).addClass("click");
					}else{	
						wrap.removeClass("click");
					}
				})
			}
			wrap.each(function(){
				$(this).click(function(){
					if($(this).hasClass("click")){				
						$(this).toggleClass("open");
						$(this).siblings("").removeClass("open");
					}
				})					
			})
			$(document).ready(function(){
				resizeLinks1();
				resizeLinks2();
			});			
			$(window).resize(function(){
				resizeLinks1();
				resizeLinks2();
			});
		},
		navGnb : function(){			
			var obj = $("#nav .gnb .dp1");			
			function resizeLinks(){
				var winW = $(window).width();
				obj.each(function(){
					var leng = $(this).next(".dp2").find("li").length;					
					if(isMobile.any() || winW <= 1024){
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
				resizeLinks();				
			});			
			$(window).resize(function(){
				resizeLinks();
			});
		},
		quickShow : function(){			
			var obj = $("#header");
			function resizeLinks(){
				var winW = $(window).width();				
				if($("body").hasClass("main")){
					var W = 1680;
				}else{
					var W = 1663;
				}
				if(winW <= W){
					obj.removeClass("quick_close");
					$(".quick_layer #quick .quick_btn").attr("onClick","toggleClass(this,'#header','quick_open');");
				}else{
					obj.removeClass("quick_open");
					$(".quick_layer #quick .quick_btn").attr("onClick","toggleClass(this,'#header','quick_close');");
				}
			};
			$(document).ready(function(){
				resizeLinks();
			});
			$(window).resize(function(){
				resizeLinks();
			});
		},
		mainConSize : function(){	
			var obj = $(".main_con_col .menu_wrap > li:nth-child(1)");
			function resizeLinks(){			
				var winW = $(window).width();		
				var popH = $(".main_con_col .popZone_wrap .pop_slide .item .in").outerHeight();
				if(isMobile.any()){
					var resW = 768;
				}else{
					var resW = 768-17;
				}
				if(winW <= resW){
					obj.height(popH);
				}else{
					obj.height("");
				}
			};
			$(document).ready(function(){
				resizeLinks();				
			});			
			$(window).resize(function(){
				resizeLinks();
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
				if(objT > winH){
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
				}, { offset: '100%' });
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
			if(!(isMobile.any()) && !($('body').hasClass('pop')) && !(winW <= 1024)){				
				fix();
				$('.js_mouse_wheel').mouse_wheel();
			}
		}		
	}
	var Slider = UI.Slider = {
		mainVisual : function(){
			var Wrap = $(".main_visual");
			var SlideWrap = $(".main_visual .visual");			
			SlideWrap.slick({
				fade: true,
				arrows: false,
				dots: false,
				autoplay: true,			
				autoplaySpeed: 4000,				
				prevArrow: Wrap.find('.arrow_wrap .prev'),
				nextArrow: Wrap.find('.arrow_wrap .next')
			});	
			function resizeLinks(){
				var winW = $(window).width();
				var winH = $(window).height();
				var headerH = $("#header").outerHeight();
				var secH = $(".main #section0").height();
				if(winW >= 1441){
					SlideWrap.find(".slick-track, .item").css({"height":winH});
				}else{
					SlideWrap.find(".slick-track, .item").css({"height":secH});
				}
			};
			$(document).ready(function(){
				resizeLinks();				
			});			
			$(window).resize(function(){
				resizeLinks();
			});
		},	
		mainPopupzone : function(){
			var Wrap = $(".popZone_wrap");
			var SlideWrap = $(".popZone_wrap .pop_slide");
			SlideWrap.slick({
				fade: false,
				arrows: false,
				dots: true,
				autoplay: true,			
				pauseOnHover: true,
				autoplaySpeed: 6000,
				appendDots: Wrap.find('.control_box')
			});	
			Wrap.find('.control_box .btn').clickToggle(function(){
				SlideWrap.slick('slickPause');
				$(this).find(".xi").removeClass("xi-pause").addClass("xi-play");
			},function(){				
				SlideWrap.slick('slickPlay');
				$(this).find(".xi").removeClass("xi-play").addClass("xi-pause");
			});
		},
		familySlide : function(){
			var Wrap = $("#footer .family_wrap");
			var SlideWrap = $("#footer .family_wrap .family");	
			SlideWrap.slick({
				slidesToShow: 5,
		  		slidesToScroll: 1,
				autoplay: true,	
				pauseOnHover: true,
				prevArrow: Wrap.find('.arrow_wrap .prev'),
				nextArrow: Wrap.find('.arrow_wrap .next'),
				responsive: [
				{
				breakpoint: 1025,
				settings: {
					slidesToShow: 5,
				}
				},
				{
				breakpoint: 769,
				settings: {
					slidesToShow: 3,
				}
				},
				{
				breakpoint: 520,
				settings: {
					slidesToShow: 2,
				}
				}
				]
			});			
			Wrap.find('.arrow_wrap .btn').clickToggle(function(){
				SlideWrap.slick('slickPause');
				$(this).find(".xi").removeClass("xi-pause").addClass("xi-play");
			},function(){				
				SlideWrap.slick('slickPlay');
				$(this).find(".xi").removeClass("xi-play").addClass("xi-pause");
			});
		},	
		searchKeyword : function(){
			var Wrap = $(".section_search .search_top .keyword_area");
			var SlideWrap = $(".section_search .search_top .keyword_slide");
			var List = $(".section_search .search_top .keyword_all .list");
			var Html = SlideWrap.html();
			List.append(Html);
			SlideWrap.slick({
				fade: false,
				vertical : true,
				arrows: true,
				dots: false,
				autoplay: true,			
				pauseOnHover: true,				
				prevArrow: Wrap.find('.arrow_wrap .prev'),
				nextArrow: Wrap.find('.arrow_wrap .next')
			});	
		}
	}	
})(jQuery, window);