---
layout: post
title:  "Introduction to Maven"
date:   2015-07-21 09:12:16
categories: technology
---

## Introduction

- Maven is a project management tool.It includes a project object model,
a set of standards,a project life cycle,a dependency management system,
and logics to run and define plugin goal at life cycle phase.
- Maven is oriented to developtment of java.It offers 
the superset that build tools required.As well as build function,
Maven can manage project structure and dependency,generate reports and
web site,and is good for team members communicate and work with each other.
- Maven2 archieved the rewriting of Maven1.The rewriting is
to provide projects that provide powerful building and include
API,which allows Maven be implanted anywhere,especially high-level
product such as IDEs,quality tools,report tools and so on.
Formalization of concepts of Maven2 building life cycle makes
it easier to be expanded than Maven.
- Maven3 have large improvement from Maven 2.x in efficiency.
It can specify parent version automatically,generate paralelly,
better integrity reports,muti-language generation,better support to 
M2Eclipse.
- We ought to use Maven3.

## Install Maven

1. Download latest Maven, and unzip to the working directory.
2. Set envioronment variables,such as ```M2_HOME=F:\Maven\```
3. Apend ```%M2_HOME%/bin/``` to PATH.
4. Test Maven, execute ```mvn -version``` to know whether the insatllation is
completed.

## Install Eclipse M2 plugin

1.Download the latest version eclipse.(Java EE)
2.Install svn plugin. http://subeclipse.tigris.org/update_1.s6.x
3.Install GEF plugin.
4.Install m2eclipse plugin.
5.Install m2e-extras.

Maven SCM handler for Subeclipse: This Plagin can help us sign out Maven projects
from Subversion directly.

Maven SCM Integration: Maven and SCM integrate core module in eclipse.

Maven Issue tracking configurator for Mylyn: Help us use information from 
issue tracking system in POM to connect to Mylyn servers.

Maven Integration for WTP: WTP is web tool platform for eclipse.It
can edit JSP,HTML,Javascript,CSS... This module can force eclipse
get information from POM and configure WTP projects.

Project Configurators for commonly used maven plugins: A temporary
component, to support some Maven plugins and Eclipse integrations.

[optional]
Maven SCM handler for Team/CVS: it can help us sign out Maven projects
from CVS servers.

M2eclipse Extensions Development Support: to support expention of
m2eclipse.


## Maven file structure

- bin
	- includes run script, scripts that configure java commands.
m2.conf for default repository.
- boot
	- only one file,java class loader.
- conf
	- includes a very important file:```settings.xml```
- lib
	- Maven needs java class library for runtime.
Maven super POM file is located at ```maven-model-builder-x.x.x.jar```

### About settings.xml

**$user.home/.m2/repository/settings.xml**
configurations for user.

**$M2_HOME/conf/settings.xml**
configurations for global, modification would influence all users on the machine.
Suggestions: only modify configurations for user.Neither has effect on
other users,nor on later updating.

Introduction to configurations.
localREpository: customized local library path.$user.home/.m2 by default.
interactiveMode:
offline: whether search the remote centre library when compile.
pluginGroups: plugin group,such as org.mortbay.jetty.
proxies: visit external libraries via proxies.
servers: integraet configuration services,such as Tomcat.
mirrors: mirror libraries, need to be actived in Activation div.
profiles: customized configurations,need to be actived in Activation div.
activeProfiles: actived profile.

## Why Maven?
- Guidance Developing
	- Offers the best development practice.
- Auto compile
	- Not only like Ant, it includes tests, packaging , publishing,doc generating,
program website generating...
- Dependency Management
	- Maven can manage dependencies easily.Such as 3rd dependencies,
Model dependencies.
- Infinite expantions
	- plugin system can enhance Maven.such as Tomcat,Jetty	
- Continuous integration
	- encourage developers commit their codes, find bugs and errors in programs,
and push forward steadly in developing.
- Teamwork
	- easier teamwork

## Maven life cycle

- Three life cycles.
	1. Clean
		- pre-clean: some necessary jobs for cleaning.
		- clean: clean the files that last build generates.
		- post-clean: executes tasks when clean phase is done.
	2. Default
		- validate: check wheter project is right and all necessary informations are valid.
		- initialize: to initialize build status.
		- generate-sources:generate all codes for compiling.
		- process-sources:deal with source codes.
		- generate-resources: generate resources from packages.
		- process-resources: copy and process resources to target directory.Get prepared for packaging..
		- compile:compile main source codes.
		- process-classes: process the class files after compiling.
		- generate-test-sources: generate all the test codes.
		- process-test-sources: process test sources.
		- generate-test-resources.
		- process-test-resources.
		- compile:compile test codes.
		- process-test-class.
		- test
		- prepare-package
		- package
		- pre-integration-test
		- integration-test
		- post-integration-test
		- verify
		- install
		- deploy
	3. Site
		- pre-site
		- site: generate documents for site.
		- post-site
		- site-deploy
- Phases in one life cycle depends forward and backward.




--End.
