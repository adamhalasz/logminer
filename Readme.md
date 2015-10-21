# logminer
An object oriented logger for more organised log tracking.

```
var Log = require('logminer');

var log = new Log('Parent');
    log.message('hello');

var child = new log.child('Child');
	child.message('world');

ig0k5h91 ===== Oct 21 15 4:04:36: Parent
ig0k5h91 ----- Oct 21 15 4:04:36:  at Parent: hello
ig0k5h92 ===== Oct 21 15 4:04:36: Child
ig0k5h92 ----- Oct 21 15 4:04:36:  at Parent.Child: world
```

## Features
- Unlimited Object Nesting
- Complete Silence
- Silent Scopes (children will be silent too)
- Event ID's
- Listen for Events (they come with time, stack traces etc)

This is produced:

![enter image description here](http://i.imgur.com/Ya8RF8w.png)

By This:
```js
var Log = require('../');

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

#### Initialize a Parent
```js
var log = new Log('Parent')
	log.message('something');
```
Will display:
```
> Oct 21 2015 2:05:49: Parent 
```

#### Initialize a Child
This creates a child logger which inherits the `Parent` in every log produced with `childlog`.
```js
var log2 = new log.child('Children');
	log2.message('something');
```
Will display:
```
> Oct 21 2015 2:05:49: Parent -> Children -> something
```

#### Initialize a Child in Function
This grabs the name of the function.
```js
function hello(){
	var log2 = log.function(arguments);
	log2.message('something');
}
```
Will display:
```
> Oct 21 2015 2:05:49: Parent -> hello() -> something
```

## Todo
- Better nesting
- log error
- log info
- log warn 
- color schemes for different terminals

## License

(The MIT License)

Copyright (c) 2014 Halász Ádám

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.