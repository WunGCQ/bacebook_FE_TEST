import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';
import ICONS from './src/common/icons';
import COLORS from './src/common/colors';
import config from './config';
import User from './src/common/user';



registerScreens(); // this is where you register all of your app's screens
(function(){
  // var ws = new WebSocket('ws://127.0.0.1:8088/');
  //
  // ws.onopen = () => {
  //   // connection opened
  //   alert('!!!');
  //   ws.send('something');
  // };
  //
  // ws.onmessage = (e) => {
  //   // a message was received
  //   alert('!!!');
  //   console.log(e.data);
  // };
  //
  // ws.onerror = (e) => {
  //   // an error occurred
  //   alert('!!!');
  //   console.log(e.message);
  // };
  //
  // ws.onclose = (e) => {
  //   // connection closed
  //   alert('!!!');
  //   console.log(e.code, e.reason);
  // };
  // console.log(ws);
  //if (!window.location) {
  //    // App is running in simulator
  //  window.navigator.userAgent = 'ReactNative';
  //}

  // This must be below your `window.navigator` hack above
  //const io = require('socket.io-client/socket.io');
  //const socket = io('http://127.0.0.1:8088', {
  //  transports: ['websocket'] // you need to explicitly tell it to use websockets
  //});
  //
  //socket.on('connect', () => {
  //  console.log('connected!');
  //  alert('!!');
  //});

})();

// start the app
Navigation.startTabBasedApp({
  tabs: [
    {
      label: '聊天',
      screen: 'Main.List', // this is a registered name for a screen
      icon: ICONS.Navigation.DIALOG,
      selectedIcon: ICONS.Navigation.DIALOG,
      title: '聊天',
    },
    {
      label: '联系人',
      screen: 'Users.List', // this is a registered name for a screen
      icon: ICONS.Navigation.GROUP,
      selectedIcon: ICONS.Navigation.GROUP,
      title: '联系人',
    },
    {
      label: '用户',
      screen: 'User.Center', // this is a registered name for a screen
      icon: ICONS.Navigation.USER,
      selectedIcon: ICONS.Navigation.USER,
      title: '用户',
    },
  ],
  tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
    tabBarButtonColor: COLORS.INACTIVE_COLOR, // optional, change the color of the tab icons and text (also unselected)
    tabBarSelectedButtonColor: COLORS.ACTIVE_ICON_COLOR, // optional, change the color of the selected tab icon and text (only selected)
    tabBarBackgroundColor: COLORS.NAVBAR_BG_COLOR // optional, change the background color of the tab bar
  },
  drawer: { // optional, add this if you want a side menu drawer in your app
    left: { // optional, define if you want a drawer from the left
      screen: 'User.Center' // unique ID registered with Navigation.registerScreen
    },
    right: { // optional, define if you want a drawer from the right
      screen: 'User.Register' // unique ID registered with Navigation.registerScreen
    },
    disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
  },
  passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
  animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});
