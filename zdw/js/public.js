function getCookieValue(name){/*获取某name对应的值*/
	var str = document.cookie;
	if(str == ""){
		return "";
	}        
	var arr = str.split("; ");/*注意：是分号加空格,不是只有分号*/
	for(var i = 0,len=arr.length;i < len;i ++){
		if(arr[i].split("=")[0] == name){  
			return arr[i].split("=")[1];
		}
	};
	return false;/*不存在某name，则返回false*/
}
/////////////////////////*随机数*////////////////////////////////////////
function ranNum(min,max){
	var b=parseInt(Math.random()*(max-min+1)+min);
	return b;
}
///////////////*将系统时间样式转换成中文时间样式*///////////////////////////
function chinaTime (date) {
				var y = date.getFullYear();
				var m = date.getMonth()+1;
				var d = date.getDate();
				var H = date.getHours();
				var M = date.getMinutes();
				var S = date.getSeconds();
				var W = date.getDay();
				var arr = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"]
				var str = y + "年" + m + "月" + isUnits(d) + "日" + " " + isUnits(H) + "时" + isUnits(M) + "分" + isUnits(S) + "秒"  +"  "+ arr[W];
				function isUnits(num){/*num为个位数时前面加0*/
					if(num < 10) {
						return 0 + "" + num;
					}else {
						return  num;
					}
				}
				return str;		
			}
//////////////*获取标签id*///////////////////////
function $id (num,flag) {
	if(flag){
	switch(flag){
		case "i":
			return document.getElementById(num);
		case "c":	
			return document.getElementsByClassName(num); 
		case "n":	
			return document.getElementsByName(num); 
		case "t":	
			return document.getElementsByTagName(num);
		default:
			 return alert("参数错误");
		}	
   }else{
	   return document.getElementById(num);
   };
};
//////////////获得时间差(两个参数，最大值和最小值)/////////////////////////////////
function diffTime(maxTime,minTime,flag) {
				var n = maxTime.getFullYear();
				var a = maxTime.getTime() - minTime.getTime(); 
				var m = parseInt(a/1000);/*总共s秒*/
				var x = parseInt(m/60/60);/*总共H小时*/
				var t = parseInt(x/24);/*总共d天*/
				var years;
				if(n%4==0 && n%100 !=0 || n%400 == 0){
					years = t/366;
				}else{
					years = t/355;
				}
				switch(flag){
					case "s":
						return m;
					case "h":
						return x;
					case "d":
						return t;
					case "y":
						return years;
					default:
						return a;
				}
			}
//////////////////随机获得num位验证码//////////////////////////////
			function captcha(num){
				var str = "",str1 = "";;
				for(var j=48;j<58;j++){					
					str1 += String.fromCharCode(j);
				}
				for(var k=65;k<91;k++){					
					str1 += String.fromCharCode(k);
				}
				for(var l=97;l<123;l++){					
					str1 += String.fromCharCode(l);
				}
				var arr = str1.split("");		
				for(var i=0;i<num;i++){												
					var b = arr[ranNum(0,arr.length-1)];
					if(str.indexOf(b) == -1){
						str += b;
					}else{
						i--;
					}			
				}
				return str;
			}
////////////////////随机获得十六进制颜色/////////////////////////////////////			
			function getColor(){
				var str = "#",str1 = "";;
				for(var j=48;j<58;j++){					
					str1 += String.fromCharCode(j);
				}
				for(var l=97;l<103;l++){					
					str1 += String.fromCharCode(l);
				}
				var arr = str1.split("");		
				for(var i=0;i<6;i++){												
					var b = arr[ranNum(0,arr.length-1)];
					if(str.indexOf(b) == -1){
						str += b;
					}else{
						i--;
					}			
				}
				return str;
			}
/***************兼容IE8下 onmousedown中button的值不同的问题***********/
			function ie8button(e){/*e为事件处理程序中的事件对象*/			
				if(e){
					return e.button;
				}else{/*e = window.event时*/
					var button = window.event.button;
					switch(button){
						case 1:
							return 0;
						case 4:
							return 1;
						case 2:	
							return 2;
					}
				}
			}
/**************************随机排列数组******************/
// 			var arr = [1,2,5,2,6,3],brr = [],crr = [];
// 				for(i=0;i<arr.length;i++){
// 					var index = ranNum(0,arr.length-1);
// 					if(crr.indexOf(index) == -1){
// 						crr.push(index);
// 					}else{
// 						i--;
// 					}
// 				} 
// 				for(i=0;i<arr.length;i++){
// 					brr.push(arr[crr[i]]);
// 				}
/******兼容getElementsByClassName*****兼容getElementsByClassName****兼容getElementsByClassName***/
				function className(str){
					var all = document.getElementsByTagName("*"),brr = [];
					for(i=0;i<all.length;i++){
						if(all[i].className == str){
							brr.push(all[i].className)
						}
					}
					return brr;
				}
