$(function(){
	var $lang=$("header>.gnb>.spot>ul>li:nth-child(1)>a");
	var $slide=$("header>.gnb>.spot>ul>li:nth-child(1)>ul");
	var $gnbBtn=$("header>.mo_gnb_btn>a");
	
	
	var gnbMo = function(){
		$gnbBtn.on("click",function(evt){
			evt.preventDefault();
			$(this).parent().toggleClass("off");
			if($(this).parent().hasClass("off")){
				$("header>.gnb>.gnb_mnu, header>.gnb>.spot").stop().show();
			}else{
				$("header>.gnb>.gnb_mnu, header>.gnb>.spot").stop().hide();
			}
		});
	}
	
	$(window).on("load resize",function(){
		//$("#main").height($(this).height());
		$("section").width($(this).width());
		
		if($(window).width()<769){
			$("header>.mo_gnb_btn").stop().show();
			gnbMo();
			$(".cont").fadeIn(700);
			$(".bg_obj").delay(500).fadeIn(1000);
			
		}else{
			$("header>.gnb>.gnb_mnu, header>.gnb>.spot").stop().show();
			$("header>.mo_gnb_btn").stop().hide();
		}
		
		
		$(".bar_1").animate({
			top:10,
			left:-60,
			opacity:1
		},700,function(){
			$(".bar_2").animate({
				top:400,
				left:-80,
				opacity:1
			},700,function(){
				$(".bar_3").animate({
					top:250,
					left:-130,
					opacity:1
				},700,function(){
					$(".cont").fadeIn(1000);
					$(".bg_obj").delay(1000).fadeIn(2000);
				});
			});
		});		
	});
	
	$(window).on("scroll",function(){
		var gnb=$("html,body").scrollTop();
		if(gnb>=1){
			$("header").addClass("fixed");
		}else{
			$("header").removeClass("fixed");
		}
	});
	
	$("header>#top>a,header>.gnb>h1>a").on("click",function(evt){
		evt.preventDefault();
		$("html,body").animate({
			scrollTop:0
		});
	});
	
	$lang.on("click",function(evt){
		evt.preventDefault();
		$slide.slideToggle();
	});
	
	
	//메인메뉴
	var $mnu=$("header>.gnb>.gnb_mnu>ul>li>a");
	var mnuIdx=0;
	var arrTopVal=[];
	arrTopVal[0]=$("#intro").offset().top;
	arrTopVal[1]=$("#city").offset().top+500;
	arrTopVal[2]=$("#conference").offset().top;
	arrTopVal[3]=$("#lastyear").offset().top-300;
	arrTopVal[4]=$("#gallery").offset().top-400;
	if($(window).width()<769){
		arrTopVal[1]=$("#city").offset().top+585;
		arrTopVal[3]=$("#lastyear").offset().top-90;
		arrTopVal[4]=$("#gallery").offset().top-90;
	}
	
	console.log(arrTopVal);
	var pageAni=function(topVal){
		$("html,body").stop().animate({
			"scrollTop":topVal
		});
	};
	
	$mnu.click(function(evt){
		evt.preventDefault();
		mnuIdx=$mnu.index(this);
		pageAni(arrTopVal[mnuIdx]);
		$mnu.eq(mnuIdx).parent().addClass("on").siblings().removeClass("on");
		
	});
	
	$(window).scroll(function(){
		var scrollTop=$(window).scrollTop();
		if(scrollTop<arrTopVal[0]){
			$mnu.parent().removeClass("on");
		}
		for(var i=0;i<5;i++){
			if(scrollTop>=arrTopVal[i] && $(window).width()>768){
			   $mnu.eq(i).parent().addClass("on").siblings().removeClass("on");
			}
		}		
	});
	
	//city
	var $tabBtn=$("#city>.tab>.btn>ul>li>a");
	var $tabList=$("#city>.tab>.tab_list>.list");
	var tabIdx=2;
	var aniChk=false;
	
	$tabBtn.on("click",function(evt){
		evt.preventDefault();
		tabIdx=$(this).parent().index();
        $tabBtn.eq(tabIdx).parent().addClass("on").siblings().removeClass("on");
        $tabList.eq(tabIdx).stop().fadeIn(500).siblings().fadeOut(500);
		
        tabAni();    
	});
	
	var tabAni=function(){
		aniChk=true;
		$tabList.eq(tabIdx).find(".txt").animate({
			"top":"9%",
			opacity:1
		});
		$tabList.eq(tabIdx).find(".img").animate({
			"top":"2%",
			opacity:1
		},function(){
			aniChk=false;
			if(aniChk==false){
				$tabList.eq(tabIdx).siblings().find(".img").css("top","20%");
				$tabList.eq(tabIdx).siblings().find(".txt").css("top","40%");
			}  
		});
	};
    
    $(window).on("load resize",function(){
        tabAni();
		$tabBtn.eq(0).trigger("click");
    });
	
    //festival
    var $prog=$("#city .cont_container>.prog");
    
    $prog.on("mouseover",function(){
		if($(window).width()>768){
			$(this).find(".txt").stop().animate({
				top:0
			},300);
		}
    });
    
    $prog.on("mouseout",function(){
		if($(window).width()>768){
			$(this).find(".txt").stop().animate({
				top:"60%"
			},300);
		}
    });
    
});

