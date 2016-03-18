---
title: 布尔及判断总复习
date: 2016-02-27 19:27:37
tags:
- 数据类型
- 布尔
categories: JavaScript
---
== 不同数据类型比较时,两边会作强制数据类型转换 === 绝对相等 (值和类型都相等返回true,否则返回false)

1、`{}=={} -->false`对象 == 对象 两边**比较**的是引用**地址**


2、`[]=="" -->true`对象 == 字符串 对象首先会隐式的调用**toString()**方法转变字符串类型


3、`[]==3 -->false`对象 == 数字 对象首先会隐式的调用**toString()**方法转变字符串类型,然后字符串(**Number()**)再强制转换成数字


4、`[]==true -->false`对象 == 布尔 两边先强制转换成number类型的,然后再作比较


5、`true == 4 -->false`布尔 = 数字  布尔转换成number类型


6、`true == "abc" -->false`布尔 == 字符串  两边先转换成number类型 ,然后再作比较 <!--more-->


7、`"1" == 1 -->true`字符串 == 数字  把字符串转换成number类型 ;


8、`NaN == NaN -->false` NaN和任意数(包含自己)比较,返回false


9、`null == undefined --> true`


10、`undefined=="undefined";//false`null和undefined与其他数据类型作比较时,(null和undefined没有toString()方法)都是返回false


**总结：**


1、NaN就连和自己都false


2、undefined、null互相认识，其他和谁都false


3、对象和对象比，是比较指针


4、对象和字符串比，转换为字符串


5、其他情况都是先转换为number再比！


**附Number()方法总结**


Number() 提取纯数字字符串、对布尔true1false0、Date变毫秒



**附Boolean()方法总结**


""、0、-0、NaN、null、undefined 转化为布尔为false


其他均为true！