/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */


import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import {
  Row,
  Hr
} from '../../Components';

import COLORS from '../../common/colors';
import ICONS from '../../common/icons';
import naviStyle from '../../common/navigatorStyle';
import config from '../../../config';
import User from '../../common/user';
import GEVENT from '../../common/GEVENT';


export default class UserCenter extends Component {

  static navigatorStyle = naviStyle;

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
    this.goLoginView = this.goLoginView.bind(this);
    this.fetchUserData = this.fetchUserData.bind(this);
    this.bindUserListener();
  }

  componentDidMount() {


    var self = this;
    if(!global.USER){
      global.USER = new User();
    }

  }

  bindUserListener(){
    var self = this;
    GEVENT.on('user.hasLogin',self.fetchUserData);
    GEVENT.on('user.onLogout',self.goLoginView);
  }


  fetchUserData() {

        this.setState({
          data: {
            username: global.USER.username,
            head_id: global.USER.head_id,
          },
          loaded: true,
        });
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    const { avatar,head_id, username} = this.state.data;
    return (
      <View style={S.wrapper}>
        <View style={S.container}>
          <View style={S.top_user_block}>
            <View style={S.avatar_wrapper}>
              <Image
                source={ICONS.AVATAR[head_id]}
                style={S.avatar}/>
            </View>
            <View style={S.user_name_wrapper}>
              <Text style={S.user_name}>{username}</Text>
            </View>
          </View>
          {this.userMenuList()}
          {this.logOutMenu()}
        </View>
      </View>
    );
  }

  userMenuList(){
    return (
      <View style={S.list_container}>
        <Row arrow={1} onPress={this.goHeadView.bind(this)}>修改头像</Row>
        <Hr/>
        <Row arrow={1} onPress={this.goModifyView.bind(this)}>修改资料</Row>
        <Hr/>
        <Row arrow={1} onPress={this.goLoginView.bind(this)}>重新登录</Row>
      </View>
    )
  }

  logOutMenu(){
    return (
      <View style={S.list_container}>
        <Row align={'center'} onPress={this.doLogout.bind(this)}>退出登录</Row>
      </View>
    )
  }

  // head_id = head_1
  renderLoadingView() {
    var head_id = "head_1";
    var username = "username";
    return (
      <View style={S.wrapper}>
        <View style={S.container}>
          <View style={S.top_user_block}>
            <View style={S.avatar_wrapper}>
              <Image
                source={ICONS.AVATAR[head_id]}
                style={S.avatar}/>
            </View>
            <View style={S.user_name_wrapper}>
              <Text style={S.user_name}>{username}</Text>
            </View>
          </View>
          {this.userMenuList()}
          {this.logOutMenu()}
        </View>
      </View>
    );
  }

  goHeadView(){
    // console.log(dialog);
    this.props.navigator.push({
      screen: 'User.Head',
      title: '修改头像',
    });
  }

  goModifyView(){
    // console.log(dialog);
    this.props.navigator.push({
      screen: 'User.Modify',
      title: '修改资料',
    });
  }

  goLoginView(){
    // console.log(dialog);
    this.props.navigator.push({
      screen: 'User.Login',
      title: '用户登录',
    });
  }

  doLogout(){
    global.USER.logout();
    //调用全局单例
    //完成后跳转页面到登录
  }
}


var styles_obj = {
  wrapper:{
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flex:1,
    alignSelf:'stretch',
    position:'absolute',
    backgroundColor: '#EFEFEF',
  },
  container: {
    // flex: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#EFEFEF',
    // backgroundColor: '#F5FCFF',
  },
  top_user_block: {

    flexWrap: 'wrap',
    // backgroundColor: COLORS.ACTIVE_ICON_BG_COLOR,
    backgroundColor: '#FFF',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomColor: COLORS.COMMON_GRAY,
    // borderBottomWidth: 0.5,
    // textAlign: 'center',
  },
  avatar_wrapper: {
    width: 80,
    height: 80,
    overflow: 'hidden',
    borderRadius: 50,
    borderColor: COLORS.COMMON_GRAY,
    borderWidth: 0.5,
  },
  avatar:{
    height: 80,
    width: 80,
  },
  user_name_wrapper :{
    height: 24,
    paddingTop: 5,
  },
  user_name: {
    lineHeight: 30,
    fontSize: 16,
    color: '#000',
  },
  list_container: {
    flex: 1,
    marginTop: 20,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.COMMON_GRAY,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.COMMON_GRAY,
    backgroundColor: '#fff',
  },


};
var S = StyleSheet.create(styles_obj);

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
