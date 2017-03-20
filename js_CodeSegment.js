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
};


var Iterator=function(obj){
	var current=0;

	var next=function(){
		current +=1;
	};

	var isDone=function(){
		return current >=obj.length;
	};

	var getCurrItem=function(){
		return obj[current];
	};

	return {
		next:next,
		isDone:isDone,
		getCurrItem:getCurrItem
	};
};


var compare=function(iterator1, iterator2){

	while(!iterator1.isDone() && !iterator2.isDone()){
		if(iterator1.getCurrItem() !== iterator2.getCurrItem()){
			throw new Error('两者不相等');
		}

		iterator1.next();
		iterator2.next();
	}

	console.log('两者相等')

}


var reverseEach=function(ary, callBack){
	for(var l=ary.length; l>=0; l--){
		callBack(l, ary[l]);
	}
}


//发布订阅模式

var salesOffices={};
	salesOffices.clientList=[];

	salesOffices.listen=function(fn){
		this.clientList.push(fn);
	};

	salesOffices.trigger=function(){
		for(var i=0, fn; fn=this.clientList[i++];){
			fn.apply(this, arguments);
		}
	};

	salesOffices.listen(function(price, squareMeter){ 
			console.log('价格 '+ price);
			console.log('squareMeter '+ squareMeter)
	});

	salesOffices.listen(function(price, meter){
		console.log('价格 '+ price);
		console.log('meter '+ meter);
	});

	salesOffices.trigger(2000, 99);
	salesOffices.trigger(3000, 100);

	var salesOffice={};
		salesOffice.clientList={};

	    salesOffice.listen=function(key, fn){
		if(!this.clientList[key]) this.clientList[key]=[];

		this.clientList[key].push(fn);
	}

	salesOffice.trigger=function(){
		var key=Array.prototype.shift.call(arguments);

		var fns=this.clientList[key];
		if(!fns ||fns.length===0) return false;

		for(var i=0, fn; fn=fns[i++];){
			fn.apply(this, arguments);
		}
	};


var events={
	clientList:[],

	listen:function(key, fn){

		if(!this.clientList[key]) this.clientList[key]=[];

		this.clientList[key].push(fn);
	},

	trigger:function(){

		var key=Array.prototype.shift.call(arguments);
		var fns=this.clientList[key];

		if(!fns || fns.length===0) return false;

		for(var i=0, fn; fn=fns[i++];){
			fn.apply(this, arguments);
		}
	}
};

events.remove=function(key, fn){
	var fns=this.clientList[key];

	if(!fns) return false;

	if(!fn){
		fns && (fns.length=0);
	}else{
		for(var l=fns.length-1; l>=0; l--){
			var _fn=fns[l];
			if (_fn===fn) fns.splice(l, 1);
		}
	}
}


var installEvent=function(obj){
	for(var i in events){
		obj[i]=events[i];
	}
};


var Event=(function(){
	var clientList={},
		listen,
		trigger,
		remove;

	listen=function(key, fn){
		if(!clientList[key]){
			clientList[key]=[];
		}
		clientList[key].push(fn)
	};


	trigger=function(){
		var key=Array.prototype.shift.call(arguments);

		var fns=clientList[key];

		if(!fns || fns.length===0) return false;

		for(var i=0, fn; fn=fns[i++];){
			fn.apply(this, arguments);
		}
	};


	remove=function(key, fn){
		var fns=clientList[key];

		if(!fns) return false;

		if(!fn){
			fns && (fns.length=0);
		}else{

			for(var l=fns.length-1; l>=0; l--){
				var _fn=fns[l];
				if(_fn===fn){
					fns.splice(l, 1)
				}
			}
		}
	};

	return {
		listen:listen,
		trigger:trigger,
		remove:remove
	}
})();

var a=(function(){
	var count=1;
	var button=document.getElementById('count');

	button.onclick=function(){
		Event.trigger('add', count++);
	}
})();

var b=(function(){
	var div=document.getElementById('show');
	Event.listen('add', function(count){ div.innerHTML=count})
})();


