/*!
 * pc.net.ws - is websockets server/client for playcanvas
 * Copyright(c) 2014 Maksims Mihejevs (moka) <core@moka.co>
 * https://github.com/Maksims/pc.net.ws
 * MIT Licensed
 */


var EventEmitter = require('events').EventEmitter;
var ws = require('ws');


var Client = require('./Client');


function Server(args) {
    EventEmitter.call(this);
    args = args || { };

    // args.verifyClient = function() {
    //     TODO
    //     add session stuff
    //     so it can be restored and reused
    // };

    this.socket = new ws.Server(args);

    this.socket.on('connection', this._onconnection.bind(this));
}
Server.prototype = Object.create(EventEmitter.prototype);


Server.prototype._onconnection = function(socket) {
    this.emit('connection', new Client(socket));
};


module.exports = Server;
