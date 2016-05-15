import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';
import ICONS from './src/common/icons';
import COLORS from './src/common/colors';

registerScreens(); // this is where you register all of your app's screens

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
      label: '群组',
      screen: 'User.Register', // this is a registered name for a screen
      icon: ICONS.Navigation.GROUP,
      selectedIcon: ICONS.Navigation.GROUP,
      title: '群组',
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