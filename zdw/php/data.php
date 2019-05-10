<?php
    $a = $_GET["a"];
    if($a == 0){
        echo json_encode(["one" => "用户名:","two" => "登录密码:","p" => "请输入账户或邮箱地址"]);
    }else if($a == 1){
        echo json_encode(["one" => "手机号:","two" => "登录密码:","p" => "请输入手机号"]);
    }else if($a == 2){
        echo json_encode(["one" => "卡号:","two" => "卡密码:","p" => "请输入卡号"]);
    }