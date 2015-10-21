# logminer
An object oriented logger for more organised log tracking.

```js
var Log = require('logminer');

var log = new Log('Parent');
    log.message('hello');
    log.warn('world');
    log.info('in 2015');
    
var child = log.child('Child');
	child.error('exit')
```
With a *Dark Terminal* the above code becomes:
![logs in dark terminal](http://i.imgur.com/Rp1Hm9W.png)

With a *Light Terminal*:
![logs in white terminal](http://i.imgur.com/3V4AJvi.png)

## Features
- Unlimited Object Nesting
- Complete Silence Function
- Limited Silence Function
- Listen for Events (they come with id, time, stack traces etc) ready for integration into GUI's and external services

## Complex Hierarchy Example

![complex logs](http://i.imgur.com/Gdzw7PZ.png)

By This:
```js
var Log = require('logminer');

var log = new Log('Event');

log.message('initializing map');
log.message('loading kids from the database');

var child = log.child('Child');
    child.info('more kids are coming');
    child.warn('something smells');
    
var grandchild = child.child('GrandChild');
    grandchild.error('the poo is happening');
    grandchild.info('false alarm');

function phoneCall(){
    var child = log.function(arguments);
    child.message('incoming phone call ');
    child.message('transmission terminated');
}

function smsReceived(){
    var child = log.function(arguments);
    child.message('sms received from santa claus');
    child.message('sms stored');
}

phoneCall();
smsReceived();
messageReceived();
``` 

## Usage

#### Setup
```js
var Log = require('logminer');
```

#### **Initialize a Parent**
```js
var parent = new Log('Parent')
	parent.message('hello');
```
Will display:
```c
# ig0l4o2g Oct 21 15 5:16:00: Parent 
+ ig0l4o2g Oct 21 15 5:16:01:  at Parent: hello
```

#### **Initialize a Child**
This creates a child logger which inherits the `Parent` in every log produced with `childlog`.
```js
var child = parent.child('Child');
	child.message('hello');
```
Will display:
```c
# ig0l4o3g Oct 21 15 5:16:00: Child 
+ ig0l4o3g Oct 21 15 5:16:01:  at Parent.Child: hello
```

#### **Initialize a Child in Function**
This grabs the name of the function.
```js
function hello(){
	var child = parent.function(arguments);
	child.message('world');
}
```
Will display:
```c
# ig0l4o4g Oct 21 15 5:16:00: hello 
+ ig0l4o4g Oct 21 15 5:16:01:  at Parent.hello: world
```

## **Event Listeners**

#### **Listen for All Events**
The `onEvent` method can be used to listen for all events when used on Top-Most Logminer function returned by the module itself. 
```js
var Log = require('logminer');
log.onEvent(function(event){
	// ...send event to GUI or external service...
	console.log(event.title, event.arguments);
});
```

#### **Listen for Local Events**
The `onEvent` method can be used on any Logminer Instance to listen for only direct logs from that Instance. (children of the instance will not be catched)
```js
var parent = new Log('Parent');
parent.onEvent(function(event){
	// ...
});
```

## Todo
- enable disable log entry elements
- more color schemes configuration

## Contribution

Contribtution is very welcomed!

## License

(The MIT License)

Copyright (c) 2014 Halász Ádám

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.