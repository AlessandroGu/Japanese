
        //小标题栏
        (function(){
            var flag;
            $(".nav-content").on("click",function(){
                console.log($(this).children()[0]);
                console.log($(this).children()[1]);
                console.log($(this).children()[2]);
                if(flag){
                    $(this).children().eq(0).removeClass("topNChange").addClass("topN");
                    $(this).children().eq(1).removeClass("middleNChange").addClass("middleN");
                    $(this).children().eq(2).removeClass("bottomNChange").addClass("bottomN");
                    $(".main-nav").fadeOut();
                    flag=false;
                }else{
                    $(this).children().eq(0).removeClass("topN").addClass("topNChange");
                    $(this).children().eq(1).removeClass("middleN").addClass("middleNChange");
                    $(this).children().eq(2).removeClass("bottomN").addClass("bottomNChange");

                    $(".main-nav").fadeIn();
                    flag=true;
                }

            });
        })();


        //获取需要的值
        (function(){


        $(".ctrl li")
            .click(Lb)
            .on("mouseenter",function(){
                clearInterval(timerId);
            })
            .on("mouseleave",function(){
            timerId=setInterval(autoLb,5000000);
            });
        var $index=0;
        var $section=$(".section");
        var $liWidth=$(".section li").width();
        var timerId=setInterval(autoLb,5000000);
        var videoList=["<iframe height='750' width='100%' src='http://player.youku.com/embed/XMTU4MjIyMzg5Mg==' frameborder=0 'allowfullscreen'></iframe>",
        "<iframe height='750' width='100%' src='http://player.youku.com/embed/XMTM4ODYzMzQ0' frameborder=0 'allowfullscreen'></iframe>"] 
       



        // 轮播部分，每当点击对应的按钮时，视频开始加载
        function Lb(){
            $index=$(this).index();
            var itemContent=$(".section li").eq($index).html()
            var str=itemContent.trim()
            if(!str){
                $(".section li").eq($index).html(videoList[$index-1])
            }

            console.log($index)
            $(this).siblings("li").removeClass("cur").end().addClass("cur");
            $(".section").stop().animate({"left": -$index* $liWidth });







        }

        //自动轮播部分
        function autoLb(){
            if($index>=3){
                $index=0;
                $section.css({"left": $index* $liWidth });
            }
            $index++;
            $section.stop().animate({"left": -$index* $liWidth});
            if($index==3){
                $(".ctrl li").eq(0).siblings("li").removeClass("cur").end().addClass("cur");

            }else{
                $(".ctrl li").eq($index).siblings("li").removeClass("cur").end().addClass("cur");
            }
            var itemContent=$(".section li").eq($index).html()
            var str=itemContent.trim()
            if(!str){
                $(".section li").eq($index).html(videoList[$index-1])
            }
        }


        })();

        //猫的过滤以及渲染动画效果
        (function(){
        $.ajax({
            url:"./JSON/cate.json",
            type:"get",
            success:function(res){
                console.log(res);
                var html=template("tem-cat",{list:res});
                $(".cat-content").html(html);
                // É¸Ñ¡Êý¾Ý
                // all
                $(".filter-all").on("click",function (){
                    var htmlAll=template("tem-cat",{list:res});
                    $(".cat-content").fadeOut(500).stop(true,true).html(htmlAll).fadeIn(500);
                });
                // cate01
                $(".cate01").on("click",function (){
                    var cateOne=filterData("cate01");
                    var htmlcateOne=template("tem-cat",{list:cateOne});
                    $(".cat-content").fadeOut(500).stop(true,true).html(htmlcateOne).fadeIn(500);
                });
                // cate02
                $(".cate02").on("click",function (){
                    var cateTwo=filterData("cate02");
                    var htmlcateTwo=template("tem-cat",{list:cateTwo});
                    $(".cat-content").fadeOut(500).stop(true,true).html(htmlcateTwo).fadeIn(500);
                });
                // cate03
                $(".cate03").on("click", function (){
                    var cateThree=filterData("cate03");
                    var htmlcateThree=template("tem-cat",{list:cateThree});
                    $(".cat-content").fadeOut(500).stop(true,true).html(htmlcateThree).fadeIn(500);
                });
                function filterData(cate){

                    var flag;
                    var cateData=res.filter(function(val){
                        flag=false;
                        val.cate.forEach(function(v){
                            if(v==cate){
                                flag = true;
                            }
                        });
                        return flag;
                    });
                    return cateData;


                }



            }
        });




        })();



        // 标题和段落动画部分
        $(function () {
        $(window).scroll(function(){
            var scrollBottom=$(this).scrollTop();
            var firstHeight=$('.header').height(); 
            console.log( "one" + firstHeight);
            console.log( "gun" + scrollBottom);
            var scrollSum=(0.7*firstHeight);
            console.log(scrollSum);
            if(scrollBottom  > scrollSum){
                $( ".show").css({
                    transition: "all 0.5s linear",
                    opacity:1,
                    top: "25%"

                })
                $( ".include" ).css({
                    transition: "all 0.5s linear 0.5s",
                    opacity:1,
                    top: "50%"

                })
                  
                // console.log( 1111111111111 );
            } else {
                $( ".show").css({opacity:0,top:"35%"})
                // $( ".second_content p").hide("slow", "linear")  
                 $( ".include" ).css({
                    transition: "all 0.5s linear",
                    opacity:0,
                    top: "65%"

                })
            }
        })
    })

        



    







