--- 
layout: post 
title:  "Some Common Questions" 
date:   2015-07-16 23:53:00 
categories: technology 
--- 

## 什么时候用Inline

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

## 什么时候用explicit

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

## reference count的垃圾回收机制的缺陷？

An advantage of this scheme is that it can run in small chunks of time closely interwoven with the execution of the program. This characteristic makes it particularly suitable for real-time environments where the program can't be interrupted for very long. A disadvantage of reference counting is that it does not detect cycles. A cycle is two or more objects that refer to one another, for example, a parent object that has a reference to its child object, which has a reference back to its parent. These objects will never have a reference count of zero even though they may be unreachable by the roots of the executing program. Another disadvantage is the overhead of incrementing and decrementing the reference count each time. Because of these disadvantages, reference counting currently is out of favor

## gc root 的大致工作原理？

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

## 常识：什么是reference collapse

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
{% highlight c++ linenos%}
A& & becomes A&
A& && becomes A&
A&& & becomes A&
A&& && becomes A&&
{% endhighlight %}

这个规则是正确的，但是不够完整。 参考Item28 : <a href="http://www.aristeia.com/BookErrata/emc++-errata.html">emc++-errata</a>

## 为什么传递Parameter pack的时候需要用rvalue的形式

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

 
## Perfect Forwarding是什么


参考文章 <a href="http://thbecker.net/articles/rvalue_references/section_08.html">http://thbecker.net/articles/rvalue_references/section_08.html</a>


The first of the remaining two rules for rvalue references affects old-style lvalue references as well. Recall that in pre-11 C++, it was not allowed to take a reference to a reference: something like A& & would cause a compile error. C++11, by contrast, introduces the following reference collapsing rules1:

{% highlight c++ linenos%}
A& & becomes A&
A& && becomes A&
A&& & becomes A&
A&& && becomes A&&
{% endhighlight %}

Secondly, there is a special template argument deduction rule for function templates that take an argument by rvalue reference to a template argument:
{% highlight c++ %}
template<typename T>
void foo(T&&);
{% endhighlight %}
Here, the following apply:
When foo is called on an lvalue of type A, then T resolves to A& and hence, by the reference collapsing rules above, the argument type effectively becomes A&.
When foo is called on an rvalue of type A, then T resolves to A, and hence the argument type becomes A&&.
Given these rules, we can now use rvalue references to solve the perfect forwarding problem as set forth in the previous section. Here's what the solution looks like:
{% highlight c++ %}
template<typename T, typename Arg> 
shared_ptr<T> factory(Arg&& arg)
{ 
  return shared_ptr<T>(new T(std::forward<Arg>(arg)));
} 
{% endhighlight %}
where ```std::forward``` is defined as follows:
{% highlight c++ %}
template<class S>
S&& forward(typename remove_reference<S>::type& a) noexcept
{
  return static_cast<S&&>(a);
} 
//(Don't pay attention to the noexcept keyword for now. It lets the compiler know, for certain optimization purposes, that this function will never throw an exception. We'll come back to it in Section 9.) To see how the code above achieves perfect forwarding, we will discuss separately what happens when our factory function gets called on lvalues and rvalues. Let A and X be types. Suppose first that factory<A> is called on an lvalue of type X:
X x;
factory<A>(x);
{% endhighlight %}

Then, by the special template deduction rule stated above, factory's template argument Arg resolves to X&. Therefore, the compiler will create the following instantiations of factory and std::forward:
{% highlight c++ %}
shared_ptr<A> factory(X& && arg)
{ 
  return shared_ptr<A>(new A(std::forward<X&>(arg)));
} 

X& && forward(remove_reference<X&>::type& a) noexcept
{
  return static_cast<X& &&>(a);
} 
{% endhighlight %}
After evaluating the remove_reference and applying the reference collapsing rules, this becomes:
{% highlight c++ %}
shared_ptr<A> factory(X& arg)
{ 
  return shared_ptr<A>(new A(std::forward<X&>(arg)));
} 

X& std::forward(X& a) 
{
  return static_cast<X&>(a);
} 
{% endhighlight %}
This is certainly perfect forwarding for lvalues: the argument arg of the factory function gets passed on to A's constructor through two levels of indirection, both by old-fashioned lvalue reference.
Next, suppose that factory<A> is called on an rvalue of type X:

