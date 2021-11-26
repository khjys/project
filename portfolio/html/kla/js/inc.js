// JavaScript Document

//확대 축소
(function () {
	var _common = {};
	var nowZoom = 100;
	var nowZoomML = 0;
	var nowZoom_f = 1;
	var sizeType = 0;
	_common.isMobile = false;
	_common.zoomcontrol = {
			zoomout : function(){
				nowZoom = nowZoom - 10;
				nowZoomML = ( 100 - nowZoom )/2;
				nowZoom_f /=1.2;
				if(nowZoom <= 70) nowZoom = 70;
				_common.zoomcontrol.zooms();
				return false;
			},
			zoomin : function(){
				nowZoom = nowZoom + 10;
				nowZoomML = ( 100 - nowZoom )/2;
				nowZoom_f *=1.2;
				if(nowZoom >= 150) nowZoom = 150;
				_common.zoomcontrol.zooms();
				return false;
			},
			zoomreset : function(){
				nowZoom = 100;
				nowZoomML = 0;
				nowZoom_f =1;
				_common.zoomcontrol.zooms();
				return false;
			},
			zooms : function(){
				document.body.style.zoom = nowZoom + '%';
				document.body.style.MozTransform = 'scale('+nowZoom_f+')';  // Mozilla(firefox)
				document.body.style.MozTransformOrigin = '0 0';
				document.body.style.OTransform = 'scale('+nowZoom_f+')';  // Opera
				document.body.style.OTransformOrigin = '0 0';				

				if($('html').hasClass('ie')) {
					document.body.style.marginLeft = nowZoomML + '%';					
				}

				setTimeout(function() {
					if(nowZoom==70){
						alert ("30% 축소 되었습니다. 더 이상 축소할 수 없습니다.");
					}
					if(nowZoom==150){
						alert ("150% 확대 되었습니다. 더 이상 확대할 수 없습니다.");
					}
				}, 500)
			}
	};

	if (typeof uw == 'undefined') {
		window.uw = {};
	}
	uw = _common;
	zoomcontrol = _common.zoomcontrol;
})();






//equalizeHeights
$.fn.equalizeHeights = function() { 
var maxHeight = this.map(function( i, e ) {
return $( e ).outerHeight();
}).get();
return this.outerHeight( Math.max.apply( this, maxHeight ) );
};

function equalH(t){
	if(t==null){
	t=".equalH"
	}
	$(""+t+"").equalizeHeights();
}

function toggleC(t){
	if(t==null){
	t=".toggle"
	}
	$(""+t+"").toggleClass("on")
}


//gotop
function goTop() {
	$('body, html').animate({ scrollTop: $("body").offset().top }, 500); 
}


//tab
$(function(){
	$(".tab_idx.over > li").each(function () {
		}).mouseenter(function () {
		var n = $(this).index();
		$(this).parents(".wrap_idx").find(".con_idx .idx").removeClass("on");
		$(this).parents(".wrap_idx").find(".con_idx .idx:eq("+n+")").addClass("on");
		$(this).parents(".wrap_idx").find(".tab_idx > li").removeClass("on");
		$(this).addClass("on");
	});
	$(".tab_idx.click > li").each(function () {
		}).click(function () {
		var n = $(this).index();
		$(this).parents(".wrap_idx").find(".con_idx .idx").removeClass("on");
		$(this).parents(".wrap_idx").find(".con_idx .idx:eq("+n+")").addClass("on")
		$(this).parents(".wrap_idx").find(".tab_idx > li").removeClass("on");
		$(this).addClass("on");
	});
});

//pop
function layerOpen(url){
	var bg = '<div class="layer_bg" onclick="layerClose()"></div>'
	var frame ='<iframe class="layer_frame" src="'+url+'" frameborder="0" scrolling="no" allowtransparency="true"></iframe>'
	var wrap = '<div class="layer_wrap">'+bg+frame+'</div>'
	$("body").append(wrap);
	$("html").css("overflow-y","hidden");
	layerLoad()
};
function layerLoad(){
	$(".layer_frame").load(function(){
		$(".layer_wrap").addClass("on")
		var obj = $(".layer_frame").contents().find('.popIn');
		var btnClose = "<a href='javascript:parent.layerClose()' class='popClose'>&Cross;</a>"
		obj.append(btnClose)
	})
}

function layerClose(){
	$(".layer_wrap").remove()
	$("html").css("overflow-y","scroll");
};

function popOpenC(u,w,h){
	var winW = window.screen.width;
	var winH = window.screen.height;
	var L = (winW-w)/2
	var T = (winH-h)/2
	window.open(u,'','width='+w+',height='+h+',left='+L+',top='+T+', status=yes, toolbar=no, menubar=no, location=no, scrollbars=yes')
}

