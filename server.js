var http = require('http');
var fs = require('fs');
var url = require('url');
var demoNode = require('./demoNode');
var pages = require('./pages');
 
// ����������
http.createServer(function (request, response) {
    console.log("Request received, url:" + request.url);

    if (request.url == '/') {
        response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.write("Hello world!��ð�");
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
        // �������󣬰����ļ���
        var pathname = url.parse(request.url).pathname;

        // ���ļ�ϵͳ�ж�ȡ������ļ�����
        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                console.log(err);
                // HTTP ״̬��: 404 : NOT FOUND
                // Content Type: text/html
                response.writeHead(404, { 'Content-Type': 'text/html' });
            } else {
                // HTTP ״̬��: 200 : OK
                // Content Type: text/html
                response.writeHead(200, { 'Content-Type': 'text/html' });

                // ��Ӧ�ļ�����
                response.write(data.toString());
            }
            //  ������Ӧ����
            response.end();
        });
    }
    
}).listen(8080);

// ����̨�����������Ϣ
console.log('Server running at http://127.0.0.1:8080/');