var Events=(function(){
	var global=this,
		Events,
		_default='default';

	Events=function(){
		var _listen,
			_trigger,
			_remove,
			_slice=Array.prototype.slice,
			_shift=Array.prototype.shift,
			_unshift=Array.prototype.unshift,
			namespaceCache={},
			_create,
			find,
			each=function(ary, fn){
				var ret;
				for(var i=0, l=ary.length; i<l; i++){
					var n=ary[i];
					ret=fn.call(n, i, n);
				}
				return ret;
			};

			_listen=function(key, fn, cache){
					if(!cache[key]) cache[key]=[];
					cache[key].push(fn);
			};

			_remove=function(key, cache, fn){
				if(cache[key]){
					if(fn){
						for(var i=cache[key].length; i>=0; i--){
							if(cache[key][i]===fn){
								cache[key].splice(i, 1);
							}
						}
					}else{
						cache[key]=[];
					}
				}
			};


			_trigger=function(){
				var cache=_shift.call(arguments),
					key=_shift.call(arguments),
					args=arguments,
					_self=this,
					ret,
					stack=cache[key];

				if(!stack || !stack.length) return;

				return each(stack, function(){
					return this.apply(_self, args)
				});

			}

			_create=function(namespace){

				var namespace=namespace || _default;
				var cache={},
				    offlineStack=[],
				    ret={
				    	listen:function(key, fn, last){
				    		_listen(key, fn, cache);
				    		if(offlineStack === null) return false;

				    		if(last==='last'){
				    			offlineStack.length && offlineStack.pop()();
				    		}else{
				    			each(offlineStack, function(){
				    				this();
				    			})
				    		}
				    		offlineStack=null;
				    	},

				    	one:function(key, fn, last){
				    		_remove(key, cache);
				    		this.listen(key, fn, last);
				    	},

				    	remove:function(key, fn){
				    		_remove(key, cache, fn);
				    	},

				    	trigger:function(){
				    		var fn, 
				    			args,
				    			_self=this;

				    			_unshift.call(arguments, cache);

				    			args=arguments;
				    			fn=function(){
				    				return _trigger.apply(_self, args);
				    			};

				    			if(offlineStack) return offlineStack.push(fn);

				    			return fn();
				    	}
				    };

				    return namespace ? (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace]=ret) :ret;


			};

			return {
				create:_create,
				one:function(key, fn, last){
					var event=this.create();
					event.one(key, fn, last);
				},

				remove:function(key, fn){
					var event=this.create();
					event.remove(key, fn);
				},

				listen:function(key, fn, last){
					var event=this.create();
					event.listen(key, fn, last)
				},

				trigger:function(){
					var event=this.create();
					event.trigger.apply(this, arguments)
				}
			};

	}();

	return Events;
})();


// command 命令模式
var setCommand=function(button, command){
	button.onclick=function(){
		command.execute();
	}
}


var MenuBar={
	refresh:function(){ console.log('刷新菜单');}
};

var SubMenu={
	add:function(){
		console.log('增加子菜单');
	},

	del:function(){
		console.log('删除子菜单');
	}
};

var RefreshMenuBarCommand=function(receiver){
	this.receiver=receiver;
};

RefreshMenuBarCommand.prototype.execute=function(){
	this.receiver.refresh();
}

var AddSubMenuCommand=function(receiver){
	this.receiver=receiver;
};

AddSubMenuCommand.prototype.execute=function(){
	this.receiver.add();
};

var DelSubMenuCommand=function(receiver){
	this.receiver=receiver;
}
DelSubMenuCommand.prototype.execute=function(){
	this.receiver.del()
};

var refreshMenuBarCommand=new RefreshMenuBarCommand(MenuBar);
var addSubMenuCommand = new AddSubMenuCommand(subMenu);
var delSubMenuCommand = new DelSubMenuCommand(subMenu);

var button1=document.getElementById('button1');
var button2=document.getElementById('button2');
var button3=document.getElementById('button3');

setCommand(button1, refreshMenuBarCommand);
setCommand(button2, addSubMenuCommand);
setCommand(button3, delSubMenuCommand);


//JavaScript 命令模式

