import { Navigation } from 'react-native-navigation';

import UserLogin from './iOS/User/login';
import UserRegister from './iOS/User/register';
import UserCenter from './iOS/User/index';
import MainList from './iOS/DialogList/List';
import DialogSingle from './iOS/Dialog';
import UserList from './iOS/Users';


// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('User.Center', () => UserCenter);
  Navigation.registerComponent('User.Login', () => UserLogin);
  Navigation.registerComponent('User.Register', () => UserRegister);
  Navigation.registerComponent('Main.List', () => MainList);
  Navigation.registerComponent('Users.List', () => UserList);
  Navigation.registerComponent('Main.Dialog.Single', () => DialogSingle);//聊天界面
}
