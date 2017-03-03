var objectFactory=function(){

	var obj=new Object();                    //从Object.prototype 上克隆一个空对象
	Constructor = [].shiftcall(arguments);  //取得外部传入的构造器
	obj.__proto__=Constructor.prototype;   // 指向正确的原型

	var ret=Constructor.apply(obj, arguments);  //借用外部传入的构造器给obj设置属性
	return typeof ret='object' ? ret : obj;

}

var Type={};

for(var i=0, type; type=['String', 'Array', 'Number'][i++];){
	(function(type){
		Type['is'+type]=function(obj){
			return Object.prototype.toString.call(obj)=='[object '+type+']';
		}
	})(type)
}

Type.isArray([]);
Type.isString('str');


//闭包和面向对象设计
var extent=function(){

	var value=0;
	return {
		call:function(){
			value++;
			console.log(value);
		}
	}
};


var extents={
	value:0;
	call:function(){
		this.value++;
		console.log(this.value)
	}
};


var Extent=function(){
	this.value=0;
}
Extent.prototype.call=function(){
	this.value++;
	console.log(this.value)
}

var Tv={
	open:function(){
		console.log('open t')
	},
	close:function(){
		console.log('close t')
	}
}

var OpenTvCommand=function(receiver){
	this.receiver=receiver;
}

OpenTvCommand.prototype.execute=function(){
	this.receiver.open();
}

OpenTvCommand.prototype.undo=function(){
	this.receiver.close();
}

var setCommand=function(command){
	document.getElementById('execute').onclick=function(){
		command.execute();
	};

	document.getElementById('undo').onclick=function(){
		command.undo();
	}
};

setCommand(new OpenTvCommand(Tv));


var tv={
	open:function(){
		console.log('open tv');
	},
	close:function(){
		console.log('close tv');
	}
};

var createCommand=function(receiver){

	var execute=function(){
		return receiver.open();
	}

	var undo=function(){
		return receiver.close();
	}

	return {
		execute:execute,
		undo:undo
	}
};

var setCommands=function(command){

	document.getElementById('execute').onclick=function(){
		command.execute();
	}

	document.getElementById('undo').onclick=function(){
		command.undo()
	}
}

setCommands(createCommand(tv))


var isString=function(obj){
	return Object.prototype.toString.call(obj) === '[object String]';
}

var isArray=function(obj){
	return Object.prototype.toString.call(obj) === '[object Array]';
}

var isNumber=function(obj){
	return Object.prototype.toString.call(obj) === '[object Number]';
}

var isType=function(type){
	return fuction(obj){
		return Object.prototype.toString.call(obj) === '[object '+type+']';
	}
}



var Type={};

for(var i, type; type=['String', 'Array', 'Number'][i++];){

	(function(type){
		Type['is'+type]=function(obj){
			Object.prototype.toString.call(obj)==='[object '+type+']'
		}
	})(type)
};

Function.prototype.before=function(beforefn){

	var _self=this;
	return function(){

		beforefn.apply(this, arguments);
		return _self.apply(this, arguments);

	}

};

Function.prototype.after=function(afterfn){

	var _self=this;
	return function(){

		var ret=_self.apply(this, arguments);
		afterfn.apply(this, arguments)

		return ret;
	}
	
}