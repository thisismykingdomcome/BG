$(function(){
    glass();
    /* 放大镜 */
    function glass() {
        var shadowWidth = $("#picture_shadow").width(),
            shadowHeight = $("#picture_shadow").height(),
            middleWidth = $(".goods_messageBig").width(),
            middleHeight = $(".goods_messageBig").height(),
            bigWidth = $(".more_picture").width(),
            bigHeight = $(".more_picture").height();
        var rateX = bigWidth / shadowWidth;
        var rateY = bigHeight / shadowHeight;
        $(".goods_messageBig").mouseover(function () {
            $("#picture_shadow").show();
            $(".more_picture").show();
        }).mousemove(function (e) {
            //阴影跟随鼠标移动
            var x = e.pageX,
                y = e.pageY;
            $("#picture_shadow").offset({
                top: y - shadowHeight / 2,
                left: x - shadowWidth / 2
            });
            //限制阴影的移动范围
            var moveRange = $("#picture_shadow").position(),
                _top = moveRange.top,
                _left = moveRange.left,
                maxTop = middleHeight - shadowHeight,
                maxLeft = middleWidth - shadowWidth;
            if (_top < 0) {
                _top = 0;
            } else if (_top > maxTop) {
                _top = maxTop;
            }
            if (_left < 0) {
                _left = 0;
            } else if (_left > maxLeft) {
                _left = maxLeft;
            }
            $("#picture_shadow").css({
                top: _top,
                left: _left
            });
            //大图内的图片跟随阴影内图片进行变化
            $(".more_picture img").css({
                top: -rateY * _top,
                left: -rateX * _left
            });
        });
        $(".goods_messageBig").mouseout(function () {
            $("#picture_shadow").hide();
            $(".more_picture").hide();
        });
    }
    /* 会员规则 */
    $(".member_rules").hover(function () {
        $(".rules_message").show();
    }, function () {
        $(".rules_message").hide();
    });
    /* 选图片 */
    $(".goods_messageSmall ul li").on("click", function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        var thisSrc = $(this).children(0).attr("src");
        $(".goods_messageBig img").attr("src", thisSrc);
        $(".more_picture img").attr("src", thisSrc);
    });
    /* 选择颜色 */
    $(".goods_color dl dd").on("click", function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $("#selectedColor").html("请选择颜色");
        } else {
            $(this).addClass("active").siblings().removeClass("active");
            var thisName = $(this).children(0).attr("dataname");
            $("#selectedColor").html(thisName);
            var thisSrc = $(this).children(0).attr("src");
            $(".goods_messageBig img").attr("src", thisSrc);
            $(".more_picture img").attr("src", thisSrc);
        }
    });
    /* 选择尺码 */
    $(".goods_size dl dd div").on("click", function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $("#selectedSize").html("请选择尺码");
        } else {
            $(this).addClass("active").siblings().removeClass("active");
            var thishtml = $(this).html();
            $("#selectedSize").html(thishtml);
        }
    });
    /* 数量 */
    Number();

    function Number() {
        var minus = document.getElementById("minus");
        var num = document.getElementById("num");
        var add = document.getElementById("add");
        var reminder = document.getElementById("num_reminder");
        minus.onclick = function () {
            var minusNum = num.value;
            if (minusNum > 1) {
                minusNum--;
                num.value = minusNum;
            } else {
                reminder.style = "display:block";
                setTimeout(function () {
                    reminder.style = "display:none";
                }, 1000);
            }
        }
        add.onclick = function () {
            var addNum = num.value;
            addNum++;
            num.value = addNum;
        }
    }
    /* 加入购物车 */
    $("#addCar").on("click", function () {
        /* 创建对象存储需要传的值 转化为json字符串格式*/
        var details = new Object();
        details.shopname = $("#goods_name").html(); //商品名称
        details.goods_price = $("#goods_price").html(); //商品折后价
        details.original_price = $("#original_price").html(); //商品原价
        details.num = $("#num").val(); //商品数量
        details.color = $(".goods_color .active").children(0).attr("dataname"); //商品颜色
        details.shopimg = $(".goods_color .active").children(0).attr("src"); //图片路径
        details.size = $(".goods_size .active").html(); //商品尺码
        details.shopid = $("#productNum").html(); //商品编号
        /*  localStorage.clear(); 
        if (details.color ==null && details.size == null) {
            alert("请选择颜色和尺码");
        } else if(details.color == null){
            alert("请选择颜色");
        }else if(details.size == null){
            alert("请选择尺码");
        }else{
            
            alert("添加成功");
            localStorage.setItem("shopdetails",JSON.stringify(details)); 
        }
        console.log(localStorage); */
        if (details.color == null && details.size == null) {
            alert("请选择颜色和尺码");
        } else if (details.color == null) {
            alert("请选择颜色");
        } else if (details.size == null) {
            alert("请选择尺码");
        } else {
            $.post("../php/goodsdetails.php", details, function (res) {
                if (res.code == 200) {
                    alert(res.message);
                    /* 弹出提示框 */
                    $("#special_shade").css("display", "block");
                    $(".goods_openpage").css("display", "block");
                } else {
                    alert(res.message);
                }
            }, "json");   
        }
    });
    $("#go_pay").on("click",function(){
        $("#special_shade").css("display", "none");
        $(".goods_openpage").css("display", "none");
        /* location.href("index.html"); */
    });
    $("#go_on_shop").on("click", function () {
        $("#special_shade").css("display", "none");
        $(".goods_openpage").css("display", "none");
        location.reload();
    });
    $("#goods_openpage_close").on("click", function () {
        $("#special_shade").css("display", "none");
        $(".goods_openpage").css("display", "none");
        location.reload();
    });
});