const http = require('http');

const server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('<h1>Hello World</h1>');
    return res.end();
});

server.listen(443, '127.0.0.1');