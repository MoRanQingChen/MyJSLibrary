function Timer(ele,time, callback, interval) {
	this.ele=document.querySelector(ele);
	this.time = time;
	this.callback = callback||function(){};
	this.interval = interval || 1000;
	this.obj = {};
	this.now = new Date();
	return this.getSS.call(this);
}
Timer.prototype = {
	constructor: Timer,
	getSS: function() {
		if (this.time.constructor == String) {
			if (new Date(this.time) == 'Invalid Date') {
				this.time = this.time.match(/\d+/g);
			} else {
				this.time = new Date(this.time)
			}
		}
		if (this.time.constructor == Array) { //年月日时分秒
			if (this.time.length == 6) {
				var time2 = this.time.splice(3, 3);
				this.time = this.time.join("-") + " " + time2.join(":");
			} else if (this.time.length == 5) { //年月日时分
				this.time.push("00");
				var time2 = this.time.splice(3, 3);
				this.time = this.time.join("-") + " " + time2.join(":");
			} else if (this.time.length == 3) {
				if (this.time[0] <= 24) { //时分秒
					this.time = this.now.getFullYear() + "-" + (this.now.getMonth() + 1) + "-" + this.now.getDate() + " " + this.time.join(":");
				} else { //年月日
					this.time = this.time.join("-")
				}
			} else if (this.time.length == 2) { //时分
				this.time = this.now.getFullYear() + "-" + (this.now.getMonth() + 1) + "-" + this.now.getDate() + " " + this.time.join(":") + ":00";
			}
		}
		this.time = new Date(this.time) - this.now;
		this.handleResult.call(this,this.time)
		this.refresh.call(this);
	},
	handleResult: function(time) {
		this.obj.h = double(parseInt(time / 3600000)),
		this.obj.m = double(parseInt(time / 60000) % 60),
		this.obj.s = double(parseInt(time / 1000) % 60),
		this.obj.ss = double(time % 1000)
		this.render.call(this)
		this.callback(this.obj);
		function double(x){if (x<10&&x>=0) {return '0'+x}return x}
	},
	refresh: function() {
		var _this=this;
		setInterval(function() {
			_this.time -= _this.interval;
			_this.handleResult.call(_this,_this.time)
		}, _this.interval)
	},
	render:function(){
		this.ele.innerHTML="<span>"+this.obj.h+"</span>:<span>"+this.obj.m+"</span>:<span>"+this.obj.s+"</span>";
	}
}