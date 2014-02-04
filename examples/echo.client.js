pc.script.create('echo', function (context) {

    var Echo = function (entity) {
        this.entity = entity;
    };

    Echo.prototype = {
        initialize: function () {
            // if you running server not locally, then change url
            var socket = this.socket = new pc.net.WebSocket({ url: 'ws://localhost:8080/' });

            socket.on('connect', function() {
                console.log('connected');

                socket.send('hello', {
                    name: 'Guest'
                });
            });

            socket.on('welcome', function(data) {
                console.log(data);
            });
        },

        update: function (dt) { }
    };

    return Echo;
});
