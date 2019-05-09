<?php
mysql_connect("localhost","root","root");
mysql_query("use bg");
$search = $_GET["input-text"];
//模糊查询
// $sql = "select * from search where name like '$search'";
// $result = mysql_query($sql);
// $rows = [];
// while($row = mysql_fetch_assoc($result)){
//     $rows[] = $row;
// }
// echo json_encode($rows);
$sql = "select * from search where name like '$search'";
$result = mysql_query($sql);
$rows = [];
while($row = mysql_fetch_assoc($result)){
    $rows[] = $row;
}
echo json_encode($rows);
?>