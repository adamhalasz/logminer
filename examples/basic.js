var Log = require('../');

var log = new Log('Parent');
    log.message('hello');
    log.warn('world');
    log.info('in 2015');
    
var child = log.child('Child');
	child.error('exit')