//
//function imgThumb(obj){
//	var src = $(obj).find("img").attr("src");
//	var target = $(obj).parent(".small").next(".big").find(".imgBig");
//	target.attr("src",src);
//	$(obj).siblings().removeClass("on");
//	$(obj).addClass("on");
//}




//
function imgResize(r,t){
	function resize(){
		if(r==null){
		r=0.6666
		}
		if(t==null){
		t=".img_resize"
		}
		$(""+t+"").each(function (i) {
			var imgW = $(this).width();
			$(this).height(imgW*r)
		});
		
	}
	$(document).ready(function(){
		resize()
	})
	$(window).resize(function(){
		resize()
	})
}

function memFind(){
	$(".memFindWrap").slideToggle()
	$(".memFindWrapHide").slideToggle()
}






//gall_thumb 영상갤러리//
function resize_gall(){
	$(".resize_gall").css("overflow","hidden");
	$(".resize_gall img").css("width","100%")
	function resize(){
		$(".resize_gall").each(function (i) {
			var imgW = $(this).width();
			$(this).height(imgW*0.5666)
			$(this).find("img").css("min-height",imgW*0.5666)
		});
	}
	function resize2(){
		$(".resize_gall").each(function (i) {
			var imgW = $(this).width();
			var imgH = $(this).find("img").height();
			if(imgW < imgH || imgW == imgH){
				var gap = (imgH - $(".resize_gall").height())/2
				$(this).find("img").css("margin-top","-"+gap+"px")
			}
		});
	}
	$(window).load(function(){
		resize()
		resize2()
	})
	$(window).resize(function(){
		resize()
		resize2()
	})
}


//메인영상갤러리//
function resize_gall2(){
	$(".resize_gall2").css("overflow","hidden");
	$(".resize_gall2 img").css("width","100%")
	function resize(){
		$(".resize_gall2").each(function (i) {
			var imgW = $(this).width();
			$(this).height(imgW*0.4666)
			$(this).find("img").css("min-height",imgW*0.4666)
		});
	}
	function resize2(){
		$(".resize_gall2").each(function (i) {
			var imgW = $(this).width();
			var imgH = $(this).find("img").height();
			if(imgW < imgH || imgW == imgH){
				var gap = (imgH - $(".resize_gall2").height())/2
				$(this).find("img").css("margin-top","-"+gap+"px")
			}
		});
	}
	$(window).load(function(){
		resize()
		resize2()
	})
	$(window).resize(function(){
		resize()
		resize2()
	})
}





//agreeAll 체크박스//
function agreeCheck(){
	var checkbox = "#contents input.agreeCheck"
	var checkboxAll = "#contents input.agreeAll"
	var wrapBtn = "#contents .agree_btn_wrap"
	var wrapAll = "#contents .agree_all_wrap"
	var wrap = "#contents .agree_wrap .agree"
	var onClass = "on"
	$(checkbox).click(function(){
		var length = $(checkbox).length
		var lengthCheck = $(checkbox+":checked").length
		var lengthEss = $(checkbox+".ess").length
		var lengthCheckEss = $(checkbox+":checked.ess").length
		if(lengthEss == lengthCheckEss){
			$(wrapBtn).addClass(onClass)
		}else{
			$(wrapBtn).removeClass(onClass)
		}
		if(length == lengthCheck){
			$(wrapAll).addClass(onClass)
			$(checkboxAll).prop("checked","checked")
		}else{
			$(wrapAll).removeClass(onClass)
			$(checkboxAll).removeProp("checked","checked")
		}
		if($(this).parents(wrap).hasClass(onClass)){
			$(this).parents(wrap).removeClass(onClass)
		}else{
			$(this).parents(wrap).addClass(onClass)
		}
	})
	$(checkboxAll).click(function(){
		if($(this).prop("checked")==true){
			$(wrapBtn+","+wrapAll+","+wrap).addClass(onClass)
			$(checkbox).prop("checked","checked")
		}else{
			$(wrapBtn+","+wrapAll+","+wrap).removeClass(onClass)
			$(checkbox).removeProp("checked","checked")
		}
	})
}
function findCheck(){
	var radio = "#contents input.radioCheck"
	var wrap = ".radioCheckWrap"
	var wrapForm = ".radioCheckForm"
	var onClass = "on"
	$("#contents input.radioCheck").click(function(){
		if($(this).hasClass(onClass)){}else{
			if($(this).prop("checked")==true){
				$(radio).removeClass(onClass)
				$(this).addClass(onClass)
				$(wrap).next(wrapForm).slideUp()
				$(this).parents(wrap).next(wrapForm).slideDown()
			}
		}
	})
}




//모바일 네비//