//form ajax
var submit = $("input[type='submit']");
var form = $("")


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
