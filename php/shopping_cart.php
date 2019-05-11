<?php
mysql_connect('127.0.0.1','root','123456');
mysql_query('use bgsc');

$sql = "select * from goodsdetails";
$result = mysql_query($sql);
$rows = [];
while($row = mysql_fetch_assoc($result)){
    $rows[] = $row;
}
echo json_encode($rows);

?>