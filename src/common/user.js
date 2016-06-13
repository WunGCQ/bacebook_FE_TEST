import {setItem, getItem} from './storage';
import Navigation from 'react-native-navigation';
import config from '../../config';
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
  login(arg){
    //登录
    var self = this;
    return fetch(config.rootUrl+'/login',{
      method: 'POST',
      body:JSON.stringify({
        telephone: arg.telephone,
        password: arg.password
      }),
    })
    .then((response) => response.json())
    .then((responseData) => {
      const {status,message,token,id,username,head_id};
      if(responseData.status == 0){
        self.setToken(token);    //设置token
        self.setUserInfo({id:id,head_id:head_id,username:username});        //存储用户数据
      } else {
        alert(responseData.message);
      }
    });



  }

  logout(){
    //登出
    //清空token
    //
    var self = this;
    return fetch(config.rootUrl+'/logout',{
      method: 'POST',
      body:JSON.stringify({
        telephone: arg.telephone,
        password: arg.password,
      }),
      head:{
        token: self.token,
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      const {status,message,token,id,username,head_id};
      if(responseData.status == 0){
        self.setToken(token);
        self.setUserInfo({id:id,head_id:head_id,username:username});
      } else {
        alert(responseData.message);
      }
    });

  }

  setToken(token){
    this.token = token;
    setItem('token',token);
  }

  setUserInfo(arg){
    var args = [];
    for( var info in arg){
      args.push({key:info,value:arg[info]});
    }
    return global.Storage.setBatchData(args)；
  }
}

global.user = new User();
