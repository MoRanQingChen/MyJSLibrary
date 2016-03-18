		//拓展四:仿JQ选择器(JQ选择器太复杂还有很多要拓展的...)
		function $(str){
			str.replace(/^ +| +$/,"");
			var strArr=str.split(/ +/);
			var temp=$inner(strArr[0])
			for(var i=1;i<strArr.length;i++){
				temp=$inner(strArr[i],temp)
			}
			return temp
			function $inner(name){
			console.log(arguments[1])
			if(arguments[1]==undefined){
				arguments[1]=document.getElementsByTagName('*')
			}else if (!(arguments[1] instanceof Array)) {
				var arr=[];
				arr.push(arguments[1]);
				arguments[1]=arr
			}
			console.log(arguments[1])
			var arr=[];
			var reg=new RegExp("(^| )"+name.substring(1)+"( |$)");
			if (name[0]=='.') {
				for (var i = 0; i < arguments[1].length; i++) {
					if(reg.test(arguments[1][i].className)){
						arr.push(arguments[1][i]);
					}
				}
				return arr.length==1?arr[0]:arr;
			}else if(name[0]=='#'){
				for (var i = 0; i < arguments[1].length; i++) {
					if(reg.test(arguments[1][i].id)){
						return arguments[1][i]
					}
				}
			}
		}
		}
/*		用法:
		$('.class2 .class5').innerHTML="这里是.class2 .class5"
		$('.class7')[0].innerHTML="我是第一个有class7的"
		$('.class7')[1].innerHTML="我是第二个有class7的"
		$('#test').style.background="orange"//找到ID为test的,把背景变成橙色
		$('.class2 .class5').innerHTML="这里是.class2 .class5"
*/
//--------------------------------------------------------------------------------
		//拓展三:直接某元素.index();或者this.index()就能获得索引
		HTMLElement.prototype.index=function(){
			for(var i=-1,ele=this;ele;ele=ele.previousSibling){
				ele.nodeType==1&&i++
			}
			return i;
		}
/*		用法
		for (var i = 0; i < oLis.length; i++) {
			oLis[i].onclick=function() {
				alert(this.index());//内部访问不到i,直接用index()
			}
		}*/
//--------------------------------------------------------------------------------
		// 元素.addClass("class1")这样用了! 就像 元素.className("")一样方便  简直炫酷
		HTMLElement.prototype.addClass=function(str){
			var reg=new RegExp("(^| +)"+str+"( +|$)");
			reg.test(this.className)||(this.className+=" "+str);
		}
		/*		
		用法
		$('.test .havetry').addClass('blue');*/
//--------------------------------------------------------------------------------

		//小拓展二:用正则做,如果要移除的class在中间的话,可能会连同空格移除导致前后连起来所以注意replace的回调
		var oLis=document.getElementsByTagName("li");
		HTMLElement.prototype.removeClass=function(str){
			var reg=new RegExp("(\\b| +)"+str+"( +|\\b)","g");//注意转义字符
			this.className=this.className.replace(reg,function(a,b,c){
				return b&&c&&" ";
			});
		}
/*		用法
		$('.test .havetry').removeClass('test')*/
		//小拓展一:直接把方法添加到HTMLElement的prototype中,添加以后就可以直接
