// import {setItem, getItem} from './storage';
// import Navigation from 'react-native-navigation';
import Store from 'react-native-store';


import config from '../../config';

import React, {Component, AsyncStorage } from 'react-native';
import GEVENT from './GEVENT';

const token = null;

const DB = {
    'user': Store.model('user'),
    'token': Store.model('token'),
};

const UserKeys = ['id','head_id','username','telephone'];

const Obj2Arr = function(obj){
  var kv = [];
  for(var i in obj){
    kv.push([i,obj[i]+""]);
  }
  return kv;
};

const Arr2Obj = function(arr){
  var obj = {};
  arr.forEach((v,k)=>{
    obj[k] = v + "";
  })
  return obj;
};

const AsyncStorageMultiObj = function(arr){
  var obj = {};
  arr.forEach((item,index)=>{
    obj[item[0]] = item[1];
  });
  return obj;
}

export default class User {
  constructor(){

    this.getUserFromStorage().then((res)=>{
      if(res && res.length > 0){
        var user_model = {};
        res.forEach((val,key)=>{
          this[key] = val;
          user_model[key] = val;
        });
        this.freshToken();
      }else{
        this.notLogin();
      }
    })
  }

  getUserFromStorage(){
    return AsyncStorage.multiGet(UserKeys);
  }

  hasLogin(){
    GEVENT.emit('user.hasLogin');
  }

  notLogin(){
    GEVENT.emit('user.notLogin');
  }

  onLogin(){
    GEVENT.emit('user.onLogin');
    this.hasLogin();
  }

  onLogout(){
    GEVENT.emit('user.onLogout');
  }

  getSelfInfo(){
    var self = this;
    return fetch(config.rootUrl+ '/users/0',{
      head:{
        Authorization: this.token,
        contentType:'json'
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.message == 'success'){
        this.setUserInfo(responseData.data).done((res)=>{
          self.onLogin();
        }); //存储用户数据
      } else {
        alert(responseData.message);
      }
    });
  }

  login(arg){
    //登录
    var self = this;
    return fetch(config.rootUrl+'/users/sessions',{
      method: 'POST',
      body:JSON.stringify({
        telephone: arg.telephone,
        password: arg.password
      }),
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.message == 'success'){
        let lastFresh = Date.now();
        let tokenInfo = Object.assign({},responseData.data,{lastFresh:lastFresh});
        self.setToken(tokenInfo).done((res)=>{
          console.warn(res);
          self.getSelfInfo.call(self);
        });
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
      head:{
        token: self.token,
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.message == 'success'){
        AsyncStorage.clear().then(self.onLogout);
      } else {
        alert(responseData.message);
      }
    });

  }



  freshToken(){
    var self = this;
    self.getTokenFromStorage().then((tokenInfoArr)=>{
      var now = Date.now();
      if(tokenInfoArr ){
        var tokenInfo = AsyncStorageMultiObj(tokenInfoArr);
        if(now - (tokenInfo.lastFresh - 0) < ((tokenInfo.expires_at - 0)*1000)) {
          //未过期
          self.fetchNewTokenByFreshToken(tokenInfo.refresh_token)
            .then((res)=> {
              if(res.message=='success'){
                self.setToken(res.data).done(self.getSelfInfo.bind(self));
              }else {
                alert(res.message);
              }
            });
          } else {
            //已过期
            DB.token.destroy().done(()=>{
              alert('对不起，您的会话已过期，请重新登录!');
              self.notLogin();
            })
          }
        } else {
          alert('对不起您还未登录，请登录!');
          self.notLogin();
        }
    })
  }

  getTokenFromStorage(){
    return AsyncStorage.multiGet(['access_token','expires_at','refresh_token','lastFresh']);
  }

  fetchNewTokenByFreshToken(refreshToken){
    return fetch(config.rootUrl+'/users/sessions',{
      method:'PUT',
      body: JSON.stringify({
        refresh_token: refreshToken,
      })
    }).then(res=>res.json());
  }

  setToken(tokenInfo) {
    var arr = Obj2Arr(tokenInfo);
    return AsyncStorage.multiSet(arr);
  }

  setUserInfo(user_model){
    for(var i in user_model){
      this[i] = user_model[i];
    }
    var arr = Obj2Arr(user_model);
    return AsyncStorage.multiSet(arr);
  }
}
