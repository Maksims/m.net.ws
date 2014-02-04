/*!
 * pc.net.ws - is websockets server/client for playcanvas
 * Copyright(c) 2014 Maksims Mihejevs (moka) <core@moka.co>
 * https://github.com/Maksims/pc.net.ws
 * MIT Licensed
 */

(function(net) {

    Socket = function(args) {
        pc.extend(this, pc.events);

        args = args || { };
        args.url = args.url || '';

        this._connected = false;

        this.socket = new WebSocket(args.url);

        this.socket.onopen = this._onopen.bind(this);
        this.socket.onclose = this._onclose.bind(this);
        this.socket.onerror = this._onerror.bind(this);
        this.socket.onmessage = this._onmessage.bind(this);
    };

    Object.defineProperty(Socket.prototype, "isConnected", { get: function() {
        return this._connected;
    } });

    Socket.ReservedNames = {
        'connect': 1,
        'close': 1,
        'error': 1,
        'message': 1
    };

    Socket.prototype._onopen = function(event) {
        this._connected = true;
        this.fire('connect', event);
    };

    Socket.prototype._onclose = function(event) {
        this._connected = false;
        this.fire('close', event);
    };

    Socket.prototype._onerror = function(event) {
        this.fire('error', event);
    };

    Socket.prototype._onmessage = function(event) {
        try {
            var obj = JSON.parse(event.data);
        } catch(ex) {
            this._onerror(new Error('could not parse message - is it JSON?'));
            return;
        }

        if (Socket.ReservedNames[obj.n]) {
            this._onerror(new Error('could not receive message - name is reserved:', obj.n));
            return;
        }

        this.fire('message', obj.n, obj.d);
        this.fire(obj.n, obj.d);
    };

    Socket.prototype.close = function(args) {
        args = args || { };
        args.code = args.code || 1000; // 1000 - CLOSE_NORMAL
        args.reason = args.reason || 'unknown';

        this.socket.close(args.code, arg.reason);
    };

    Socket.prototype.send = function(name, data) {
        if (Socket.ReservedNames[name]) {
            this._onerror(new Error('could not send message - name is reserved:', name));
            return;
        }
        this.socket.send(JSON.stringify({
            n: name,
            d: data
        }));
    };

    net.WebSocket = Socket;

})(pc.net);