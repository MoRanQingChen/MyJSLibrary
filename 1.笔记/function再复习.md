---
title: function再复习
date: 2016-02-22 17:21:09
tags:
- 方法
- 对象
categories: JavaScript
---


感觉JavaScript(ECMAScript)中最神奇的地方莫过于function了


它与其他的编程语言中的方法完全不同


在JavaScript中，**函数是对象，函数名是指针**。


定义方法有三种方式


```javascript
function sum(a,b){return a+b;}  //常用，享受声明提升
```
```javascript
var sum = function(a,b){return a+b;}  //和第一种很像，仅在变量提升时会出错
```
```javascript
var sum = new Function("a","b","return a+b;")
```



**第三种**以**对象的实例**方式创建方法，接收到的最后一个参数即为函数体。这种方法非常**不推荐**，因为这种方会导致**解析两次**而产生性能影响


<!--more-->


但从中我们可以看出来，function确实是object的一种。而且方法体是用**字符串的形式储存**在堆数据中的


（这也能解释为什么在for循环里定义function，一旦牵扯到i的话不用闭包会出错）





由于function和对象一样，所以可能**有两个指针指向同一个方法**，即一个函数有两个函数名。所以当两个方法指向同一个地址时，若有一个不需要用了，记得**及时赋值为null解除绑定**，避免不必要的出错





没有重载

---


在其他语言中，我们经常使用返回值的不同、参数的不同来实现函数的重载。


而JavaScript中因为“函数名是指针，函数是对象”我们可以很清楚，**一个**对象名（**指针**）**不可能指向两个地址**


所以新写入的function肯定会覆盖掉过去的


不过我们可以利用JavaScript自带的形参**arguments**来实现“**伪重载**”


即使用arguments的length来判断传入参数的多少，来选择执行哪一段函数





函数提升与变量提升


---


JavaScript刚开始时，解析器会率先读取声明（包括function和var），读取function声明时会读取整个函数的声明，所以先调用后定义在JavaScript中也是可行的。但是在读取var声明时，只会读取到变量，而读不到它的值（默认为undefined）


所以：


```javascript
sum(1,2);
function sum(a,b){alert(a+b);}//可行
```
```javascript
sum(1,2);//解析器读到的sum为undefined
var sum = function(a,b){alert(a+b);}//不可行
```


函数作为值


---


因为函数是对象，所以很明显，函数也可以像对象一样传输。


有一点要注意的是，如果是要**访问**函数的指针而不是执行函数的话，一定不要加小括号，函数作为参数**传递**的时候，也是千万**不要加小括号**。


同样，可以由一个函数的**return再返回一个函数**。这是一项**十分有用**的技术！





之前讲过数组的sort排序，这里举一个例子：


```JavaScript
var a=[{name:'bbb',age:11},{name:'aaaa',age:10},{name:'ccc',age:9}];
function compare(obj1,obj2) {
    if(obj1.name>obj2.name)return 1;
    return -1;
}
a.sort(compare);
```


上面的例子是写死了，使用obj的name属性进行排序，如果有时用obj的其他属性排序所以不想写死呢？


```JavaScript
var a=[{name:'bbb',age:11},{name:'aaaa',age:10},{name:'ccc',age:9}];
function compare(propertyName) {
    return function (obj1,obj2) {//内层匿名函数
        if(obj1[propertyName]>obj2[propertyName])return 1;
        return -1;
    }
}
a.sort(compare('name'));
```


这个例子刚看的时候感觉很复杂，其实仔细分析一下


`a.sort()`括号内需要一个函数名(指针)，而且该函数有两个形参。



我们定义一个compare方法，**使compare方法的返回值是一个有两个形参的函数**（return的function最后面没有小括号，不会自动执行）



**真正运行时**,`a.sort(compare('name'))`中的**`compare('name')`会先运行**（因为函数后面有小括号），而`compare('name')`运行后**返回的结果会作为`sort()`内所真正需要的`function`**。



