import express = require('express');
import path = require("path");
import webpackwatch = require("./webpack-watch");

var app = express();

app.get("*.shtml", function(req, res, next) {
  console.log("shtml");
  console.log(req.path);
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.resolve("public_html" + req.path));
  //https://stackoverflow.com/questions/48880452/nodejs-with-express-make-internal-route-call
  //https://github.com/midday/express-ssi/blob/master/index.js
  
});

app.use(express.static('public_html'));

app.set('port', process.env.PORT || 3000);


const server = app.listen(app.get('port'), function () {
  webpackwatch.run();
  console.log('コンパイル成功後、ブラウザで http://localhost:' + server.address().port + ' にアクセスしてください。');
});
