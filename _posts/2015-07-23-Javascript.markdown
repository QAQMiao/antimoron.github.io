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
	
--End.
