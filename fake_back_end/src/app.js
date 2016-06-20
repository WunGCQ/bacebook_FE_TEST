// var Koa = require('koa');
import Koa from 'koa';
import Routes from './routes';
import _Static from 'koa-static';
var ws = require("nodejs-websocket");

let app = new Koa();
let PORT = 8080;

app.use(Routes);

app.use(_Static('public/'));
console.log(`开始监听 ${PORT} 端口`);

app.listen(PORT);



// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection");
    conn.on("text", function (str) {
        console.log("Received "+str);
        conn.sendText(str.toUpperCase()+"!!!")
    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
}).listen(8079);
