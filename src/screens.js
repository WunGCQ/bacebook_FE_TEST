import { Navigation } from 'react-native-navigation';

import UserLogin from './iOS/User/login';
import UserRegister from './iOS/User/register';
import UserCenter from './iOS/User/index';
import MainList from './iOS/DialogList/List';
import DialogSingle from './iOS/Dialog';
import UserList from './iOS/Users';
import UserApplicationList from './iOS/Users/applications';
import UserAdd from './iOS/Users/add';
import UserHead from './iOS/User/head';
import UserModify from './iOS/User/modify';
import UserRequest from './iOS/Users/request'

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('User.Center', () => UserCenter);
  Navigation.registerComponent('User.Login', () => UserLogin);
  Navigation.registerComponent('User.Register', () => UserRegister);
  Navigation.registerComponent('User.Head', () => UserHead);
  Navigation.registerComponent('User.Modify', () => UserModify);
  Navigation.registerComponent('Main.List', () => MainList);
  Navigation.registerComponent('Users.List', () => UserList);
  Navigation.registerComponent('Users.Add.List', () => UserApplicationList);//申请联系人列表
  Navigation.registerComponent('Users.Add', () => UserAdd);//添加联系人
  Navigation.registerComponent('Users.Request', () => UserRequest);//用户申请
  Navigation.registerComponent('Main.Dialog.Single', () => DialogSingle);//聊天界面
}
