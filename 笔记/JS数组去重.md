---
title: JS数组去重及随机抽样
date: 2016-02-24 18:14:48
tags: 
- 算法
- 去重
categories: JavaScript
---
数组去重
---
听说曾经有人面试遇到了这个题目，据说还是常见面试题，乍一听蛮难的其实是纸老虎。不过我今天听别人说才发现数组去重原来有这么多方法（不考虑NaN）
大概方向为：
1、数组自带的迭代方法。2、双重for循环。3、利用obj的key不重复。

1、用数组的filter()方法
---
思想：在filter方法中写一个for循环，一旦是出现过的就return:false，在filter方法结束后自动删除false标记的项
不上代码了，见之前的笔记：数组复习
<!--more-->
2、双重for循环
---
其实难度也是很低，堪比**乘法表**，不过有一点要注意的，就是注意**数组的塌陷**
PS：这就是我前面说的看培训班在线免费课新老师没写出来的数组去重方法，不过我相信她应该是一时脑袋卡壳了，毕竟讲课会比较紧张不像自己码的那么自如
上代码：
```JavaScript
var arr=[1,1,1,null,"a","a",2,1,1];
for (var i = 0; i < arr.length-1; i++) {
    for (var j = i+1; j < arr.length; j++) {
            if (arr[i]===arr[j]) {
                arr.splice(j,1);
                j--;//唯一要注意的地方
            }
    }
}
```
3、利用obj的key不可能重复
---
这个是个很新颖的想法，可以少写一层for循环了
```JavaScript
var arr=[1,1,1,null,"a","a",2,1,1];
var obj={};//非纯数字去重所以用obj而不用数组
var newArr=[]
for(var i=0;i<arr.length;i++){
	if(obj[arr[i]]===undefined){//全等，有效防止null不能被存进去
		obj[arr[i]]=arr[i];
			newArr.push(arr[i]);
		}
	}
obj=null;//用不到的对象接触绑定是个好习惯
console.log(newArr);
```
这种方法比前面两种都快，但是由于多了一个对象，占用空间也会大，何种方法需要自己衡量
随机抽样：
---
随机抽样是很常用的算法，第一次接触随机抽样是给“爱心小鱼”小游戏的时候，给50个海葵里随机生成30个果实，每个海葵最多有一个果实。
随机抽样也是难的不会会的不难
为了避免重复抽到同一个，最简单的方法是splice删掉已经用过的。怕改变到原数组的话可以用concat或者splice(0)创建一个数组副本

splice方法
---
```javascript
var arr=[1,2,3,4,5,6,9,8,7]
function order(arr,n){
    var arr2=arr.concat();//创建一个原数组副本，防止原数组被修改
    var newArr=[];
    for(var i=0;i<n;i++){
    //注意！newArr=newArr.concat(XXX)，因为concat不会改变原数组，要手动赋值
    newArr=newArr.concat(arr2.splice(Math.floor(Math.random()*arr2.length),1));
    }
    arr2=null;//用不到的引用型数据手动清空是好习惯，虽然这里不必要
    return newArr;
}
```
抽样当然也还有双重for循环方法和object法，类比上面的去重，记录index值出现重复就 i--，不多赘述
