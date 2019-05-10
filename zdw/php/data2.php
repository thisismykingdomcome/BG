<?php
    header("Content-type:text/html;charset=utf8");
    mysql_connect("127.0.0.1","root","root");
    mysql_query("use haha");
    $user1=$_GET['user'];
    $pw=$_GET["pw"];
   
    $sql = "select * from user where username = '$user1' ";
    $result = mysql_query($sql);
    $row = mysql_fetch_assoc($result);
    if($row){
        echo json_encode($row);
    }else{
        echo json_encode(["code" => "-1"]);
    };
    // $row = mysql_fetch_assoc($result);
    // if($row){
    //     echo json_encode(["one" => "登陆成功"]) ;
    // }else{
    //     echo json_encode(["one" => "登陆失败，用户名或密码错误"]);
    // };
    