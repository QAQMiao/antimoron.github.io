--- 
layout: post 
title:  "Some Common Questions" 
date:   2015-07-16 23:53:00 
categories: technology 
--- 

- 什么时候用Inline

摘自stackoverflow  
<a href="http://stackoverflow.com/questions/1759300/when-should-i-write-the-keyword-inline-for-a-function-method">origin site</a>

inline is more like static or extern than a directive telling the compiler to inline your functions.  extern, static, inline are linkage directives, used almost exclusively by the linker, not the compiler.


It is said that inline hints to the compiler that you think the function should be inlined. That may have been true in 1998, but a decade later the compiler needs no such hints. Not to mention humans are usually wrong when it comes to optimizing code, so most compilers flat out ignore the 'hint'.


static the variable/function name cannot be used in other compilation units. Linker needs to make sure it doesn't accidentally use a statically defined variable/function from another compilation unit.
extern use this variable/function name in this compilation unit but don't complain if it isn't defined. The linker will sort it out and make sure all the code that tried to use some extern symbol has its address.
inline this function will be defined in multiple compilation units, don't worry about it. The linker needs to make sure all compilation units use a single instance of the variable/function.
Note: Generally declaring templates inline is pointless, as they have the linkage semantics of inline already. However, explicit specialization and instantiation of templates require inline to be used.
So specific answers to your questions:

1. When should I write the keyword 'inline' for a function/method in C++?
	* Only when you want the function to be defined in a header. More exactly only when the function's definition can show up in multiple compilation units. It's a good idea to define small (as in one liner) functions in the header file as it gives the compiler more information to work with while optimizing your code. It also increases compilation time.
2. When should I not write the keyword 'inline' for a function/method in C++?
	* Don't add inline when you think your code will run faster if the compiler inlines it.
3. When will the the compiler not know when to make a function/method 'inline'?
	* Generally the compiler will be able to do this better than you. However, the compiler doesn't have the option to inline code if it doesn't have the function definition. In maximally optimized code usually all private methods are inlined whether you ask for it or not.
As an aside to prevent inlining in GCC use __attribute__(( noinline )) and in visual studio use __declspec(noinline).
Does it matter if an application is multithreaded when one writes 'inline' for a function/method?
Multithreading doesn't affect inlining in any way.

- 什么时候用explicit

大致：当有具体语义不希望隐式转换时候。
Many a times we wonder why this explicit keyword is used when ever we came across any c++ code. Here I would like to give a simple explanation of this keyword which can be more convincing to all.
Suppose you have a class String

{% highlight c++ %}	
class String {
public: 
String (int n);//allocate n bytes to the String object 
String(const char *p); // initializes object with char *p 
}
{% endhighlight %}

Now if you try

{% highlight c++ %}	
String mystring='x';
{% endhighlight %}
The char 'x' will be converted to int and will call String(int) constructor. But this is not what the user might have intended. So to prevent such conditions, we can define the class's constructor as explicit.
{% highlight c++ %}	
class String {
public: 
explicit String (int n); //allocate n bytes
String(const char *p); // initialize sobject with string p 
}
{% endhighlight %}

The explicit-keyword can be used to enforce a constructor to be called explicitly.

{% highlight c++ %}	
class C{
public:
    explicit C(void) = default;
};

int main(void){
    C c();
    return 0;
}
{% endhighlight %}

the explicit-keyword in front of the constructor C(void) tells the compiler that only explicit call to this constructor is allowed.

The explicit-keyword call also be used in user-defined type cast operators:

{% highlight c++ %}	
class C{
public:
    explicit inline operator bool(void) const{
        return true;
    }
};

int main(void){
    C c;
    bool b = static_cast<bool>(c);
    return 0;
}
{% endhighlight %}

Here, explicit-keyword enforces only explicit casts to be valid, so bool b = c; would be an invalid cast in this case. In situations like these explicit-keyword can help programmer to avoid implicit, unintended casts.

- reference count的垃圾回收机制的缺陷？

