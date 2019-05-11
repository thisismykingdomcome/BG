<?php
    mysql_connect("127.0.0.1","root","root");
    mysql_query("use haha");
    $yhm = $_GET['yhm'];
    $sql = "select * from user where username = '$yhm'";
    $result = mysql_query($sql);
    $row = [];
    $row = mysql_fetch_assoc($result);
    if($row){
        echo json_encode(["switch" => "用户名已存在","flag" => "false"]);
    }else{
        echo json_encode(["switch" => "用户名可用","flag" => "true"]);
    };