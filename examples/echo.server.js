var WebSocketServer = require('../index');

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
