# m.net.ws #

node.js server and [PlayCanvas](https://playcanvas.com/) client using websockets. Simple to use for multiplayer games.

Allows to establish WebSocket connection between your node.js server and playcanvas client, and exchange with messages.

## Dependencies ##

* [**ws**](https://npmjs.org/package/ws) - WebSockets
* [**node-uuid**](https://npmjs.org/package/node-uuid) - GUID generator for unique socket IDs

## Usage ##

### Installing ###

`npm install m.net.ws`

In PlayCanvas add new script asset `/client/m.net.ws.js` (copy from this repo), and add it to root node.

### Simple Server ###

```js
var WebSocketServer = require('m.net.ws');
var server = new WebSocketServer({ port: 8080 });

server.on('connection', function(client) {
    console.log('client connected', client.id);

    client.on('hello', function(data) {
        console.log(data.name + ' said \'hello\'');

        client.send('welcome', {
            message: 'welcome ' + data.name
        });
    });
});
```

### Echo Client ###

Add this to your **script** assets and add to root node.

Make sure you run server(node.js) script first.

```js
pc.script.create('echo', function (context) {

    var Echo = function (entity) {
        this.entity = entity;
    };

    Echo.prototype = {
        initialize: function () {
            // if you running server not locally, then change url
            var socket = this.socket = new m.net.WebSocket({ url: 'ws://localhost:8080/' });

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

```

### More Examples ###

For more, check out `/examples` directory.

## License ##

(The MIT License)

Copyright (c) 2014 Maksims Mihejevs (moka) &lt;core@moka.co&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
