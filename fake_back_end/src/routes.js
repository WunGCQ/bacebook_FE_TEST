/**
 * Created by wungcq on 16/5/15.
 */

import fake_users from './data/user';
import fake_dialogs from './data/dialog_List';
import fake_dialog from './data/dialog_Content';

var Router = require('koa-router');
var myRouter = new Router();


myRouter.get('/user', function *(next) {
    this.response.body = JSON.stringify(fake_users);
});
myRouter.get('/dialogs', function *(next) {
    this.response.body = JSON.stringify(fake_dialogs);
});
myRouter.get('/dialog', function *(next) {
    this.response.body = JSON.stringify(fake_dialog);
});
export default (myRouter.routes());
