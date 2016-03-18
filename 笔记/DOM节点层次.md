---
title: DOM API概览
date: 2016-02-27 15:20:36
tags:
- 节点
- DOM
categories: JavaScript
---
DOM文档对象模型(Document object model)-->提供了js操作页面元素的属性和方法
获取网页元素
document.getElementById("div1") //context(上下文)上下文只能是document
context.getElementsByTagName("span") //获得是一个元素集合 -->nodeList对象-类数组对象
context.getElementsByClassName(""); 兼容性:(ie6-ie8不兼容)
var oClass = div1.getElementsByClassName("a1 a2");<!--more-->
console.log(oClass)
document.getElementsByName()//ie不兼容非表单元素,像div这个元素没法通过name属性获得到这个标签
var oName = document.getElementsByName("xm");
console.log(oName.length);
contexts.querySelector() //通过选择器获得到一个元素(ie9以下都不兼容,一般适用于移动端)
contexts.querySelectorAll()通过选择器获得到一组元素(ie9以下都不兼容,一般适用于移动端)
console.log(div1.querySelectorAll(".a1"))
document.documentElement //html元素
document.body  //body元素

---

DOM可以将html/xml文档描绘成一个具有层次结构的节点树,节点和节点之间具有层次关系,
每个节点都有自己的属性和方法 整个页面文档节点(根节点--document) 文档节点里面有且只有一个文档元素(html元素)
文档节点(document) nodeType 9  nodeName #document nodeValue null
元素节点 nodeType 1  nodeName 大写的标记名 nodeValue null
文本节点 nodeType 3 nodeName #text  nodeValue 文本内容(回车或者空格)
注释节点 nodeType 8 nodeName #comment nodeValue 注释的内容
firstChild 获得第一个子节点(元素节点/文本节点/注释节点)
firstElementChild //获得第一个子元素节点 (兼容性:ie6-ie8不兼容)
lastChild 获得最后一个子节点(元素节点/文本节点/注释节点)
lastElementChild 获得最后一个子元素节点  (兼容性:ie6-ie8不兼容)
previousSibling 获得哥哥节点
previousElementSibling 获得哥哥元素节点(兼容性:ie6-ie8不兼容)
nextSibling 获得弟弟节点
nextElementSibling 获得弟弟元素节点(兼容性:ie6-ie8不兼容)
parentNode 父节点 (有且只有一个节点)
childNodes 获取ul下的所有的子节点(元素节点/文本节点/注释节点)
children 获取ul下的所有的元素节点(兼容性:ie6-8里会把文本也当成元素节点)

---

 动态创建div元素 //createElement createTextNode
    var oDiv2 = document.createElement("div");
    oDiv2.id = "div2";
    oDiv2.innerHTML ="我是动态创建的div2";
    var oText = document.createTextNode("我是动态创建的文本节点")
    oDiv2.appendChild(oText);
    把动态创建的内容添加到页面
    appendChild()将元素添加到指定的最后
    document.body.appendChild(oDiv2)
 insertBefore 把newEle放到oldEle元素之前
 document.body.insertBefore(oDiv2,oDiv1);
 oDiv1.parentNode.insertBefore(oDiv2,oDiv1);

 replaceChild 用newEle替换oldEle
   document.body.replaceChild(oDiv2,oDiv1);
 removeChild 删除某个元素
 oDiv1.parentNode.removeChild(oDiv1);

cloneNode(true/false) 参数是true表示深度克隆,把后代都克隆出来 参数是false只克隆本身,默认的不写参数,相当于写了false
   var oDiv4 =  oDiv1.cloneNode(true);
    document.body.appendChild(oDiv4);

oDiv1.zhufeng = "peixun";
console.log(oDiv1.zhufeng)
setAttribute()设置属性和值
oDiv1.setAttribute("zhufeng","peixun");
console.log(oDiv1.zhufeng)
getAttribute() 获得属性值
console.log(oDiv1.getAttribute("zhufeng"));
oDiv1.setAttribute("class","div1") //有兼容性问题:ie6-7不兼容 能设置class这个属性,但是样式不起作用