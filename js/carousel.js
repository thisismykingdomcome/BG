//form ajax
// $("#theform").submit(function(event){
//     event.preventDefault();
//     alert();
//     var strArray = $(this).serialize();
//     // console.log(strArray);
//     $.get("../php/form.php",strArray,function(result){
//         window.open("../html/products-search.html?id="+result);
//         return false;
//     });
// });
$("form").submit(function(event){
    event.preventDefault();
    var strArray = $(this).serialize();
    $.get("../php/form.php",strArray,function(result){
        if(result != "[]"){
            var productsName = JSON.parse(result)[0].name;
            window.open("../html/products-search.html?name="+productsName);
        }else{
            alert("抱歉，没有此类商品");
        }
        return false;
    });
});
// $("form").submit(function(event){
//     event.preventDefault();
//     var str = $(this).serialize();
//     location.href = "../html/products-search.html?"+str;
// });

//carouse.js
var index = 0;
var timer = setInterval(autoPlay,2000);
function autoPlay(){
    index++;
    $(".carousel ul li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
    $(".carousel  ol  li").eq(index).siblings().children($(".shadow")).removeClass("shadow-none");
    $(".carousel  ol  li").eq(index).children($(".shadow")).addClass("shadow-none");
    $(".carousel  ol  li").eq(index).siblings().children($(".red-border")).removeClass("border-block");
    $(".carousel  ol  li").eq(index).children($(".red-border")).addClass("border-block");
    if(index == $ (".carousel ul li").length -1){
        index = -1;
    }
}
$(".carousel  ol  li").mouseover(function(){
    clearInterval(timer);
    index = $(this).index() - 1;
    autoPlay();
}).mouseout(function(){
    timer = setInterval(autoPlay,2000);
});
