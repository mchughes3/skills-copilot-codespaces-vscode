// Create web server
// Run: node comments.js
// Open browser and go to http://localhost:3000
// Type in the text box and click on the "Add Comment" button
// The comment will be added to the list of comments

const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

let comments = [];

const server = http.createServer((req, res) => {
    const path = url.parse(req.url).pathname;
    if (path === '/') {
        fs.readFile(__dirname + '/comments.html', (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.write('Page not found');
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            }
        });
    } else if (path === '/comment') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', (data) => {
                body += data;
            });
            req.on('end', () => {
                let post = qs.parse(body);
                comments.push(post.comment);
                res.writeHead(302, {'Location': '/'});
                res.end();
            });
        }
    } else if (path === '/getComments') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(comments));
        res.end();
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Page not found');
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
