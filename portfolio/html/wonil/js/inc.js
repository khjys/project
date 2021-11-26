// JavaScript Document

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

//gotop
function goTop() {
	$('body, html').animate({ scrollTop: $("#contents").offset().top }, 500); 
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
function imgThumb(obj){
	var src = $(obj).find("img").attr("src");
	var target = $("#imgBig");
	target.attr("src",src);
	$(obj).siblings().removeClass("on");
	$(obj).addClass("on");
}


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



//인증서페이지 
function layer_open2(obj){
	var maxH = $(window).height();
	var src = $(obj).find("img").attr("src");
	var layer_frame = '<div class="layer_img" style="position:fixed; width:90%; text-align:center; left:5%; top:5%; z-index:10000000000;cursor:pointer"><img src='+src+' class="img_file" style="max-height:100%" /></div>'
	var layer_bg = '<div class="layerImg_bg" style="cursor:pointer"></div>';

	$("body").append(layer_bg, layer_frame);
	$(".layerImg_bg").fadeIn(400);
	var imgH = $(".layer_img").height()/2
	if(imgH*2 > maxH){
		$(".layer_img").css("height","90%")
	}else{
		$(".layer_img").css("top","50%").css("margin","-"+imgH+"px 0 0 0")
	}
	$(".layerImg_bg, .layer_img").click(function(){
		layer_close2();
	});
};
function layer_close2(){
	$(".layerImg_bg, .layer_img").fadeOut(500,function(){
		$(".layerImg_bg, .layer_img").remove()
	})
};

//img_resize
function img_resize_gall(){
	$(".resize_gall").css("overflow","hidden");
	$(".resize_gall img").css("width","100%")
	function resize(){
		$(".resize_gall").each(function (i) {
			var imgW = $(this).width();
			$(this).height(imgW*0.69444)
			$(this).find("img").css("min-height",imgW*0.69444)
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




