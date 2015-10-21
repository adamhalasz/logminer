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
    child.message('incoming phone call ', {
        name: 'George Lucas',
        phone: '001.124.412.511',
        location: 'Earth',
        id: 80022
    });
    child.message('transmission terminated');
}

function smsReceived(){
    var child = log.function(arguments);
    child.message('sms received from santa claus');
    child.message('sms stored');
}

function messageReceived(){
    var child = log.function(arguments, true);
    
    child.message('message receiceved from morpheus');
    child.message('message body: "neo wake up..."');
    child.message('message stored');
    
    function a(){
        var grandChild = child.function(arguments);
        grandChild.message('a1');
        grandChild.message('a2');
        grandChild.message('a3');
    }
    
    function b(){
        var grandChild = child.function(arguments);
        grandChild.message('b1');
        grandChild.message('b2');
        grandChild.message('b3');
    }
    
    function c(){
        var grandChild = child.function(arguments);
        
        grandChild.message('s:c1');
        grandChild.message('s:c2');
        grandChild.message('s:c3');
    }
    a(), b(), c()
}

phoneCall();
smsReceived();
messageReceived();