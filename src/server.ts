import express = require('express');
import webpackwatch = require("./webpack-watch");

var app = express();

app.use(express.static('public_html'));

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function () {
  webpackwatch.run();
  console.log('コンパイル成功後、ブラウザで http://localhost:' + server.address().port + ' にアクセスしてください。');
});
