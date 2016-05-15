// var Koa = require('koa');
import Koa from 'koa';
import Routes from './routes';
let app = new Koa();
let PORT = 80;

app.use(Routes);
console.log(`开始监听 ${PORT} 端口`);

app.listen(PORT);
