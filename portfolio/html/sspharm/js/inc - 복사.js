// JavaScript Document

var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
$(function(){
	isPop = $("body").hasClass("pop");
});

//gotop
function goTop() {
	if(isPop){
		$("#mCSB_1_container").animate({ top: 0 }, 500);
	}else{
		$('body, html').animate({ scrollTop: 0 }, 500);
	}
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

//gnb
$(function(){
	headerGnb();
	$(".fWrap").on("focusout", function(){
		$(this).removeClass("fOn")
	});
	$(".fWrap").on("focusin", function(){
		$(this).addClass("fOn")
	});
})

function headerGnb(){
	var wrap = $("#header .gnb_wrap .gnb");
	var obj = $("#header .gnb_wrap .gnb .dp2, #header .gnb_wrap .gnbBg");
	obj.equalizeHeights();
	wrap.on("mouseenter focusin",function(){
		obj.slideDown(200)
	})
	wrap.on("mouseleave",function(){
		obj.stop().slideUp(200)
	})
	wrap.find("li:visible:last .dp2 > li:last-child").on("focusout",function(){
		obj.stop().slideUp(200)
	})
};




//pop
function layerOpen(url){
	var bg = '<div class="layerBg"></div>'
	var frame ='<iframe class="layerFrame" src="'+url+'" frameborder="0" scrolling="no" allowtransparency="true"></iframe>'
	var wrap = '<div class="layerWrap">'+bg+frame+'</div>'
	$("body").append(wrap);
	$("html,body").addClass("hidden");
	$(".layerFrame").load(function(){
		$(".layerWrap").addClass("on")
	})
};
function layerClose(){
	$(".layerWrap").remove()
	$("html,body").removeClass("hidden");
};

function popOpenC(u,w,h){
	var winW = window.screen.width;
	var winH = window.screen.height;
	var L = (winW-w)/2
	var T = (winH-h)/2
	window.open(u,'','width='+w+',height='+h+',left='+L+',top='+T+', status=yes, toolbar=no, menubar=no, location=no, scrollbars=yes')
}






//
function checkWrap(i, obj, t){
	var wrap = $(".checkWrap");
	var check= $(obj).prop("checked");
	if(t==null){
		var target = ".check";
	}
	if(check==true){
		if(i=="all"){
			wrap.find(target).show();
		}else{
			wrap.find(target).hide();
			wrap.find(target+"[data-no='"+i+"']").show()
		}
	}
}
function toggleClass(obj,wrap,Class){
	if(!wrap){
		var wrap = (".toggleWrap");
	};
	if(!Class){
		var Class = "on";
	};
	$(obj).parents(wrap).toggleClass(Class);
}
function telLink(no,obj){
	if(isMobile) {
		var tel = no.split('-');
		$(obj).attr("href","tel:"+tel[0]+tel[1]+tel[2]);
	}
};
function linkScroll(no){
	var Y = $(".linkScroll[data-no='"+no+"']").offset().top;
	var headerH = 0;
	$('body, html').animate({ scrollTop: Y-headerH-20 }, 500);
}
function scrollFix(obj,p){
	var offset = $(obj).offset().top;
	var objH = $(obj).outerHeight();
	var docH = $(document).height();
	if(!p){
		p = 0;
	}
	var footerH = $("#footer").outerHeight()+p;
	var headerH = 0;
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
}
function scrollCheck(obj,nav){
	$(window).scroll(function(){
	var scrollTop = $(window).scrollTop();
	var winH = $(window).height();
	var headerH = 0;
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
}
function boardFaq(BSbtn){
	var BStit = BSbtn.parents(".BStit");
	var BScon = BStit.next(".BScon");
	if(BScon.css("display")=="none"){
		BScon.slideDown();
		BScon.siblings(".BScon").hide();
		BStit.addClass("on");
		BStit.siblings(".BStit").removeClass("on");
	}else{
		BScon.hide();
		BStit.removeClass("on");
	}
}


//gall_thumb
function img_resize_gall(){
	$(".resize_gall").css("overflow","hidden");
	$(".resize_gall img").css("width","100%")
	function resize(){
		$(".resize_gall").each(function (i) {
			var W = $(this).width();
			$(this).height(W*0.6666)
			$(this).find("img").css("min-height",W*0.6666)
		});
	}
	function resize2(){
		$(".resize_gall").each(function (i) {
			var W = $(this).width();
			var H = $(this).height();
			var imgH = $(this).find("img").height();
			if(W < imgH || H < imgH || W == imgH){
				var gap = (imgH - $(".resize_gall").height())/2
				$(this).find("img").css("margin-top","-"+gap+"px")
			}
		});
	}
	$(document).ready(function(){
		resize()
		resize2()
	})
	$(window).resize(function(){
		resize()
		resize2()
	})
}


//product
function imgThumb(obj){
	$(obj).each(function () {
		var src = $(obj).find("img").attr("src");
		var target = $("#imgBig");
		target.attr("src",src);
		$(obj).siblings().removeClass("on");
		$(obj).addClass("on");
	});
};

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






//NEWS 게시판
function boardHover(){
	var obj = $(".js_link_wrap");
	obj.each(function(){
		$(this).find(".js_link").mouseenter(function(){
			$(this).parents(".js_link_wrap").addClass("hover");
		}).mouseleave(function(){
			obj.removeClass("hover");
		})
	});
}



