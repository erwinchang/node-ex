var http = require('http');

http.createServer(function(req,res){
//    console.log('T00 url:##%s##',req.url);
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
//    console.log('T01 path:##%s##',path);

    switch(path){
        case '':
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end('Homepage');
            break;
        case '/about':
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end('About');
            break;
        default:
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end('Not Found');
            break;

    }
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-c to terminate...');
