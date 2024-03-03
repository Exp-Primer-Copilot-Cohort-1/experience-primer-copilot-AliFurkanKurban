// create web server
// import module
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var comments = [];

var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url);
    if (urlObj.pathname === '/') {
        fs.readFile('index.html', function(err, data) {
            if (err) {
                res.end('Server error');
            } else {
                res.end(data);
            }
        });
    } else if (urlObj.pathname === '/add') {
        var str = '';
        req.on('data', function(data) {
            str += data;
        });
        req.on('end', function() {
            var comment = querystring.parse(str).comment;
            comments.push(comment);
            res.end(JSON.stringify(comments));
        });
    } else {
        fs.readFile(urlObj.pathname.slice(1), function(err, data) {
            if (err) {
                res.end('404');
            } else {
                res.end(data);
            }
        });
    }
});
server.listen(8080);
console.log('Server started on 8080');