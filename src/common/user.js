import storage from './storage';
const token = null;
class User{
  constructor(){
    var token = storage.getItem('token');
    if(token){
      var username = storage.getItem('username');
      var avatar = storage.getItem('avatar');
      this.token = token;
      this.username = username;
      this.avatar = avatar;
    }else {
      this.token = null;
    }
    return this;
  }

  login(){
    //登录
    //设置token
    //存储用户数据
    //跳到用户界面
  }

  logout(){
    //登出
    //清空token
    //
  }

  setToken(token){
    this.token = token;
    storage.save('token',token);
  }
}

global.user = new User();