再举一个例子


我们知道选项卡的问题，或者是点击第N个按钮就弹出它的索引N这样的，在for循环内为click添加function，除了用自定义属性和闭包外，还有更高大上的方法！


```JavaScript
for(var i = 0;i<oInput.length;i++){
    oInput[i].onclick = function(i){
        return function(){
            alert(i);
        }
    }(i)
}
```



函数的内部属性


---


JavaScript内部自带两个参数`arguments`和`this`。



**`arguments`参数**



 >- `arguments`用类似数组的对象自动保存了所有接收到的参数。
 >- 调用`arguments`像数组，直接用`arguments[数字]`。同样`arguments`也有`length`方法
 >- 这个对象还有一个名为`callee`的属性，该属性是一个指针，指针指向函数体本身。(严格模式下不可用)



这个属性往往会在递归中用到。例如


```JavaScript
function factorial(num){
	if(num<=1)return 1;
	else return num*factorial(num-1);//调用了自己
}
```


像上面的调用了自己的情况，增加了代码的藕合性。


当有类似 `var newFactorial = factorial`的语句出现的时候，newFactorial的递归调用还是会调factorial方法，而不是调用他自己，所以会带来不便。针对这一的情况，我们应该改写一下上面的递归方法：


```JavaScript
function factorial(num){
	if(num<=1)return 1;
	else return num*arguments.callee(num-1);//arguments.callee相当于自己的方法名
}
```


---


`this`属性，`apply()`、`call()`和`bind()`


`this`与C、Java中的几乎相同，是引用的**执行该函数**的**环境对象**





说到`this`就要提到函数的`apply()`和`call()`方法


`apply()`和`call()`最强大之处在于可以接受一个参数作为this，以扩大函数依赖的作用域，从而降低函数的耦合性


`apply()`和`call()`方法唯一不同之处就是接收形参的方式，





> - call接收很多参数，第一个参数为代表this的作用域，之后的都是所调用的函数的形参。
> - apply只接收两个参数，第一个是代表this的作用域，第二个是以数组形式的形参。当然！第二个参数可以直接是父函数的arguments

下面直接举例子：


```javascript
var xiaoMing={name:'xiaoming',age:19};
var xiaoHong={name:'xiaohong',age:80};
function say(key,str){
    alert(str+this[key]);
}
say.call(xiaoMing,'name','MyNameIs:');//this是xiaMing，之后传入的参数是say的参数
say.apply(xiaoHong,['age','MyAge:']);//注意区别
```


`bind`方法



`bind`方法返回一个函数**副本**，该副本强制**切换**了函数的**this**值，如：


```javascript
var name="xiaoHong"
var xiaoMing={name:"xiaoMing"};
function sayName(){
    alert(this.name);
}
var xiaoMingSay=sayName.bind(xiaoMing);//返回副本
sayName();//原函数并未改变
xiaoMingSay();//身在全局，心(this)在小明

```



> **bind的运用技巧及优点日后补充！**


---


`caller`属性(严格模式下不可用)
`caller`属性与`this`类似，不过`this`指的是环境对象，而caller指的是方法名
`caller`是指  调用该方法的方法 的方法名，如果是在全局函数中用`caller`则返回`null`
（`caller`可理解为父函数）意义为实现更低的藕合性
```javascript
function outer(){inner();}
function inner(){
    alert(inner.caller);
    //alert(arguments.callee.caller)更好
}
outer();//返回outer的函数体
```


函数属性和方法


---


每个函数都包含`length`和`propertype`。

---


其中`length`方法表示**希望**接收的参数的个数
```javascript
function test(a,b,c,d){//函数体}
alert(test.length)   //4，因为形参数量为4
```
---


`porpertype`属性其实是保存方法实例的真正所在；
`toString()`、`valueOf()`等方法实际上保存在`porpertype`上
只不过访问的时候都是通过对象名。
`porpertype`的详细用法将会在面向对象时再总结