import express = require('express');
import path = require("path");
import browserSync = require("browser-sync");
const connectBrowserSync = require("connect-browser-sync");
import webpackwatch = require("./webpack-watch");

var app = express();

const port:number = process.env.hasOwnProperty("PORT")? (process.env.PORT as unknown as number) : 3000;
const bsPort = port + 1;
const bsuiPort = port + 2;

const browserSyncInstance = browserSync(
  {
    files: [
      '../public_html',
      '!../public_html/**/*.js'
    ],
    port: bsPort,
    ui: {
      port: bsuiPort
    },
    logSnippet: false
  }
)

app.use(connectBrowserSync(browserSyncInstance));

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
  webpackwatch.run(()=> browserSyncInstance.reload());
  console.log('コンパイル成功後、ブラウザで http://localhost:' + server.address().port + ' にアクセスしてください。');
});
