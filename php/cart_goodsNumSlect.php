<?php
mysql_connect('127.0.0.1','root','123456');
mysql_query('use bgsc');

$id = $_POST['id'];
$num = $_POST['num'];

$sql = "update goodsdetails set num='$num' where id='$id'";
$result = mysql_query($sql);
$rows = mysql_affected_rows();

if($rows > 0){
  $responseData = ['code'=>200,'message'=>'修改成功'];
}else{
  $responseData = ['code'=>-1,'message'=>'修改失败'];
}	

echo json_encode($responseData);

?>