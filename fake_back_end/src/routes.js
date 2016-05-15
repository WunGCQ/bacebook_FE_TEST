/**
 * Created by wungcq on 16/5/15.
 */

import fake from './data/user';

var Router = require('koa-router');
var myRouter = new Router();


myRouter.get('/user', function *(next) {
    this.response.body = JSON.stringify(fake);
});

export default (myRouter.routes());