{% highlight c++ %}
X foo();
factory<A>(foo());
{% endhighlight %}
Then, again by the special template deduction rule stated above, factory's template argument Arg resolves to X. Therefore, the compiler will now create the following function template instantiations:
{% highlight c++ %}
shared_ptr<A> factory(X&& arg)
{ 
  return shared_ptr<A>(new A(std::forward<X>(arg)));
} 

X&& forward(X& a) noexcept
{
  return static_cast<X&&>(a);
} 
{% endhighlight %}
This is indeed perfect forwarding for rvalues: the argument of the factory function gets passed on to A's constructor through two levels of indirection, both by reference. Moreover, A's constructor sees as its argument an expression that is declared as an rvalue reference and does not have a name. By the no-name rule, such a thing is an rvalue. Therefore, A's constructor gets called on an rvalue. This means that the forwarding preserves any move semantics that would have taken place if the factory wrapper were not present.
It is perhaps worth noting that the preservation of move semantics is in fact the only purpose of ```std::forward``` in this context. Without the use of ```std::forward```, everything would work quite nicely, except that A's constructor would always see as its argument something that has a name, and such a thing is an lvalue. Another way of putting this is to say that ```std::forward```'s purpose is to forward the information whether at the call site, the wrapper saw an lvalue or an rvalue.

If you want to dig a little deeper for extra credit, ask yourself this question: why is the remove_reference in the definition of ```std::forward``` needed? The answer is, it is not really needed at all. If you use just ```S&``` instead of ```remove_reference<S>::type&``` in the defintion of ```std::forward```, you can repeat the case distinction above to convince yourself that perfect forwarding still works just fine. However, it works fine only as long as we explicitly specify Arg as the template argument of ```std::forward```. The purpose of the ```remove_reference``` in the definition of ```std::forward``` is to force us to do so.

Rejoice. We're almost done. It only remains to look at the implementation of std::move. Remember, the purpose of std::move is to pass its argument right through by reference and make it bind like an rvalue. Here's the implementation:

{% highlight c++ %}
template<class T> 
typename remove_reference<T>::type&&
std::move(T&& a) noexcept
{
  typedef typename remove_reference<T>::type&& RvalRef;
  return static_cast<RvalRef>(a);
} 
{% endhighlight %}
Suppose that we call std::move on an lvalue of type X:
{% highlight c++ %}
X x;
std::move(x);
{% endhighlight %}
By the new special template deduction rule, the template argument T will resolve to X&. Therefore, what the compiler ends up instantiating is
{% highlight c++ %}
typename remove_reference<X&>::type&&
std::move(X& && a) noexcept
{
  typedef typename remove_reference<X&>::type&& RvalRef;
  return static_cast<RvalRef>(a);
} 
{% endhighlight %}
After evaluating the remove_reference and applying the new reference collapsing rules, this becomes
{% highlight c++ %}
X&& std::move(X& a) noexcept
{
  return static_cast<X&&>(a);
} 
{% endhighlight %}
That does the job: our lvalue x will bind to the lvalue reference that is the argument type, and the function passes it right through, turning it into an unnamed rvalue reference.
I leave it to you to convince yourself that std::move actually works fine when called on an rvalue. But then you may want to skip that: why would anybody want to call std::move on an rvalue, when its only purpose is to turn things into rvalues? Also, you have probably noticed by now that instead of

{% highlight c++ %}
std::move(x);
{% endhighlight %}
you could just as well write
{% highlight c++ %}
static_cast<X&&>(x);
{% endhighlight %}
However, std::move is strongly preferred because it is more expressive.

## 什么时候用std::move什么时候用std::forward
<a href="http://stackoverflow.com/questions/14486367/in-c11-why-use-stdmove-when-you-have">http://stackoverflow.com/questions/14486367/in-c11-why-use-stdmove-when-you-have</a>

<a href="http://stackoverflow.com/questions/7257144/when-to-use-stdforward-to-forward-arguments">http://stackoverflow.com/questions/7257144/when-to-use-stdforward-to-forward-arguments</a>

<a href="http://www.cprogramming.com/c++11/rvalue-references-and-move-semantics-in-c++11.html">http://www.cprogramming.com/c++11/rvalue-references-and-move-semantics-in-c++11.html</a>