/****************************获得子元素节点*****************************************************/				
			function getChildren(sup){
				var sub = sup.childNodes;/*获得父元素下的所有子节点**/	
				var arr = [];
				for(i = 0;i< sub.length;i ++){		
					if(sub[i].nodeType == 1){/*****筛选出所有的元素节点*****/
						arr.push(sub[i])
					}
				}
				return arr;
			}
/****************************把新节点放在目标节点后面*********************************************************/
			function inserLast(sup,newNode,target){/*父节点，新节点，目标节点**/
				var c = getChildren(sup);
				if(c[length-1] == target){/*判断目标节点是否是最后一个元素节点*/
					sup.appendChild(newNode);
				}
				else{
					for(i=0;i<c.length;i++){
						if(c[i] == target){/*****循环遍历所有的子节点，找到目标节点位置******/
							sup.insertBefore(newNode,c[i+1]);/****把新节点放在目标节点后面的节点的前面，即是目标节点后面*****/
						}else{
							alert("目标节点不存在");
						}
					}
				}
			}
			
/*************************获得对应标签的属性值******************************/			
			function getStyle(ele,attr) {
				if(window.getComputedStyle){
					return parseFloat(window.getComputedStyle(ele,null)[attr]);/*getcomputedstyle获得的是一个带有单位的值，要用某种方法去掉单位*/
				}else{
					return currentStyle[attr];
				}
			}
/************************动画***************************************/			
			function animate(ele,property,time,callback){				
									clearInterval(ele.timer);/*每次调用函数时都要清除 上次 同一种运动方式 的定时器*/				
									ele.timer = setInterval(function(){	
										var flag = true;
										for(var attr in property){
											var current = 0;
											if(attr == "opacity"){/*当属性是透明度时要乘以100，因为opacity数值太小，向上取整直接为1，瞬间到达目标值，或永远到达不了*/
												current = getStyle(ele,attr)*100;
												var speed = (property[attr]*100 - current)/10 ;
											}else{
												current = parseInt(getStyle(ele,attr));
										
												var speed = (property[attr] - current)/10
											}
											speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
											
											
											if(attr == "opacity"){
												if(property[attr] != current/100){
													flag = false;
												};
												ele.style[attr] = (current + speed)/100; 
											}else{
												if(attr == "zIndex"){/*注意：zIndex没设置时为auto，是个NaN，所以要先设置,或者用注释的方法，直接到达目标值*/
													/*ele.style[attr] =  property[attr]*/
													ele.style[attr] =  current + speed;
												}else{
													ele.style[attr] = current + speed + "px";
												}
												if(property[attr] != current){
													flag = false;
												};
											}
										};
										if(flag){
											clearInterval(ele.timer);
											if(callback){
												callback();
											}
										}
										
										if(time){
										
										}else{
											time = 20;
										}
										},time)
								};
	/*******************获得cookie中name k对应的value值********************/							
function getCookie (k){
				var str = document.cookie;
				var arr = str.split("; ");/*以； 为中心，把所有的cookie炸开，形成一个数组*/
				for(i=0;i<arr.length;i++){
					if(arr[i].split("=")[0] == k){/*再把每个数组的值用等号炸开，找出对应的k值，k值后面一个值即是目标value*/
						return arr[i].split("=")[1];
					};
				};
			};
	/**********************设置cookie，可设置时间******************************************/		
			function setCookie(k,v,d){
				if(d){
					var set = document.cookie = k + "=" + v;
					var date = new Date();	
					date.setDate(date.getDate() + d);
					document.cookie = set + "; expires=" + date;
				}
				else{
					document.cookie = k + "=" + v;	
				}
			};								
/********************************promiseAjax*****************************************/
			function promiseAjax(parameter){
				var promise = new Promise(function(resolve,reject){
						var xhr = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
						xhr.onreadystatechange = function(){
							if(this.readyState == 4 && this.status == 200){
								resolve(this.responseText);
							}
						};
						xhr.onerror = function(){ /*当ajax运行错误时*/
								reject("网络出现波动，请稍后重试。");
						}
						xhr.open(parameter.method,parameter.url,true);
						xhr.send(null);
				});
				return promise;
			};
			
/*******************发送参数方式为GET的ajax*****************************************/			
			function ajaxGet(url,variable,callback){
				var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
				xhr.onreadystatechange = function(){	
					if(xhr.readyState == 4 && xhr.status ==200){
						//var response = xhr.responseText;
						callback(this.responseText)
					};
				};
				xhr.open("get",url+"?"+variable,true);
				xhr.send(null)
			};
/******************发送参数方式为POST的ajax********************************************************/		
			function ajaxPost(url,variable,callback){
				var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
				xhr.onreadystatechange = function(){	
					if(xhr.readyState == 4 && xhr.status ==200){
						//var response = xhr.responseText;
						callback(this.responseText);
					};
				};
				xhr.open("post",url,true);
				xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
				xhr.send(variable);
				
			};