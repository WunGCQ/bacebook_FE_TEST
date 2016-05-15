import { Navigation } from 'react-native-navigation';

import UserLogin from './iOS/User/login';
import UserRegister from './iOS/User/register';
import UserCenter from './iOS/User/index';
import MainList from './iOS/Main/List';


// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('User.Center', () => UserCenter);
  Navigation.registerComponent('User.Login', () => UserLogin);
  Navigation.registerComponent('User.Register', () => UserRegister);
  Navigation.registerComponent('Main.List', () => MainList);
}
