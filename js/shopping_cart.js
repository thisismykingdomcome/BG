
$(function(){
/**导航 */
$("a[class=enter]").mouseover(function(){
    $(".select").css("display","block");
})
$(".rtbox1").mouseleave(function(){
    $(".select").css("display","none");
})

/* 商品全选/反选 */

var checkboxNum = true;

$("input[name='checkAll']").on("click",function(){
    if(checkboxNum){
        $("input[type='checkbox']").prop('checked',true);
        checkboxNum = false;
    }else{
        $("input[type='checkbox']").prop('checked',false);
        checkboxNum = true;
    }
    grtGoodsNum();
})

$(".mbshop_cartGoods_label input").on("click",function(){
    var checkboxs = $("input[name='status']");
    var statusNum = true;
    for(var i=0; i<checkboxs.length;i++){
        if(checkboxs[i].checked == false){
            statusNum = false;
        }
    }
    if(statusNum == true){
        $("input[name='checkAll']").prop('checked',true);
    }else{
        $("input[name='checkAll']").prop('checked',false);
    }
    grtGoodsNum();
})

/* 商品使用优惠券 */
/* $(".btn-group").on("click",function(){
    $(this).children("ol").show("400");
}) */
/* $(".btn-group").on("mouseout",function(){
    $(".btn-group").children("ol").hide("500");
})
 */

 /* 商品数量操作 */
$(".mbshop_cartGoods_05_left").on("click",function(){
    var num = $(this).parent().children("input")[0].value;
    if(num > 1){
        num--;
        $(this).parent().children("input")[0].value = num;
    }else{
        alert("对不起，商品数量不能少于1");
    }
    this.onselectstart = this.ondrag = function(){
        return false;
    };
    grtGoodsNum();
});

$(".mbshop_cartGoods_05_right").on("click",function(){
    var num = $(this).parent().children("input")[0].value; 
    num++;  
    $(this).parent().children("input")[0].value = num;
    this.onselectstart = this.ondrag = function(){
        return false;
    }
    grtGoodsNum();
})
/* 阻止字体选中行为 */
/* document.body.onselectstart = document.body.ondrag = function(){
    return false;
}
 */

/*  移入我的点赞 */



/* 删除商品 */
$(".mbshop_cartGoods_07_remove").on("click",function(){
    var info = window.confirm("确定要删除该商品吗？");
    if(info){
        $(this).parent().parent().parent().remove();
    }
    grtGoodsNum();
});

/* 商品结算部分 */
/* window.onscroll = function(){
    var stop = document.documentElement.scrollTop || document.body.scrollTop;
    if(stop > 100){
        $(".go_to_balance_wrap")[0].style.position = "fixed";
        $(".go_to_balance_wrap")[0].style.bottom = 0;
    }else{
        $(".go_to_balance_wrap")[0].style.position = "static";
    }

} */

/* 删除选中商品 */
$(".go_to_balance_del").on("click",function(){
    var allGoods = $("input[name='status']");
    var info = window.confirm("确定要删除该商品吗？");
    if(info){       
        for(var i=0; i<allGoods.length; i++){
            if(allGoods[i].checked == true){
                allGoods[i].parentNode.parentNode.parentNode.parentNode.remove();
            }
        }
    }
    grtGoodsNum();
}); 

/* 已选商品 */
var grtGoodsNum = function(){
    var checkGoods = $("input[name='status']");
    var checkGoodsNum = 0;
    for(var i=0; i<checkGoods.length;i++){
        if(checkGoods[i].checked == true){
            checkGoods[i].setAttribute("zheNum","1");  
        }
       
    }
    checkGoodsNum +=$("input[zheNum='1']").parent().parent().parent().children(".mbshop_cartGoods_05").children("input")[0].value;
    console.log(checkGoodsNum);
    $(".go_to_balance_selec span").html(checkGoodsNum);
}



});