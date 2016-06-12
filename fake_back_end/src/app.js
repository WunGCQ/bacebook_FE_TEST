// var Koa = require('koa');
import Koa from 'koa';
import Routes from './routes';
import _Static from 'koa-static';

let app = new Koa();
let PORT = 8080;

app.use(Routes);

app.use(_Static('public/'));
console.log(`开始监听 ${PORT} 端口`);

app.listen(PORT);
