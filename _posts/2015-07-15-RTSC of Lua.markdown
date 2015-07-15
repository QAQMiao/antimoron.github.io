--- 
layout: post 
title:  "Read the source code of the Lua Language." 
date:   2015-07-15 21:06:00 
categories: technology 
--- 

##Compile the code first
  I built a codeblocks empty project on windows 7.Added the src files in.
And pressed F9 button to try to compile the source codes.But failed.
For the first time the compiler tells ```unable to find the header file`luaconf.h` ```
After looked into the directory of folder ```src```,I found that there is two file naming
```luaconf.h.in``` and ```luaconf.h.orig```.I guessed that ```luaconf.h.in``` is for 
cmake configuration because of indicator like ```cmakedefine ``` in the file.And orig may
be short for ```original```.So I remove the ```.orig``` extension name from it.
  Now compile again,another error occurred.The compiler tells ```redefinition of 'main' and 'luaopen_package'```.
  After recheck the files. These two function is defined in ```luac.c | lua.c``` and ```loadlib.c | loadlib_rel.c```.
  I removed the older files.Finally it compiles.
![result]({{site.url}}/assets/lua-source-code/luaFromCompileMingw.png)
