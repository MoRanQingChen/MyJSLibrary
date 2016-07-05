function Search(ele,list,data){
	this.data = data;
	this.ele = document.querySelector(ele);
	this.ul=document.querySelector(list);
	this.bindEvent.call(this);
}
Search.prototype = {
	counstructor: Search,
	bindEvent: function() {
		var _this=this;
		this.ele.onkeyup = function() {
			_this.search(this.value, function(arr) {
				this.ul.innerHTML = "";
				for (var i = 0; i < arr.length; i++) {
					this.ul.innerHTML += "<li>" + arr[i].Name + "</li>"
				}
			});
		}
	},
	search: function(a, callback) {
		var yun = [[new RegExp("b", "g"), "-b"],[new RegExp("p", "g"), "-p"],[new RegExp("m", "g"), "-m"],[new RegExp("f", "g"), "-f"],[new RegExp("d", "g"), "-d"],[new RegExp("t", "g"), "-t"],[new RegExp("n", "g"), "-n"],[new RegExp("l", "g"), "-l"],[new RegExp("g", "g"), "-g"],[new RegExp("k", "g"), "-k"],[new RegExp("h", "g"), "-h"],[new RegExp("j", "g"), "-j"],[new RegExp("q", "g"), "-q"],[new RegExp("x", "g"), "-x"],[new RegExp("zh", "g"), "-zh"],[new RegExp("ch", "g"), "-ch"],[new RegExp("sh", "g"), "-sh"],[new RegExp("r", "g"), "-r"],[new RegExp("z", "g"), "-z"],[new RegExp("c", "g"), "-c"],[new RegExp("s", "g"), "-s"],[new RegExp("y", "g"), "-y"],[new RegExp("w", "g"), "-w"]];
		a = a.toLowerCase()
		for (var i = 0; i < yun.length; i++) {
			a = a.replace(yun[i][0], yun[i][1]);
		}
		a = a.split("-");
		var exp = new RegExp(a.join(".*"));
		var arr = [];
		for (var i = 0; i < this.data.length; i++) {
			if (exp.test(this.data[i].search)) {
				arr.push(this.data[i]);
			}
		}
		if (arr.length == 525) {
			arr = []
		} else if (arr[0] == undefined) {
			arr = [{
				Name: "未查询到相应的结果..."
			}]
		}
		callback(arr);
	}
}