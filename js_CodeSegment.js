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


var monthlyCost=0;

function cost(money){
	monthlyCost+=money;
}


var cost=(function(){
	var args=[];

	retrun function(){
		if(arguments.length===0){
			var money=0;
			for(var i=0, l=args.length; i<l; i++){
				money += args[i];
			}
			return money;
		}else{
			[].push.apply(args, arguments)
		}
	}
})();


var currying=function(fn){

	var args=[];
	return function(){
		if(arguments.length===0){
			return fn.apply(this, args)
		}else{
			[].push.apply(args, arguments);
			return arguments.callee;
		}
	}
}

var costl=(function(){
	var money=0;
	return function(){
		for(var i=0, l=arguments.length; i<l; i++){

			money+=arguments[i];

		}
		return money;
	}
})()


Function.prototype.uncurrying=function(){
	var _self=this;
	return function(){
		var obj=Array.prototype.shift.call(arguments);
		return _self.apply(obj, arguments)
	}
}


for(var i=0, fn, ary=['push', 'shift', 'forEach']; fn=ary[i++];){
	Array[fn]=Array.prototype[fn].uncurrying();
}

//传统单例模式
var CreateDiv=(function(){

	var instance;
	var CreateDiv=function(html){
		if(instance) return instance;

		this.html=html;
		this.init();
		return instance=this;
	};

	CreateDiv.prototype.init=function(){
		var div=document.createElement('div');
		div.innerHTML=this.html;
		document.body.appendChild(div);
	};

	return CreateDiv;
})();



var CreateDivl=function(html){
	this.html=html;
	this.init();
};


CreateDivl.prototype.init=function(){
	var div=document.createElement('div');
	div.innerHTML=this.html;
	document.body.appendChild(div);
}
//代理模式
var ProxySingletonCreateDiv=(function(){

	var instance;
	return function(html){
		if(!instance) instance=new CreateDivl(html);

		return instance;
		
	}
})();


var MyApp={};

MyApp.namespace=function(name){
	var parts=name.split('.');
	var current=MyApp;

	for(var i in parts){
		if(!current[parts[i]]){
			current[parts[i]]={};
		}

		current=current[parts[i]];

	}
};


var createLoginLayer=(function(){
	var div;
	return function(){
		if(!div){
			div=document.createElement('div');
			div.innerHTML="this is LoginLayer ";
			div.style.display="none";
			document.body.appendChild(div);
		}
	}
})();

var getSingle=function(fn){
	var result;
	return function(){
		/*if(!result){
			result=fn.apply(this, arguments);
		}*/

		return result || (result=fn.apply(this, arguments));

	}
};

var createLoginDiv=function(){
	var div=document.createElement('div');
	div.innerHTML='this is login layer';
	div.style.display='none';
	document.body.appendChild(div);
	retrun div;
}

var createSingleLoginLayerDiv=getSingle(createLoginDiv);

var createIframe=function(){
	var iframe=document.createElement('iframe');
	document.body.appendChild(iframe);
	retrun iframe;
}

var createIframeLayer=getSingle(createIframe);


//策略模式
var performaceS=function(salary){
	return salary*4;
};
var performaceA=function(salary){
	return salary*3;
};
var performaceB=function(salary){
	return salary*2;
};

var calculateBonus=function(performace, salary){
	if(performace==='S') return performaceS(salary);
	if(performace==='A') return performaceA(salary);
	if(performace==='B') return performaceB(salary);
}

var performaces=function(){};
performaces.prototype.calculate=function(salary){ return salary*4 };

var performacea=function(){};
performacea.prototype.calculate=function(salary) { return salary*3 };

var performaceb=function(){};
performaceb.prototype.calculate=function(salary) { return salary*2 };

var Bouns=function(){
	this.salary=null;
	this.strategy=null;
}

Bouns.prototype.setSalary=function(salary){
	this.salary=salary;
}
Bouns.prototype.setStrategy=function(strategy){
	this.strategy=strategy;
}
Bouns.prototype.getBouns=function(){
	return this.strategy.calculate(this.salary);
}

var bouns=new Bouns();
bouns.setSalary(1000);
bouns.setStrategy(new performaceb());

bouns.setStrategy(new performaces());


//JavaScript 中的策略模式
var strategies={
	'S':function(salary){
		return salary*4;
	},
	'A':function(salary){
		return salary*3;
	},
	'B':function(salary){
		return salary*2;
	}
};

var calculateBonu=function(level, salary){
	return strategies[level](salary);
}

var tween={
	linear:function(c, t, d, b){
		return c*t/d+b;
	},
	easeIn:function(c, t, d, b){
		return c*(t/=d)*t + b;
	},
	strongEaseIn:function(c, t, d, b){
		return c*(t/=d )*t*t*t*t+b;
	},
	strongEaseOut:function( t, b, c, d ){
		return c*((t=t/d-1)*t*t*t*t+1)+b;
	},
	sinEaseIn:function( t, b, c, d ){
		return c*( t/=d )*t*t+b;
	},
	sinEaseOut:function(t, b, c, d){
		return c*((t=t/d-1)*t*t+1)+b;
	}
};

var Animate=function(dom){
	this.dom=dom;
	this.startTime=0;
	this.startEnd=0;
	this.startPos=0;
	this.endPos=0;
	this.propertyName=null;
	this.easing=null;
	this.duration=null;
};

Animate.prototype.start=function(propertyName, endPos, duration, easing){

	this.startTime=+new Date;
	this.startPos=this.dom.getBoundingClientRect()[propertyName];
	this.propertyName=propertyName;
	this.endPos=endPos;
	this.easing=tween[easing];
	this.duration=duration;

	var self=this;
	var timeId=setInterval(function(){

		if(self.step()===false) clearInterval(timeId);

	}, 19);

};

