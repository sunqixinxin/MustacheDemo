var http = require('http');
var fs = require('fs');
var url = require('url');
var demoNode = require('./demoNode');
var pages = require('./pages');
 
// 创建服务器
http.createServer(function (request, response) {
    console.log("Request received, url:" + request.url);

    if (request.url == '/') {
        response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.write("Hello world!你好啊");
        response.end();
    }
    else if (request.url.toLowerCase() == '/demonode') {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.write(demoNode.demo());
        response.end();
    }
    else if (request.url.toLowerCase().indexOf('/pages/') === 0) {
        var pageName = request.url.replace('/pages/', '');
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.write(pages.page(pageName));
        response.end();
    } else {
        // 解析请求，包括文件名
        var pathname = url.parse(request.url).pathname;

        // 从文件系统中读取请求的文件内容
        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                console.log(err);
                // HTTP 状态码: 404 : NOT FOUND
                // Content Type: text/html
                response.writeHead(404, { 'Content-Type': 'text/html' });
            } else {
                // HTTP 状态码: 200 : OK
                // Content Type: text/html
                response.writeHead(200, { 'Content-Type': 'text/html' });

                // 响应文件内容
                response.write(data.toString());
            }
            //  发送响应数据
            response.end();
        });
    }
    
}).listen(8080);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/');