You cannot forward something more than once, though, because that makes no sense. Forwarding means that you're potentially moving the argument all the way through to the final caller, and once it's moved it's gone, so you cannot then use it again.

## 什么时候用static_cast.
Only the following conversions can be done with static_cast, except when such conversions would cast away constness or volatility.

1. If a temporary object of type new_type can be declared and initialized with expression, as by new_type Temp(expression);, which may involve implicit conversions, a call to the constructor of new_type or a call to a user-defined conversion operator, then static_cast<type>(expression) computes and returns the value of that temporary object.
2. If new_type is a pointer or reference to some class D and the type of expression is a pointer or reference to its non-virtual base B, static_cast performs a downcast. Such static_cast makes no runtime checks to ensure that the object's runtime type is actually D, and may only be used safely if this precondition is guaranteed by other means, such as when implementing static polymorphism. Safe downcast may be done with dynamic_cast.
3. If new_type is an rvalue reference type, static_cast converts the value of expression to xvalue referring to the same object as the expression, or to its base sub-object (depending on new_type. If the target type is an inaccessible or ambiguous base of the type of the expression, the program is ill-formed. If the expression is a bit field lvalue, it is first converted to prvalue of the underlying type. This type of static_cast is used to implement move semantics in std::move. (since C++11)
4. If new_type is the type void (possibly cv-qualified), static_cast discards the value of expression after evaluating it.
5. If a standard conversion sequence from new_type to the type of expression exists, that does not include lvalue-to-rvalue, array-to-pointer, function-to-pointer, null pointer, null member pointer, or boolean conversion, then static_cast can perform the inverse of that implicit conversion.
6. If conversion of expression to new_type involves lvalue-to-rvalue, array-to-pointer, or function-to-pointer conversion, it can be performed explicitly by static_cast.
7. Scoped enumeration type can be converted to an integer or floating-point type. When the target type is cv bool, the result is false if the original value is zero and true for all other values. For the remaining integral types, the result is the value of the enum if it can be represented by the target type and unspecified otherwise. (since C++11)
8. Integer, floating-point, or enumeration type can be converted to any complete enumeration type. The result is unspecified (until C++17)undefined behavior (since C++17) if the value of expression, converted to the enumeration's underlying type, is out of range (if the underlying type is fixed, the range is the range of the type. If the underlying type is not fixed, the range is all values possible for the smallest bit field large enough to hold all enumerators of the target enumeration)
9. A pointer to member of some class D can be upcast to a pointer to member of its base class B. This static_cast makes no checks to ensure the member actually exists in the runtime type of the pointed-to object.
10. A prvalue of type pointer to void (possibly cv-qualified) can be converted to pointer to any type. If the value of the original pointer satisfies the alignment requirement of the target type, then the resulting pointer value is unchanged, otherwise it is unspecified. Conversion of any pointer to pointer to void and back to pointer to the original (or more cv-qualified) type preserves its original value.

As with all cast expressions, the result is:

- an lvalue if new_type is an lvalue reference type or an rvalue reference to function type;
- an xvalue if new_type is an rvalue reference to object type;
- a prvalue otherwise.

## 什么时候用reinterpret_cast

<a href="http://stackoverflow.com/questions/573294/when-to-use-reinterpret-cast">http://stackoverflow.com/questions/573294/when-to-use-reinterpret-cast</a>

The C++ standard guarantees the following:

static_casting a pointer to and from void* preserves the address. That is, in the following, a, b and c all point to the same address:
{% highlight c++ %}
int* a = new int();
void* b = static_cast<void*>(a);
int* c = static_cast<int*>(b);
{% endhighlight %}
reinterpret_cast only guarantees that if you cast a pointer to a different type, and then reinterpret_cast it back to the original type, you get the original value. So in the following:
{% highlight c++ %}
int* a = new int();
void* b = reinterpret_cast<void*>(a);
int* c = reinterpret_cast<int*>(b);
{% endhighlight %}
a and c contain the same value, but the value of b is unspecified. (in practice it will typically contain the same address as a and c, but that's not specified in the standard, and it may not be true on machines with more complex memory systems.)

For casting to and from void*, static_cast should be preferred.