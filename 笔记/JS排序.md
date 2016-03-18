---
title: JS普通、冒泡、快速、插入排序方法（未完结）
date: 2016-02-24 18:06:43
tags: 
- 排序
- 算法
categories: JavaScript
---
数组排序在JS中，用`sort()`方法很简单。但是还是要自己手动做排序算法，排序算法本身并不重要，重要的是理解它的**思想方法**。
PS：有的人说大一就会了，我大二的时候才只会冒泡……忽然觉得自己好可怜没能选计算机专业

1、JS内置排序
---
`sort()`在数组复习那篇文章，不多说了。

2、最常规的排序
--
思想：第一项和后面每一项比，一旦比谁大了就换位置；然后第二项和后面每一项比……
```JavaScript
    for (var i = 0; i < arr.length-1; i++) {//最后一项不用比，所以是length-1
        for (var j = i+1; j < arr.length; j++) {
            var temp;
            if (arr[i]>arr[j]) {//arr[j]是arr[i]之后的某个项
                temp=arr[i];
                arr[i]=arr[j];
                arr[j]=temp;
            }
        }
    }
    console.log(arr);
```
<!--more-->
3、冒泡排序
---
思想：每一项和它后面一项比较，比后一项大了就换位。第一轮循环，最大的一项肯定被推到最，推的过程中，沿途受益，所以经过较少的循环就已经完成了排序
```JavaScript
    for (var i = 0; i < arr.length-1; i++) {//最后一项不用比，所以是length-1
        var flag=true;//内外层循环之间定义flag
        for (var j = i+1; j < arr.length-1; j++) {//j和j+1比，最后一次j应该为length-2
            var temp;
            if (arr[j]>arr[j+1]) {//arr[j]是arr[i]之后的某个项
                temp=arr[j+1];
                arr[j+1]=arr[j];
                arr[j]=temp;
                var flag=false;
            }
        }
        if(flag){//经过一轮内层循环flag都没变的话
            return;//优化！！
        }
    }
    console.log(arr);
```
3、插入排序
---
思想：从第二项开始，先储存下来这个数字，然后和**前面**的每一项比较，找到**比自己大**的项就让该项往后挪一位。找到比自己小的项内层循环停止，把储存的数字插进去。
```javascript
function order(arr){
    var temp=null;
    for(var i=1;i<arr.length;i++){//第一项不用比
        temp=arr[i];//arr[i]会被覆盖，所以先保存
        for(var j=i;temp<arr[j-1]&&j>0;j--){//注意！用temp，不要用arr[i]
            arr[j]=arr[j-1];
        }
        arr[j]=temp;
    }
    return arr;
}
```