Animate.prototype.step=function(){

	var t=+new Date;
	if(t>=this.startTime + this.duration){
		this.update(this.endPos);
		return false;
	}

	var pos=this.easing(t-this.startTime, this.startPos, this.endPos-this.startPos, this.duration);

	this.update(pos);
};

Animate.prototype.update=function(pos){
	this.dom.style[this.propertyName]=pos+'px';
}


var fromStartegies={
	isMobile:function(value, errorMsg){
		if(!/^1[3|5|8|7][0-9]{9}/.test(value)) return errorMsg;
	},
	minLength:function(value, length, errorMsg){
		if(value.length<length) return errorMsg;
	},
	isNoneEmpty:function(value, errorMsg){
		if(value==='') return errorMsg;
	}
};

var Validator=function(){
	this.cache=[];
}

Validator.prototype.add=function(dom, ruler, errorMsg){
	var ary=ruler.split(':');
	this.cache.push(function(){

		var strategy=ary.shif();
		ary.unshift(dom.value);
		ary.push(errorMsg);
		return formStartegies[strategy].apply(dom, ary);

	})
};

Validator.prototype.addArray=function(dom, rules){
	var self=this;

	for(var i=0, rule; rule=rules[i++];){
		(function(rule){
			var strategyAry=rule.strategy.split(':');
			var errorMsg=rule.errorMsg;

			self.cache.push(function(){
				var strategy=strategyAry.shift();
				strategyAry.unshift(dom.value);
				strategyAry.push(errorMsg);
				return formStartegies[strategy].apply(dom, strategyAry)
			})
		})(rule)
	}
};

Validator.prototype.start=function(){
	for(var i=0, validatorFunc; validatorFunc=this.cache[i++];){
		var msg=validatorFunc();
		if(msg){
			return msg;
		}
	}
};

Validator.prototype.startAry=function(){
	for(var i=0, validatorAry; ValidatorAry=this.cache[i++];){
		var errorMsg=validatorAry();
		if(errorMsg) return errorMsg;
	}
};

var validatorAry=function(){
	var validator=new Validator();
	validator.addArray(registerForm.userName, [{
		strategy:'isNoneEmpty',
		errorMsg:'用户名不能为空'
	},
	{
		strategy:'minLength:10',
		errorMsg:'用户名长度不能小于10位'
	}]);

	validator.addArray(registerForm.password, [{
		strategy:'minLength:6',
		errorMsg:'密码长度不能小于6位'
	}]);
}


var validatorFunc=function(){
	var validator=new Validator();
	validator.add(registerForm.userName, 'isNoneEmpty', '用户名不能为空');
	validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位');
	validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确');

	var errorMsg=validator.start();
	return errorMsg;
};


var myImage=(function(){
	var imgNode=document.createElement('img');
	document.body.appendChild(imgNode);

	return {
		setSrc:function(src){
			imgNode.src=src;
		}
	}
})();

var proxyImage=(function(){
	var img=new Image;
	img.onload=function(){
		myImage.setSrc(this.src);
	}
	return {
		setSrc:function(src){
			myImage.setSrc('../images/loading.gif');
			img.src=src;
		}
	}
})();

var MyImage=(function(){
	var imgNode=document.createElement('img');
	document.body.appendChild(imgNode);

	var img=new Image;

	img.onload=function(){
		imgNode.src=img.src;
	};

	return {
		setSrc:function(src){
			imgNode.src='../images/loadding.gif';
			img.src=src;
		}
	}
})();


var synchronousFile=function(id){

	console.log('开始同步文件，id为:'+id);

}

var proxySynchronousFile=(function(){
	var cache=[];
	var timer;
	return function(id){
		cache.push(id);
		if(timer) return;

		timer=setTimeout(function(){
			synchronousFile(cache.join(','));
			clearTimeout(timer);
			timer=null;
			cache.length=0;
		}, 2000)
	}
})();

var miniConsole=(function(){

	var cache=[];
	var handler=function(ev){
		if(ev.keyCode===113){
			var script=document.createElement('script');
			script.onload=function(){
				for(var i=0, fn; fn=cache[i++];){
					fn();
				}
			};

			script.src='miniCode.js';
			document.getElementsByTagName('head')[0].appendChild(script);
			document.body.removeEventListener('keydown', handler)
		}
	};

	document.addEventListener('keydown', handler, false);

	return {
		log:function(){
			var args=arguments;
			cache.push(function(){
				return miniConsole.log.apply(miniConsole, args);
			})
		}
	}
})()


//计算乘积
var mult=function(){
	console.log('开始计算乘积：');

	var a=1;
	for(var i=0, l=arguments.length; i<l; i++){
		a=a*arguments[i];
	}
	return a;

};

var proxyMult=(function(){
	var cache={};
	return args=Array.prototype.join.call(arguments, ',');
	if(args in cache){ return cache[args]; }

	return cache[args]=mult.apply(this, arguments);

})();

var plus=function(){
	var a=0;
	for(var i=0, l=arguments.length; i<l; i++){
		a=a+arguments[i];
	}
	return a;
}

var minus=function(){
	var a=0; 
	for(var i=0, l=arguments.length; i<l; i++){
		a=arguments[i]-a;
	}
	return a;
}

var createProxyFactory=function(fn){
	var cache={};
	return function(){
		var args=Array.prototype.join.call(arguments, ',');
		if(args in cache) return cache[args];

		return cache[args]= fn.apply(this, arguments);
	}
}


//迭代器
var each=function(ary, callBack){
	for(var i=0, l=ary.length; i<l; i++){
		callBack.call(ary[i], i, ary[i]);
	}
}