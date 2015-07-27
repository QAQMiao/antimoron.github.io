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


--End.
