---
title: JavaScript中的基本包装类型及其方法概览
date: 2016-02-23 18:13:39
tags:
- 布尔
- 数字
- 字符串
- 数据类型
- 对象
categories: JavaScript
---


基本包装类型是一个概念。


引子：
```javascript
var str="string";
str.length;
```


为什么可以返回字符串长度，`"string"`明明是字符串，怎么会包含方法？


实际上JS隐式使用了


```javascript
var str = new String("string");
str.length;
str = "string";
```


方法执行的一瞬间字符串变成了对象，执行方法后又里面转变回来


这种被称为JS的包装类型，除了`string`还有`Boolean`、`Number`


所以其实**可以**显示的使用(但是非常**不推荐**！)


<!--more-->


```javascript
var str=new String("string");
//因为new Object自带工厂方法，所以上面方法相当于var str2=new Object("string");
var num=new Number(123);//同上
var boo=new Boolean(flase);//极不推荐，boo直接用无论如何都是true
```


显式调用虽然可以像正常字面量定义的函数一样运算，但在**检测**类型时带来很大的**麻烦**。**布尔**类型的使用显式调用**更**是会**让人误解**


缺点：


```JavaScript
var obj = new Number(15);
typeof obj; //object
obj instanceof Number; //true
```
```JavaScript
var falseObj = new Boolean(false);
Boolean(falseObj)//true.因为这里操作是对falseObj对象而不是对内部的值
```


优点：


便于理解为什么简单数据类型也带有方法。


具体各种数据类型各带有什么方法，之后补充





概念知道便可，方便我们理解JavaScript的原理。实际运用中**不建议**使用显式声明



Boolean类型


---


注意Boolean对象的坑。永远不建议使用Boolean对象


Number类型


---
toFixed()


toExponentail()


toPrecision()

String类型


---


.length属性：要注意的是 即使是双字节字母(如汉字)也只占一个长度

**字符方法**


> 字符串中的这些方法均不会改变原字符串！  且都没有兼容问题！



1、`charAt()`获得索引项的字符，


2、`charCodeAt()`根据索引获得相应字符的ascii码值


ES5中，`String`像C++的char[]一样可以通过**方括号和索引**访问，即str[5]相当于str.charAt(5)。不过str[5]这种写法IE6、7不兼容


3、`split("")`根据指定的字符，将字符串拆分成数组。与数组的`join("")`互逆





4、`indexOf()`和数组中的indexOf一样，返回当前字符第一次在字符串中的索引。若查找不到则返回-1


5、`lastIndexOf()`和indexOf方向相反，从后往前找，也是返回索引


数组中的`indexOf()`和`lastIndexOf()`不兼容IE6-8，字符串中却无兼容问题！





**字符串操作**


6、`concat()`和在数组中用法一样，会先创建一个副本，将传入的多个字符串会连接起来并返回


**在大多情况下还是用`+`拼接更为方便**


**截取字符串**


7、`slice()`和数组中方法相同，可以是负数索引


8、`substr(index,[可选num])`从第index项截取num个字符，若num缺省则到最后


9、`substring(from,[可选to])`从第from项取到to（含前不含后），to缺省则到最后


截不到的时候就返回空字符串


**改变String中字母大小写**


10、`toLowerCase();`变小写


11、`toUpperCase();`变大写


12、`replace("原文","替换内容")`替换第一个出现的。此方法还有更强大的用法将在正则中补充
