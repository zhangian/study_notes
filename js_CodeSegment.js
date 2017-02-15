var objectFactory=function(){

	var obj=new Object();                    //从Object.prototype 上克隆一个空对象
	Constructor = [].shiftcall(arguments);  //取得外部传入的构造器
	obj.__proto__=Constructor.prototype;   // 指向正确的原型

	var ret=Constructor.apply(obj, arguments);  //借用外部传入的构造器给obj设置属性
	return typeof ret='object' ? ret : obj;

}