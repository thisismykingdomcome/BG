<?php
mysql_connect("localhost","root","root");
mysql_query("use form");
$search = $_GET["name"];
$sql = "selecte * from search where name = '$search'";
$result = mysql_query($sql);
$row = myslq_fetch_asssoc();
if($row){
    echo 1;
}else{
    echo 0;
}



?>