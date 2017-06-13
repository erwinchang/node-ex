var http = require('http'),
    fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode){
    if(!responseCode) responseCode = 200;

    console.log('dirname:%s',__dirname);
    console.log('path:%s',path);

    fs.readFile(__dirname + path, function(err, data) {
        if(err){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('500 - Internal Error');
        }else{
            res.writeHead(responseCode,
                {'Content-Type': contentType });
            res.end(data);
        }
    });
}


http.createServer(function(req,res){
//    console.log('T00 url:##%s##',req.url);
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
//    console.log('T01 path:##%s##',path);

    switch(path){
        case '':
            serveStaticFile(res, '/public/home.html','text/html');
            break;
        case '/about':
            serveStaticFile(res, '/public/about.html','text/html');
            break;
        case '/img/logo.jpg':
            serveStaticFile(res, '/public/img/logo.jpg','image/jpeg');
            break;
        default:
            serveStaticFile(res, '/public/404.html','text/html',404);
            break;

    }
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-c to terminate...');
