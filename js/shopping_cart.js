
$(function(){
/* 页面加载，读取数据库加载页面 */
function pageLoad(){
    $.get("../php/shopping_cart.php",function(res){
        var initialGoods = $(".mbshop_cartGoods:eq(0)")[0];
        var goodsParent = $(".mbshop_cart_wrap")[0];
        //console.log(res);
        var str =``;
        for(var i=0;i<res.length ;i++){
            str +=`
            <div class="mbshop_cartGoods" style="display:block;">
            <ul>
                <li class="mbshop_cartGoods_01">
                <label class="mbshop_cartGoods_label">
                    <input type="checkbox" name="status" hascheck="${res[i].checked}">
                </label>
                </li>
                <li class="mbshop_cartGoods_02">
                <dl>
                    <dt >
                    <a href="#">
                        <img src="../img/shopping_cart/${res[i].shopimg}" alt=""> 
                    </a>
                    </dt>
                    <dd>
                    <a href="#">
                    <p title="${res[i].shopname}">${res[i].shopname}</p>
                    </a>
                    <i>商品编号：${res[i].shopid}</i>
                    <div class="mbshop_cartGoods_02_p">
                        <p>不可用红包</p>
                    </div>
                    </dd>
                </dl>
                </li>
                <li class="mbshop_cartGoods_03">
                <p>颜色：${res[i].color}</p>
                <p>尺码：${res[i].size}</p>
                </li>
                <li class="mbshop_cartGoods_04">
                <p>￥${res[i].original_price}</p>
                <b>￥${res[i].goods_price}</b>
                <div class="btn-group">
                    <button class="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    修改优惠 <span class="caret"></span>
                    </button>
                    <ol class="dropdown-menu">
                        <li><a href="#">优惠1</a></li>
                        <li><a href="#">优惠2</a></li>
                        <li><a href="#">优惠3</a></li>
                        <li><a href="#">优惠4</a></li>
                    </ol>
                </div>
                </li>
                <li class="mbshop_cartGoods_05">
                <div class="mbshop_cartGoods_05_center">
                <span class="mbshop_cartGoods_05_left">-</span>
                <input type="text"  value="${res[i].num}" class="mbshop_cartGoods_05_num">
                <span class="mbshop_cartGoods_05_right">+</span>
                </div>
                </li>
                <li class="mbshop_cartGoods_06">￥0</li>
                <li class="mbshop_cartGoods_07">
                <a href="javascript:void(0);" class="mbshop_cartGoods_07_int">移入我的点赞</a>
                <a href="javascript:void(0);" class="mbshop_cartGoods_07_remove" remove_id="${res[i].id}">删除</a>
                </li>
            </ul>
            </div>
            `
        }
        $(".mbshop_cartGoods_wrap")[0].innerHTML=str;
        /************ */
      
        /* 商品全选---------------- */
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
        /* 商品单个选择------------- */
        $(".mbshop_cartGoods_label input").on("click",function(){
            var checkboxs = $("input[name='status']");
            var checkGoods = $(".mbshop_cartGoods ul");
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

         /* 商品数量操作 */
        $(".mbshop_cartGoods_05_left").on("click",function(){
            var num = $(this).parent().children("input")[0].value;
            if(num > 1){
                num--;
                $(this).parent().children("input")[0].value = num;
                /**获取当前点击对应删除按钮的id */
               /*  var id = $(this).attr("remove_id");
                console.log(id)
                $.get("../php/cart_goodsNumSlect.php",{"num":num,"id":id},function(res){

                }) */
            }else{
                alert("对不起，商品数量不能少于1");
            }
            this.onselectstart = this.ondrag = function(){//阻止字体选中行为
                return false;
            };
            grtGoodsNum();
        });
        
        $(".mbshop_cartGoods_05_right").on("click",function(){
            var num = $(this).parent().children("input")[0].value; 
            num++;  
            $(this).parent().children("input")[0].value = num;
            this.onselectstart = this.ondrag = function(){//阻止字体选中行为
                return false;
            }
            grtGoodsNum();
        })
        
        /* 删除商品 */
        $(".mbshop_cartGoods_07_remove").on("click",function(){
            if(!confirm('确认删除')){
                return;
              }
              var id = $(this).attr('remove_id'); //获取id
              //调用后台删除接口
              $.get("../php/shopping_cart_delete.php",{"id":id},function(res){
                //判断状态码，获取结果
                if(res.code == 200){
                  location.reload();
                }else{
                  alert(res.message);
                }
              },'json');
        });
        /* 已选商品数量 */
        var grtGoodsNum = function(){
            var checkGoods = $("input[name='status']");
            var Goods_prices = $(".mbshop_cartGoods_06");
            var Goods_Values = $(".mbshop_cartGoods_05_num");
            var checkGoodsNum = 0;
            var Commodity_price = 0;
            var checkGoods_price = 0;
            for(var i=0; i<checkGoods.length;i++){
                if(checkGoods[i].checked == true){
                    checkGoods[i].parentNode.parentNode.parentNode.setAttribute("zheGoods_check","1");                  
                    checkGoods_price =  Goods_Values[i].value * parseInt(`${res[i].goods_price}`);
                    Goods_prices[i].innerHTML = "￥"+ checkGoods_price ;
                    Commodity_price += checkGoods_price ;
                }else{
                    checkGoods[i].parentNode.parentNode.parentNode.setAttribute("zheGoods_check","0"); 
                    Goods_prices[i].innerHTML =  "￥"+0;
                }
            }
            $('.go_to_balance_total span')[0].innerHTML = "￥"+ Commodity_price ;
            $('.go_to_balance_agl span')[0].innerHTML = "￥"+ Commodity_price ;
            var checkGoodsAll = $("ul[zheGoods_check='1']");
            var checkGoods_Value = 0;
            for(var j=0; j<checkGoodsAll.length;j++){
               checkGoods_Value = checkGoodsAll[j].children[4].children[0].children[1].value;
               checkGoodsNum += parseInt(checkGoods_Value);
            }
            
            $(".go_to_balance_selec span").html(checkGoodsNum);
        }
        

    },"json");
        
}
pageLoad();
/**导航 */
$("a[class=enter]").mouseover(function(){
    $(".select").css("display","block");
})
$(".rtbox1").mouseleave(function(){
    $(".select").css("display","none");
})


/* 商品使用优惠券 */
/* $(".btn-group").on("click",function(){
    $(this).children("ol").show("400");
}) */
/* $(".btn-group").on("mouseout",function(){
    $(".btn-group").children("ol").hide("500");
})
 */



/*  移入我的点赞 */





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

/* 删除选中商品----------- */
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

/* 商品数量添加删除入库函数-------- */
function shopping_cart_input(){

}
/* 商品选择/不选择入库函数---------- */




});