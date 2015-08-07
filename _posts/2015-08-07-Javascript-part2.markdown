---
layout: post
title:  "javascript高级程序设计 第三版 第二部分"
date:   2015-08-07 09:12:16
categories: javascript
---

# 函数

通过函数可以封装任意多条语句，而且可以在任何地方、任何时候调用执行。
函数的基本语法如下：

{% highlight javascript %}
function funName(arg0,arg1,...argN){
   statements
}
{% endhighlight %}

return语句可以不带有任何返回值。这种情况下函数在执行完毕后将返回undefined值。
推荐的做法是要么让函数始终都返回一个值，要么永远都不要返回值。否则，如果函数
有时候返回值有时候不反回值，会给调试代码带来不便。

严格模式对函数有一些限制：

- 不能把函数命名为eval或者arguments.
- 不能把参数命名为eval或arguments.
- 不能出现两个命名参数同名的情况

如果发生以上情况会发生语法错误，无法执行。

## 理解参数

ECMAScript参数与其他语言不同。ECMAScript不介意传递进来多少个参数，也不在乎传进来参数
是什么数据类型。也就是说，即便你定义的函数只接受两个参数。在调用这个函数的时候也未必要
传递2个参数。之所以这样是因为```ECMAScript中的参数在内部是用一个数组来表示的```。函数接受
的始终是这个数组，而不关心包含哪些参数。

其实arguments对象只是与数组类似（并不是Array的实例），但是可以使用方括号的语法来访问它的每一个
元素，使用length属性确定传递进来多少个参数。在前面的例子中，sayHi的第一个参数的名字叫name，而
该参数的值也可以通过访问arguments[0]来获取。因此拼接字符串的函数也可以像下面这样重写。

{% highlight javascript %}
function myconcat(){
	var ret = "";
	for(var i=0;i<arguments.length;i++)
		ret+=arguments[i];
	return ret;
}
alert(myconcat("1","a","2","b"));
{% endhighlight %}

这个例子中还使用到了arguments.length，它表示传递进来了多少个参数。这个例子可以传递任意多个
字符串并把它们连接在一起。

同时arguments的对应位置的元素永远与对应的形参一致。
- 严格模式对arguments有一定限制，不可以通过arguments对其进行值得修改，其次重写arguments的值会导致
语法错误。

-- End.
