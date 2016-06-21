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

export default class User {
  constructor(){

    DB.user.find().then((res)=>{
      if(res && res.length > 0){
        var user_model = res[0];
        for(var i in user_model){
          this[i] = user_model[i];
        }
        this.freshToken();
      }else{
        this.notLogin();
      }
    })
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
        self.setUserInfo(responseData.data).done((res)=>{
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
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
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
        self.setToken(tokenInfo).done(()=>{
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
        DB.token.destroy().then(self.onLogout);
      } else {
        alert(responseData.message);
      }
    });

  }



  freshToken(){
    var self = this;
    DB.token.find().then((tokenInfo)=>{
      var now = Date.now();
      if(tokenInfo){
        if(now - (tokenInfo.lastFresh - 0) < ((tokenInfo.expires_at - 0)*1000)) {
          //还未过期
          self.fetchNewTokenByFreshToken(tokenInfo.refresh_token)
            .then((res)=> {
              if(res.message=='success'){
                self.setToken(res.data).then(self.getSelfInfo);
              }else {
                alert(res.message);
              }
            });
          } else {
            //已过期
            alert('对不起，您的会话已过期，请重新登录!');
            self.notLogin();
          }
        } else {
          alert('对不起，您的会话已过期，请重新登录!');
          self.notLogin();
        }
    })
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
    return DB.token.add(tokenInfo);
  }

  setUserInfo(user_model){
    for(var i in user_model){
      this[i] = user_model[i];
    }
    return DB.user.add(user_model);
  }
}
