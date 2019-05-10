$(function(){
   
})
var getbgData = function(callback){
     $.ajax({
        url:'bggou',
        type:'get',
        data:'',
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }

    })
}