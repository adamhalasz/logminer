// =====================================================================
//  Dependencies
// =====================================================================
require('colors');
var StackTrace = require('stacktrace-js');
var moment = require('moment');
var dateFormat = "MMM DD YY h:mm:ss";
var completeSilence = false;
var uniqid = require('uniqid')

// =====================================================================
//  Logminer Object
// =====================================================================

function Event(title, silent){
    if(silent) this.isSilent = silent;
    this.id = uniqid();
    this.title = title;
    this.type = 'heading';
    this.noParent = true;
    this.entry();
    this.noParent = false;
    return this;
}

Event.prototype.onEventHandler
Event.prototype.onEvent = function(callback){
    this.onEventHandler = callback;
}
Event.prototype.child = function(title, silent){
    if(this.isSilent) silent = true;
    var event = new Event(title, silent);
    event.parent = this;
    event.parentArguments = this.title;
    return event;
}

Event.prototype.object = function(title, silent){
    if(this.isSilent) silent = true;
    var event = new Event(title, silent);
    event.parent = this;
    event.isObject = true;
    event.parentArguments = this.title;
    return event;
}

Event.prototype.function = function(args, silent){
    if(this.isSilent) silent = true;
    var event = new Event(args.callee.name, silent);
    event.parent = this;
    event.isFunction = true;
    event.parentArguments = this.title;
    return event;
}

Event.prototype.entry = function(){
    // Construct the NEW first argument
    var that = this;
    var entryArguments = arguments;
    var eventIdString = ' ' + new String(this.id)[that.idColors[that.type]]
    if(!completeSilence && !this.isSilent){
        if(!this.parent || (this.parent && !this.parent.isSilent)){
            
            
            var base = String(' ')[that.punctuationColors[that.type]];
            var currentTime = moment();
            var time = String(' ' + currentTime.format(dateFormat))[that.timeColors[that.type]] + String(':')[that.punctuationColors[that.type]];
            
            
           
            
            
            var parent = '';
            if(!this.noParent){
                
                var title = String(this.title)[that.parentColors[that.type]] ;
                var parents = [];
                var parentLog = this.parent;
                
                parent += String('  at ')[that.parentGapColors[that.type]].grey;
                while(parentLog){
                    parents.push(parentLog.title);
                    parentLog = parentLog.parent;
                }
                parents.reverse().forEach(function(title){
                    parent += String(title)[that.parentColors[that.type]] + String('.')[that.parentDotColors[that.type]].white;
                })
                
                var end = ':'.white;
                var newline = '';
            } else {
                var newline = '\n';
                var title = ' ' + String(this.title)[that.parentColors[that.type]] ;
                var end = '';
            }
            
            if(this.type == 'info'){
                var type = ' i'.cyan
                
            } else if (this.type == 'error') {
                var type = '!!'.red
            
            } else if (this.type == 'warn') {
                var type = ' !'.yellow
            
            } else if (this.type == 'heading') {
                var type = ' #'.grey
                
            } else {
                var type = ' +'.grey;
            }
            
            
            var first = newline + base + type + eventIdString + time + parent + title + end;
            
            //var args = ['> '.grey + time + ': ' + name.white + ' -> '.grey + (parentArguments.callee.name+'()').white + ' ->'.grey];
            
            
            var args = [first];
            
            for(var i = 0; i < arguments.length; i++){
                var arg = arguments[i];
                
                if(i == 0 && typeof arg == 'string'){
                    args.push(String(arg)[that.messageColors[that.type]] );
                
                } else if (typeof arg == 'string') {
                    args.push(arg);
                    
                } else if (typeof arg == 'object') {
                    args.push(JSON.stringify(arg, null, 4));
                    args.push('\n');
                
                } else {
                    args.push(arg);
                
                }
            }
            console.log.apply(this, args);
        }
    }
    var eventHandler = that.onEventHandler || module.exports.onEventHandler;
    if(eventHandler){
        StackTrace.get().then(function(trace){
            var event = {
                id: that.id,
                title: that.title,
                time: currentTime,
                event: that,
                parent: that.parent,
                arguments: entryArguments,
                parents: parents,
                stacktrace: trace
            };
            eventHandler(event);
        }).catch(function(error){
            if(error) throw error;
        });
    };
}

Event.prototype.parentColors = {
    info: 'cyan',
    warn: 'yellow',
    error: 'red',
    message: 'white',
    heading: 'underline'
}

Event.prototype.messageColors = {
    info: 'cyan',
    warn: 'yellow',
    error: 'red',
    message: 'reset',
}

Event.prototype.parentDotColors = {
    info: 'cyan',
    warn: 'yellow',
    error: 'red',
    message: 'reset',
    message: 'reset',
}

Event.prototype.parentGapColors = {
    info: 'cyan',
    warn: 'yellow',
    error: 'red',
    message: 'grey',
    heading: 'reset'
}

Event.prototype.idColors = {
    info: 'grey',
    warn: 'grey',
    error: 'grey',
    message: 'grey',
    heading: 'grey'
}

Event.prototype.punctuationColors = {
    info: 'grey',
    warn: 'grey',
    error: 'grey',
    message: 'grey',
    heading: 'grey',
}

Event.prototype.timeColors = {
    info: 'cyan',
    warn: 'yellow',
    error: 'red',
    message: 'grey',
    heading: 'grey'
}

Event.prototype.message = Message
Event.prototype.log = Message
Event.prototype.info = Info
Event.prototype.warn = Warn
Event.prototype.error = Error
Event.prototype.isSilent = false;
Event.prototype.silent = function(value){
    this.isSilent = true;
}
Event.prototype.unsilent = function(value){
    this.isSilent = false;
}

// =====================================================================
//  Message Types
// =====================================================================

function Message(){
    this.type = 'message';
    this.entry.apply(this, arguments);
}
function Info(){
    this.type = 'info';
    this.entry.apply(this, arguments);
}
function Warn(){
    this.type = 'warn';
    this.entry.apply(this, arguments);
}
function Error(){
    this.type = 'error';
    this.entry.apply(this, arguments);
}


module.exports = Event;
module.exports.silent = function(){
    completeSilence = true;
}
module.exports.onEventHandler = false;
module.exports.onEvent = function(callback){
    module.exports.onEventHandler = callback;
}