An advantage of this scheme is that it can run in small chunks of time closely interwoven with the execution of the program. This characteristic makes it particularly suitable for real-time environments where the program can't be interrupted for very long. A disadvantage of reference counting is that it does not detect cycles. A cycle is two or more objects that refer to one another, for example, a parent object that has a reference to its child object, which has a reference back to its parent. These objects will never have a reference count of zero even though they may be unreachable by the roots of the executing program. Another disadvantage is the overhead of incrementing and decrementing the reference count each time. Because of these disadvantages, reference counting currently is out of favor

- gc root 的大致工作原理？

建立一颗资源树，可以解决环问题。该gc 方式会有gc roots.如果从各个roots存在无法访问到的资源。当存在环引用的时候，整个一坨环都被当做垃圾回收掉。

A simple Java application has the following GC roots:

Local variables in the main method
The main thread
Static variables of the main class

![gcrooting]({{site.url}}/assets/common-faq/javagcroot1.png)

To determine which objects are no longer in use, the JVM intermittently runs what is very aptly called a mark-and-sweep algorithm. It works as follows

The algorithm traverses all object references, starting with the GC roots, and marks every object found as alive.
All of the heap memory that is not occupied by marked objects is reclaimed. It is simply marked as free, essentially swept free of unused objects.
So if any object is not reachable from the GC roots(even if it is self-referenced or cyclic-referenced) it will be subjected to garbage collection.

Ofcourse sometimes this may led to memory leak if programmer forgets to dereference an object.

![mark-and-sweep algorithm]({{site.url}}/assets/common-faq/markandsweep.png)

Source : Java Memory Management

- 常识：什么是reference collapse

In C++03, it was not legal to do the following
{% highlight c++ %}
typedef int &ref;
ref &r = ...; // reference to reference!
{% endhighlight %}
This frequently causes problems for people compiling with really strict or older C++03 compilers (GCC4.1 as well as Comeau 8/4/03 do not like the above) 
because the Standard function object binders do not take care of the "reference to reference" situation, and occasionally create such illegal types.

In C++0x this is called "reference collapsing", yes. Most current C++03 compilers do that (i.e a T& where T denotes a reference type is T again),
 by retroactively applying the rule. The boost.call_traits library makes it easy to declare such function parameters though, so that the "reference to reference" 
 situation does not occur.

Please note that the const there does not have any effect. A const applied on a reference type is silently ignored. 
So even if the compiler supports reference collapsing, the following is not legal
{% highlight c++ %}
int const x = 0;

// illegal: trying to bind "int&" to "int const"!
ref const& r = x; 
{% endhighlight %}

C++11, by contrast, introduces the following reference collapsing rules1:
A& & becomes A&
A& && becomes A&
A&& & becomes A&
A&& && becomes A&&

- 为什么传递Parameter pack的时候需要用rvalue的形式

{% highlight c++ %}
template<typename... Args>
void foo(Args&&... args)
{
	;//...
}
{% endhighlight %}
参考：<a href="http://stackoverflow.com/questions/13922145/prevent-array-decay-in-parameter-pack-expansion">origin site</a>

Edit: As to why you'd want to do this/why it works: an rvalue reference can bind to either an rvalue or an lvalue. 
The crucial point we care about here is that when it binds to an lvalue, it remains an lvalue. 
In the case of an array, it retains its identity as an array, so what's received is an array.

When/if we pass an array by value, it undergoes the normal "decay" to a pointer, just like with a normal function.

For this specific case, we could also use a normal lvalue reference -- but if we did, that would not work for any type that wasn't an lvalue.
 For example, if we tried to call ```foo(1,2,3);```, we'd get an error because an lvalue reference can't bind to 1, 2 or 3. 
 To deal with that we could pass a const lvalue reference, but then we wouldn't be binding the reference directly to the rvalue
 -- we'd be creating a temporary containing a copy of the rvalue that was passed, and then binding the lvalue reference to that temporary copy instead.
 For the specific case of an int, that probably wouldn't be a major problem, but with something that was more expensive to copy 
 (or if we wanted access to the original, not a copy) that could be a problem.