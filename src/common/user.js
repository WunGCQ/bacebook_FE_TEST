// import {setItem, getItem} from './storage';
// import Navigation from 'react-native-navigation';
import Store from 'react-native-store';


import config from '../../config';

import React, {Component, AsyncStorage } from 'react-native';

const token = null;

const DB = {
    'user': Store.model('user'),
}

export default class User {
  constructor(){
    DB.user.add({
      id: 1,
      token: '2333',
      username: '老中医',
      head_id: 'head_1',
    }).then(()=>{
        DB.user.find().then((res)=>{
          var str = JSON.stringify(arguments);
        })
    })
  }
  goLoginView(){
    alert('用户未登录');
    // Navigation.push({
    //   screen: 'User.Login',
    //   title: '用户登录'
    // });
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
      const {status,token,id,username,head_id} = responseData.data;
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
      const {status,token,id,username,head_id} = responseData.data;
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
    return global.Storage.setBatchData(args)
  }
}
