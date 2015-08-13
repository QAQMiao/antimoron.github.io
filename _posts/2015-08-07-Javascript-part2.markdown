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

## 没有重载

ECMASript函数不能像传统意义上那样实现重载。如果再ECMAScript中定义了两个名字相同的函数，则名字只属于
后定义的函数
{% highlight javascript %}
function addSomeNumber(num) {
  return num + 100;
}
function addSomeNumber(num) {
  return num + 200;
}
alert(addSomeNumber(100)); //300
{% endhighlight %}

通常通过检查传入函数中参数的类型和数量做出不同的反应可以模仿方法的重载。

# 变量、作用于、和存储空间的问题

## 基本类型和引用类型的值

ECMAScript变量可能包含两种不同数据类型的值：基本类型值和引用类型值。基本类型值指的是简单的数据段，而
引用类型值指那些可能由多个值构成的对象。

在将一个值赋值给变量时，解析器必须确定这个值是基本类型值还是引用类型值。基本数据类型：

- Undefined
- Null
- Boolean
- Number
- String

这5种基本数据类型是按值访问的。因为可以保存在变量中的实际的值。

引用类型的值是保存在内存中的对象，js不允许直接访问内存中的位置。也就是说不能直接操作对象的内存空间，
在操作对象时，实际上是在操作对象的引用而不是实际的对象。引用类型因此是按照引用访问的。(function和object)

## 动态属性

定义基本类型和引用类型值的方式是类似:创建一个变量并为该变量赋值。但是，当这个值保存到变量之中
后，对不同类型值可以执行的操作则大相径庭。对于引用类型的值，我们可以为其添加属性和方法，也可以改变和删除其属性和方法

{% highlight javascript %}
var person = new Object();
person.name = "hh";
alert(person.name); //直接创建了域name。并保存了值
{% endhighlight %}

以上代码创建了一个对象并将其保存在了变量person中。然后我们为该对象添加了一个名为name的属性，
并将字符串值赋值给了这个属性。但是我们不能给基本类型的值添加属性，尽管不会导致错误。

{% highlight javascript %}
var name = "xxx";
name.age = 27;
alert(name.age); //undefined.
{% endhighlight %}

### 复制变量值

除了保存的方式不同之外，在从一个变量向另一个变量复制基本类型值和引用类型值时，也存在不同。
如果从一个变量向另一个变量赋值基本类型的值，会在变量对象上创建一个新值，然后把该值复制到为
新变量分配的位置上。

{% highlight javascript %}
var num1 = 5;
var num2 = num1;
{% endhighlight %}

当从一个变量向另一个变量复制引用类型的值时，同样也会将存储在变量对象中的值赋值一份放到为新变量
分配的空间中。不同的是，这个值得副本其实是一个指针。（指针所指地址是一个值，这个指针的赋值
是值复制，但是表现得结果却是一个引用传递。）

{% highlight javascript %}
var obj1=new Object();
var obj2=obj1;
obj1.name="hh";
alert(obj2.name); //"hh"
{% endhighlight %}

### 传递参数
ECMAScript中所有函数的参数都是按照值传递的，把函数外部的值复制给函数内部的参数，就喝把值
从一个变量复制到另一个变量一样。基本类型值得传递如同基本类型变量的复制一样，而引用类型值
得传递，则如同引用类型变量的复制一样。基本类型的传递如同基本类型变量的复制一样，而引用类型
值得传递，则如同引用复制一样。
（形参的传递与赋值所选用的方式一直）

{% highlight javascript %}
function addTen(num){
   num += 10;
   return num;
}
var count = 20;
var result = addTen(count);
alert(count);//20 不是引用，count的值没有变化
alert(result);//30
{% endhighlight %}

上面的类型是值传递。

{% highlight javascript %}
function setName(obj){
  obj.name="haha";
}
var person = new Object();
setName(person);
alert(person.name); //"haha"
{% endhighlight %}

上面的类型是引用传递。



-- End.
