// Create web server
// Usage: node comments.js

// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var fs = require('fs');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;
  var path = url_parts.pathname;
  var method = request.method;

  if (path === '/comments' && method === 'GET') {
    response.writeHead(200, {'Content-Type': 'application/json'});
    fs.readFile('./comments.json', function(err, data) {
      if (err) {
        throw err;
      }
      var comments = JSON.parse(data);
      response.end(JSON.stringify(comments));
    });
  } else if (path === '/comments' && method === 'POST') {
    response.writeHead(200, {'Content-Type': 'application/json'});
    fs.readFile('./comments.json', function(err, data) {
      if (err) {
        throw err;
      }
      var comments = JSON.parse(data);
      comments.push(query);
      fs.writeFile('./comments.json', JSON.stringify(comments), function(err) {
        if (err) {
          throw err;
        }
        response.end(JSON.stringify(comments));
      });
    });
  } else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('404 - Not Found');
  }
});

// Listen on port 8000, IP defaults to