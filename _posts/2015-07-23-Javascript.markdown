---
layout: post
title:  "javascript高级程序设计 第三版"
date:   2015-07-23 09:12:16
categories: javascript
---

这本书的第一章目的为了展示javascript的历史。

- 基础知识：

	1. 文档对象类型 --> DOM --> Document Object Model：<br>
是针对XML但经过拓展用于HTML的应用程序的编程接口。DOM把整个页面映射为
一个多层节点结构。HTML或者[XML](http://www.w3school.com.cn/xml/index.asp)
页面中的每个组成部分都是某种类型的节点，这些节点又包含着不同类型的数据。
	2. DOM级别：

		- DOM1级由两个模块组成：DOM核心和DOM HTML

			- DOM核心规定的是如何映射基于XML的文档结构，
以便简化对文档中任意部分的访问和操作。**它的重点是如何映射XML的这种树状层级的标签文档结构**
			- DOM HTML则是一种基于DOM核心的拓展，添加了针对HTML的对象和方法。
			- P.S. DOM类似一种规则，是由语言来实现的，DOM并不是只针对javascript，很多别的
语言也实现了DOM。只是底层的实现方式不一样，外部表现是一样的。基于ECMAScript实现的DOM已经成为Javascript的重要部分。

		- 如果说DOM1级的目标主要是映射文档的结构，那么DOM2级的目标要宽泛一些。DOM2在DOM的基础上
扩充了[鼠标和用户界面事件](http://www.w3school.com.cn/jsref/met_button_click.asp)、范围、遍历（迭代DOM
文档的方法）等细分模块，而且通过对象接口增加了对CSS的支持。DOM1级中的DOM核心模块也经过拓展开始支持
[XML命名空间](http://www.w3school.com.cn/xml/xml_namespaces.asp)。
		- DOM2级引入了下列新的模块：
			- DOM视图：定义了跟踪不同文档的视图接口
			- DOM事件：定义了时间和事件处理的接口
			- DOM样式：定义了基于CSS为元素应用样式的接口
			- DOM遍历和范围：定义了遍历和操作文档树的接口
		- DOM3级则进一步扩充了DOM，新增并引入了
			- 统一方式加载   在DOM加载和保存模块中定义
			- 保存文档方法	 在DOM加载和保存模块中定义
			- 验证文档方法   在DOM验证模块定义
			- 支持XML1.0规范，涉及[XML Infoset](http://www.w3china.org/translation/infoset_20011024_cn.htm)、
[XPath](http://www.w3school.com.cn/xpath/)和[XMLBase](http://www.w3china.org/translation/xmlbase20010627_cn.htm).
		- 可能看到DOM0级的字眼，其实DOM0是不存在的，只是历史中的一个参照点。具体为IE 4.0和Netscape Navigator 4.0最初支持的DHTM
L.
	3. 其他DOM标准
		- 除了DOM核心和DOM HTML接口之外另外几种语言还发布了自己的DOM标准。
			- SVG 1.0  可伸缩矢量图 通常用作网站图标
			- MathML 1.0	数学标记语言
			- SMIL	同步多媒体集成语言
		- 还有一些语言也开发了自己的DOM实现，例如Mozilla的XUL（XML用户界面语言-->XML + UI）。但是只有上面列出的几种才是W3C的
推荐标准。
	4. Web浏览器对DOM的支持
		
		| 浏览器 | DOM兼容性 |
		| ------ | ----- |
		| IE5.5~IE8 | 1级（几乎全部）|
		| IE9+ | 1、2、3级 |
		| Opera 1~6 | 不支持 |
		| Opera 7~8.x | 1级（几乎全部），2级部分 |
		| Opera 9~9.9 | 1级、2级（几乎全部），3级部分 |
		| Opera 10+ | 1、2级，3级（部分） |
		| Safari 1.0.x | 1级 |
		| Safari 2+ | 1级、2级（部分） |
		| Chrome 1+ | 1级、2级（部分） |
		| Firefox 1+ | 1级、2级（几乎全部）、3级（部分） | 

	5.BOM 浏览器对象模型
		- BOM没有标准可循，都是各自浏览器做的自己的拓展和实现。
	6.在HTML中使用javascript
		- 带有src属性的&lt;script&gt;元素不应该在其&lt;script&gt;和&lt;/script&gt;标签之间再包含额外的js代码，
如果包含了嵌入的代码，则只会下载并执行src所指脚本文件，嵌入的代码会被忽略。
		- script元素的src要格外小心，如果自己的网站域名叫www.my.com，引入了如下的js

{% highlight html %}
	<script src="badguy.com/badjs.js"></script>
{% endhighlight %}


- 
	- 
		- 则可能badguy.com域名的所有者恶意修改代码导致安全隐患，因此通常用自己域名下的外部脚本
或者使用被信任的域名所有者的域名下的文件。
		- 按照惯例，所有的script元素都在head元素中，这种会导致网页打开前要等待所有的脚本加载
完成才行，为了提升加载速度，现在的程序员通常把script标签放在body标签中。如：

{% highlight html %}
<html>
	<head>
		<title>Example</title>
	</head>
	<body>
		<script src="example1.js"></script>
		<script src="example2.js"></script>
	</body>
</html>
{% endhighlight %}



- 
	- 
		- 这样在解析包含js代码之前页面的内容将会完全呈现在浏览器中，用户也会因为浏览器窗口显示空
白页面的时间缩短而觉得网页变快了。
		- 延迟脚本defer
			- 通过设定script元素的defer属性defer="defer"来使脚本延迟到整个页面都解析完毕再
运行。因此在script元素中设置defer属性相当于告诉浏览器立即下载，但延迟执行。

{% highlight html %}
<html>
	<head>
		<script defer="defer" src="example.js"></script>
	</head>
</html>
{% endhighlight %}


- 
	- 
		- 
			- ** HTML5规范要求脚本必须按照他们出现的先后顺序执行，支持H5的浏览器会忽略这个属性 **
因此第一个延迟脚本会先于第二个延迟脚本执行，而这两个脚本会先于DOMContentLoaded事件（[DOM内容加载事件]以后介
绍）执行。而实际上，延迟脚本并不一定会按照顺序执行，也不一定会再DOMContentLoaded时间触发前执行，因此最好
只包含一个延迟脚本。
		- 异步脚本
			- 与defer类似，async只适用于外部脚本文件，并告诉浏览器立即下载文件。但与defer不同
，标记了async属性的script元素并部保证按照它们的先后顺序执行。

{% highlight html %}
<html>
<head>
	<script async="async" src="js1.js"></script>
	<script async="async" src="js2.js"></script>
</head>
<body></body>
</html>
{% endhighlight %}




		- 因为第二个脚本可能在第一个脚本文件之前执行，因此确保两者之间互不依赖非常重要。指定async
属性的目的是不让页面等待两个脚本下载和执行，从而异步加载页面其他内容。为此建议异步脚本不要再加载期间修改DOM。
		



# 基本概念
- 任何语言的核心都必然会描述这门语言最基本的工作原理。
	1. 语法（syntax）：ECMAScript 的语法大量借鉴了C及其他C-like语言的语法。因此熟悉这些语言的开发人员在接受
ECMAScript更加宽松的语法时，一定会有一种轻松自在的感觉。
		* 区分大小写：一切变量名、函数名、操作符都区分大小写。变量test和变量Test为两个不同的
变量，而函数名不能用typeof，以为他是一个关键字，但typeOf完全可以是一个有效的函数名
		* 标示符（identifer）：是指变量、函数、属性的名字，或者函数的参数。标示符可以是：
			- 第一个字符必须是一个字母、下划线(_)或者一个美元符号($)
			- 其他字母可以是字母下划线数字。
			- ** ECMAScript推荐小驼峰命名法:firstBlood,myBaby **
		* 注释：采用C风格注释，//及/*  */.
		* [严格模式](http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html)：严格模式是JavaScript定义了一种不同的解析与执行模型。在严格模式下，ECMAscript3
中一些不确定的行为将得到处理，而且对某些不安全的操作也会抛出错误。要在整个脚本中启用严格模式，可以在顶部添加
如下代码： 

{% highlight javascript %}
"use strict"
{% endhighlight %}
- 
	- 
		- 
			- 这代码看起来像是字符串，而且也没有赋值给任何变量，但其实他是一个编译指示（pragma），用于高速javaScript
引擎切换到严格模式。这是为了不破坏ECMAScript3语法而特意选定的语法。在函数内部的上方包含这条指示，也可
指定函数在严格模式下执行：

{% highlight javascript %}
function doSomething() {
	"use strict";
	//...
}
{% endhighlight %}
- 
	- 
		- 
			- 严格模式下，javaScript的执行结果会有很大的不同。后文将随时指出严格模式下的区别。
			- ** 我建议多use strict **
- 
	- 
		* 1.5 语句
			- 语句以分号结尾，如果省略分好，由浏览器对于语言的执行器（解析器）确定语句结尾（通常换行符）
虽然分好不是必须的，但是建议任何时候都不要省略。加上分号可以避免很多错误（如不完整的输入），开发人员也可以
放心地通过删除多余的空格来压缩js代码。加上分号也会在某些情况下增加代码的性能，因为这样解析器就不必再花时间推测应该
在哪里插入分号了。并且if,else语句当在仅有一行的时候也推荐用花括号括上。
		* 1.6 关键字和保留字

|关键字|含义|
|---|---|
|break|跳出循环|
|do|执行|
|instanceof|是否是类型的实例|
|typeof|获取变量的类型|
|case|情况|
|else|否则|
|new|新建|
|var|声明变量|
|catch|捕获异常|
|finally|最终处理异常|
|return|返回|
|void|空类型|
|continue|绕过剩余代码继续循环|
|for|for循环|
|switch|switch判定|
|while|while循环|
|debugger*|[debugger*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger)|
|function|函数|
|this|当前对象|
|with|[with](http://904353524-qq-com.iteye.com/blog/1556091)|
|default|默认情况|
|if|条件判断|
|throw|跑出异常|
|delete|删除对象|
|in|[in](http://blog.sina.com.cn/s/blog_855dfd9e0101a2w0.html)|
|try|圈定捕获异常的代码段|

**tips:JS先驱者都告诫过我们不要对数组对象使用for in语句进行遍历。在遍历数组时，尽量避免使用for in ，而是采用原生的for方法。在遍历对象时，而且对顺序要求不高，可以for in**

- 

	- 
		* js还描述了另外一组不能用作标示符的保留字。尽管这些保留字没有特定的用途，但是他们还有可能在
将来被用作关键字。下面是所有保留字：

|abstract|enum|int|short|
|boolean|export|interface|static|
|byte|extends|long|super|
|char|final|native|synchronized|
|class|float|package|throws|
|const|goto|private|transient|
|debugger|implements|proteceted|volatile|
|double|import|public| - |

- 
	- 
		* 
			* 第5版把在非严格模式下运行时的保留字缩减为这些：
				- class,enum,extends,super,const,export,import
			* 在严格模式下，第5版还对以下保留字施加限制：
				- implements,package,public,interface,private,static,let,protected,yield
		* 变量
			- js的变量是松散类型。就是可以用来保存任何类型的数据，每个变量仅仅是一个用于保存
值得占位符而已。定义变量时要使用var操作符。不建议写如下代码
{% highlight javascript %}
var message = "hi";
message = 100;//不建议修改变量的类型
{% endhighlight %}
- 
	- 
		*
			- 当省略var操作符直接对变量赋值时，则创建一个全局变量。可以写下面的代码
{% highlight javascript %}
function test(){
	message = "hi";//全局变量
}
test();
alert(message);//可以，因为调用过test之后存在了全局变量message，这种做法并不推荐，很容易扰乱作用域
{% endhighlight %}
- 
	- 
		* 
			- 严格模式下，不能定义名为ieeval或者arguments的变量，否则导致语法错误
		* 数据类型
			- 有5种简单数据类型（基本数据类型fundamental types)：Undefined、Null、Boolean、
Number和String。还有一种复杂数据类型-Object。本质上是由一组无顺序的Key-Value对组成的。
		* typeof 操作符
			- 对于一个值使用typeof操作符可能返回下列某个字符串：
				- "undefined" 如果这个值未定义
				- "boolean" 如果这个值是布尔值
				- "string" 如果这个值是字符串
				- ”number“ 如果这个值是数值
				- ”object“ 如果这个值是对象或者null
				- "function" 如果这个值是函数
{% highlight javascript lineno %}
var message = "";
alert(typeof message); // string
alert(typeof(message)); // string
alert(typeof 95);// number
{% endhighlight %}		

- 
	- 
		- 
			- typeof操作符的操作参数可以是变量，也可以是直接量（[literal](http://www.cnblogs.com/snandy/p/3439790.html)).从技术角度讲，函数（function）在JS中是对象，不是一个数据类型。然而函数也确实有一些特殊的属性，因此通过typeof操作符来区分函数和其他对象是有必要的。
		- Undefined 类型
			- Undefined类型的值只有一个就是undefined.(注意大小写都分别是啥)。在使用var声明变量但未初始化时这个变量的值就是undefined.
			- 在非严格模式下未申明的变量为undefined.严格模式下会报错。
		- 对于所有的值都最好显示地初始化```var a=123;```保证写下等号。这样的话在复杂的工程代码中使用typeof如果为undefined那么这个值只可能是未定义，方便调试。
		- Null类型
			- Null类型只有一个值，是null。typeof null会返回"object".
			- 如果定义的变量准备在将来用于保存对象则应初始化为null而不是其他的值。```null == undefined```为true。```null === undefined```为false。说明undefined值是派生自null的。
		- Boolean类型
			- 只有true和false两个值。与数字不同，true不一定为1，false不一定为0.
			- 可以用```Boolean(xxx)```来将变量转化为Boolean类型，结果如下表。
|数据类型|转换为true的值|转换为false的值|
|---|---|---|
|Boolean|true|false|
|String|任何非空字符串|空字符串""|
|Number|任何非零数字包括无穷大|0或NaN|
|Object|任何对象|null|
|Undefined|n/a(不适用)|undefined|

		







	
--End.	
