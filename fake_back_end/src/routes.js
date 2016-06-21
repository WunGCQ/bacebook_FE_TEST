/**
 * Created by wungcq on 16/5/15.
 */

import fake_users from './data/user';
import fake_friendships from './data/friendships';
import fake_dialogs from './data/dialog_List';
import fake_dialog from './data/dialog_Content';

var Router = require('koa-router');
var myRouter = new Router();

import './chat';

myRouter.get('/user', function *(next) {
    this.response.body = JSON.stringify(fake_users);
});

myRouter.get('/logout', function *(next) {
    this.response.body = JSON.stringify({message:'success'});
});


myRouter.post('/users/', function *(next) {
  var userInfo = Object.assign({},fake_users.me);
  this.response.body = JSON.stringify({message:'success',data:userInfo});
});

myRouter.post('/users/sessions', function *(next) {
   var tokenInfo = Object.assign({},{
     "access_token": "alsghsdklghsdjklgsedlafsadfsadfasdfasd",
      "expires_at": "7200",
      "refresh_token": "345623vgr89_tsdmotc431905g3dfgasdfasf"
   });
   this.response.body = JSON.stringify({message:'success',data:tokenInfo});
});

myRouter.put('/users/sessions', function *(next) {
   var tokenInfo = Object.assign({},{
     "access_token": "alsghsdklghsdjklgsedlafsadfsadfasdfasd",
      "expires_at": "7200",
      "refresh_token": "345623vgr89_tsdmotc431905g3dfgasdfasf"
   });
   this.response.body = JSON.stringify({message:'success',data:tokenInfo});
});

myRouter.get('/users/0', function *(next) {
   var userInfo = Object.assign({},fake_users.me);
   this.response.body = JSON.stringify({message:'success',data:userInfo});
});

myRouter.get('/users/friendships', function *(next) {
    this.response.body = JSON.stringify(fake_users);
});

myRouter.post('/users/friendships', function *(next) {
    console.log(this.request);
    this.response.body = JSON.stringify({
      message:'success',
      data: fake_friendships.data[0],
    });
});

myRouter.get('/dialogs', function *(next) {
    this.response.body = JSON.stringify(fake_dialogs);
});

myRouter.get('/dialog', function *(next) {
    this.response.body = JSON.stringify(fake_dialog);
});

export default (myRouter.routes());