var setCommands=function(button, func){
	button.onclick=function(){
		func();
	}
};

var Menubar={
	refresh:function(){
		console.log('reload page');
	}
};

var RefreshmenuBarCommand=function(receiver){
	return function(){
		receiver.refresh();
	}
};

var refreshmenuBarCommand=RefreshmenuBarCommand(Menubar);
setCommands(button1, refreshmenuBarCommand);

var RefreshmenuBar=function(receiver){
	return {
		execute:function(){
			receiver.refresh();
		}
	}
};
var setcommand=function(button, command){
	button.onclick=function(){
		command.execute();
	}
}

var ball=document.getElementById('ball');
var pos=document.getElementById('pos');
var moveBtn=document.getElementById('moveBtn');

moveBtn.onclick=function(){
	var animate=new Animate(ball);
	animate.start('left', pos.value, 1000, 'strongEaseOut');
};

var MoveCommand=function(receiver, pos){
	this.receiver=receiver;
	this.pos=pos;
	this.oldPos=null;
};

MoveCommand.prototype.execute=function(){
	this.receiver.start('left', this.pos, 1000, 'strongEaseOut');
	this.oldPos=this.receiver.getBoundingClientRect()[this.receiver.propertyName];
}

MoveCommand.prototype.undo=function(){
	this.receiver.start('left', this.oldPos, 1000, 'StrongEaseOut')
}

var moveCommand;

moveBtn.onclick=function(){
	var animate=new Animate(ball);
	moveCommand=new MoveCommand(animate, pos.value);
	moveCommand.execute();
}

var Ryu={
	attack:function(){
		console.log('攻击');
	},

	defense:function(){
		console.log('防御');
	},

	jump:function(){
		console.log('跳跃');
	},

	crouch:function(){
		console.log('蹲下');
	}
};

var makeCommand=function(receiver, state){
	return function(){ receiver[state](); }
};

var commands={
	"119":"jump",      //W
	"115":"crouch",   //S
	"97" :"defense", //A
	"100":"attack"  // D
};

var commandStack=[];

document.onkeypress=function(ev){
	var keyCode=ev.keyCode;
	var command=makeCommand(Ryu, commands[keyCode]);

	if(command){
		command();
		commandStack.push(command);
	}
}

document.getElementById('replay').onclick=function(){
	var command;
	while(command=commandStack.shift()){
		command();
	}
};


var closeDoorCommand={
	execute:function(){
		console.log('关门');
	}
}

var openComputerCommand={
	execute:function(){
		console.log('打开电脑');
	}
};

var openQQCommand={
	execute:function(){
		console.log('打开QQ');
	}
}

var MacroCommand=function(){
	return {
		commandList:[],
		add:function(command){
			this.commandList.push(command)
		},
		execute:function(){
			for(var i=0, command; command=this.commandList[i++];) command.execute();
		}
	}
};

var macroCommand=MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openComputerCommand);
macroCommand.add(openQQCommand);
macroCommand.execute();

var MacroCommands=function(){
	return {
		commandsList:[],

		add:function(command){
			this.commandsList.push(command);
		},

		execute:function(){
			for(var i=0, command; command=this.commandsList[i++];) {
				command.execute();
			}
		}
	}
};

var openAcCommand={
	execute:function(){
		console.log('打开空调');
	}
};

var openTvCommand={
	execute:function(){
		console.log('打开电视');
	}
};

var openSoundCommand={
	execute:function(){
		console.log('打开音响');
	}
};

var marcoCommand1=MacroCommands();
marcoCommand1.add(openTvCommand);
marcoCommand1.add(openSoundCommand);

var marcoCommand2=MacroCommands();
marcoCommand2.add(closeDoorCommand);
marcoCommand2.add(openComputerCommand);
marcoCommand2.add(openQQCommand);

var marcoCommands=MacroCommands();
marcoCommands.add(openAcCommand);
marcoCommands.add(marcoCommand1);
marcoCommands.add(marcoCommand2);

var setCommand=(function(command){
	document.getElementById('botton').onclick=function(){
		command.execute();
	}
})(marcoCommands)