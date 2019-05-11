<?php 
mysql_connect('127.0.0.1','root','123456');
mysql_query('use bgsc');



$id = $_GET['id'];
$sql = "delete from goodsdetails where id=".$id;
mysql_query($sql);
$num = mysql_affected_rows();

if($num > 0){
  $response = ['code'=>200,'message'=>'删除成功',"data"=>''];
}else{
  $response = ['code'=>-1,'message'=>'删除失败',"data"=>''];
}

echo json_encode($response);

?>
