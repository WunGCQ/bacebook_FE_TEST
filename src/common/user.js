import {setItem, getItem} from './storage';
import Navigation from 'react-native-navigation';
const token = null;
class User{
  constructor(){

    global.Storage.getBatchData([
      { key: 'token' },
      { key: 'username' },
      { key: 'avatar' },
    ]).then((data)=>{
        if(data[0]) { // token

        }else {
          this.goLoginView();
        }
    })
  }
  goLoginView(){
    Navigation.push({
      screen: 'User.Login',
      title: '用户登录'
    });
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
    setItem('token',token);
  }
}

global.user = new User();