//갤러리 슬라이드
$(function(){
    var $slides=$(".slides>.slides_container>ul");
    var $nextBtn=$(".slides_navigation>.next>a");
    var $prevBtn=$(".slides_navigation>.prev>a");
    var nowIdx=1;
    var oldIdx=nowIdx; 
    var aniChk=false;
	
	var mySwiper = new Swiper('.swiper-container',{
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
	});
	
    var move=function(direction){
		console.log(nowIdx);
        $slides.stop().animate({
            "left":-980*nowIdx
        },function(){
			if(direction=="next"){
				nextSlide();
			}else{
				prevSlide();
			}
			aniChk=false;
		});
    };
	
	var moveMo=function(direction){
		if($(window).width()<769){
			$slides.stop().animate({
				"left":-380*nowIdx
			},function(){
				if(direction=="next"){
					nextSlideMo();
				}else{
					prevSlideMo();
				}
				aniChk=false;
			});
		}
	};
	
	var nextSlide=function(){
		if(nowIdx>2){
			var $temp=$slides.children().slice(0,2).remove();
			$slides.children().slice(0,2).appendTo($slides);
			$slides.append($temp).css({
				"left":-980
			});
			nowIdx=1;
			
		}
	};
	
	var nextSlideMo=function(){
		if(nowIdx>2){
			var $temp=$slides.children().slice(0,2).remove();
			$slides.children().slice(0,2).appendTo($slides);
			$slides.append($temp).css({
				"left":-380
			});
			nowIdx=1;
		}
	};
    
	var prevSlide=function(){
		if(nowIdx<1){
			var $temp=$slides.children().slice(2,4).remove();
			$slides.children().slice(0).prependTo($slides);
			$slides.prepend($temp).css({
				"left":-980*2
			});
			nowIdx=2;
			
		}
	};
    
	var prevSlideMo=function(){
		if(nowIdx<1){
			var $temp=$slides.children().slice(2,4).remove();
			$slides.children().slice(0).prependTo($slides);
			$slides.prepend($temp).css({
				"left":-380*2
			});
			nowIdx=2;
		}
	};
	
    $nextBtn.on("click",function(evt){
        evt.preventDefault();
        if(aniChk==false){
			aniChk=true;
			oldIdx=nowIdx;
			nowIdx++;
			
			move("next");
			moveMo("next");
		}	
    });
	
	$prevBtn.on("click",function(evt){
		evt.preventDefault();
		if(aniChk==false){
			aniChk=true;
			oldIdx=nowIdx;
			nowIdx--;
			
			move("prev");
			moveMo("prev");
		}
	});
	
});
