var express = require('express');
var app = express();

var port = 3000;

app.get('/',function(require, respone) {
  respone.send('<h1>Hello, world !!! at port</h1>');
});

app.listen(port, function() {
  console.log('Example app listening at http://localhost' + port);
});