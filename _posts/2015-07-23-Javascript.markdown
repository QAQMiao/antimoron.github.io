---
layout: post
title:  "javascript高级程序设计 第三版"
date:   2015-07-23 09:12:16
categories: javascript
---

这本书的第一张目的为了展示javascript的历史。

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

		这样在解析包含js代码之前页面的内容将会完全呈现在浏览器中，用户也会因为浏览器窗口显示空
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

--End.
