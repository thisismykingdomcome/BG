<?php
$link = mysql_connect("127.0.0.1","root","123456");
mysql_query("use aa");
$shopid = $_POST['shopid'];
$shopname = $_POST['shopname'];
$goods_price = $_POST['goods_price'];
$sql = "insert into goods_details(shopname,goods_price,shopid) value('$shopname','$goods_price','$shopid')";
$result = mysql_query($sql);
$num = mysql_affected_rows();
if ($num > 0) {
    $response = ['code'=>200,'message'=>"添加成功"];
} else {
    $response = ['code'=>-1,"message"=>"添加失败"];
}
echo json_encode($response);
?>