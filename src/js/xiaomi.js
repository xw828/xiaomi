$(function(){ 
    // 1 通过浏览器卷曲的高度来决定按钮的显示和隐藏
    $(window).scroll(function(){
        // 通过浏览器卷曲的高度来决定
        if($(window).scrollTop()>=300){
            // 让回到顶部按钮显示
            $('#backTop').fadeIn()
        }else{
            // 让回到顶部按钮隐藏
            $('#backTop').fadeOut()
        }
    })

    // 2 点击按钮的时候让页面滚动到顶部
    $('#backTop').click(function(){
        $('html').animate(
            {scrollTop:0},
        1000)

    })
})

 /*倒计时*/
 var ems=document.getElementsByTagName("em");
	function timers(){
		var time=new Date();
		var time2=new Date("2020-11-3 22:00:00")
        var diff = parseInt(Math.abs(time-time2)/1000);//两个时间相差的秒数
        //计算diff是多少天多少小时多少分钟多少秒
        var date = Math.floor(diff/(24*60*60));
        var afterDate = diff - date*24*60*60;
        var h = Math.floor(afterDate/(60*60));
        var afterHour = afterDate - h*3600;
        var m = parseInt(afterHour/60);
        var s = afterHour - m*60;
		var times=[
		parseInt(h/10),
		h%10,
		parseInt(m/10),
		m%10,
		parseInt(s/10),
		s%10,
		]
		for(var i=0;i<times.length;i++){
			ems[i].innerHTML=times[i]
		}
	}
	timers();
	setInterval(function(){
		timers();
    },1000)
    

    /*搜索栏*/
    var inp = document.getElementById('text');
    var ul = document.getElementById('sousuo');
    // 每次有增加或减少输入,都要联想
    inp.oninput = function(){
        var text = this.value;//输入的文字
        // 每输入一个文字,创建一个script去发送请求
        var script = document.createElement('script');
        script.src = "https://suggest.taobao.com/sug?code=utf-8&q="+text+"&_ksTS=1601216601427_3823&callback=fn&area=b2c&code=utf-8&k=1&bucketid=14&src=tmall_pc";
        document.body.appendChild(script);
        // 函数fn必须是全局的fn函数,才能在外部调用
        window.fn = function (data){
            // console.log(data.g);
            // 先清空上次ul里面的内容
            ul.innerHTML = ""
            // 每次成功的数据都要渲染到ul里面
            var str = "";
            if(data.result){
                //如果data.g有内容,才进行渲染
                data.result.forEach(function(val){
                    str+="<li><a href=''>"+val[0]+"</a></li>"
                })
                ul.innerHTML = str;
            }
            //在这里找到当前创建的script标签,并且删除
            document.body.removeChild(script);
        }
    }
  

    document.getElementById("text").onclick=function(e){
        e = e||window.event;
        document.getElementById("sousuo").style.display="block";
        document.getElementById("sousuo").style.top="50px";
        document.getElementById("sousuo").style.borderColor="red";
        document.getElementById("text").style.borderColor="red";
        document.getElementById("fo").style.borderColor="red";
        e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
    }
    //点击"sousuo,自己不能消失
    document.getElementById("sousuo").onclick  = function(e){
        e = e||window.event;
        //阻止冒泡
        e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
    }
    //点击页面任意位置,detail消失
    document.onclick = function(){
        document.getElementById("sousuo").style.display="none"
        document.getElementById("fo").style.borderColor="#e0e0e0";
        document.getElementById("text").style.borderColor="#e0e0e0";
    }

    /*列表*/
	function topNavDownload(){
		$.ajax({
			url:"../data/nav.json",
			type: "GET",
			dataType: "json",
			success: function(result){
				var topNavArr=result.topNav;
				topNavArr.push({title:"服务"},{title:"社区"});
				for(var i=0;i<topNavArr.length;i++){
					$(`<li data-index="${i}" class="nav-item "><a href="javascript: void(0);" class="link"><span class="text">${topNavArr[i].title}</span></a></li>`).appendTo(".site-header .header-nav .nav-list");
					var node=$(`<ul class='children-list clearfix' style="display:${i==0?"block":"none"}"></ul>`);
					node.appendTo("#J_navMenu .container");
					
					if(topNavArr[i].childs){
						var childArr=topNavArr[i].childs;
						for(var j=0;j<childArr.length;j++){
							$(`<li>
									<a href="#">
										<div class="figure figure-thumb">
											<img src="${childArr[j].img}" alt="">
										</div>
										<div class="title">
											${childArr[j].a}
										</div>
										<p class="price">${childArr[j].i}</p>
									</a>
								</li>`).appendTo(node);
						}
					}
				}
			},
			error:function(msg){
				console.log(msg)
			}
		})
	}
	topNavDownload()

   function topNavTab(){
   	$(".header-nav .nav-list").on("mouseenter",".nav-item",function(){
   		$(this).addClass("nav-item-active");
   		var index=$(this).index()-1;
   		if(index>=0&&index<=6){
   			$("#J_navMenu").css({display:"block"}).removeClass("slide-up").addClass("slide-down");
   		$("#J_navMenu .container").find("ul").eq(index).css("display","block").siblings("ul").css("display","none");
   		}
   	})
   	$(".header-nav .nav-list").on("mouseleave",".nav-item",function(){
   		$(this).removeClass("nav-item-active");
   	})
   	
   	$(".site-header").mouseleave(function(){
   		$("#J_navMenu").css({display:"block"}).removeClass("slide-down").addClass("slide-up");
   	})
   }
   topNavTab()
