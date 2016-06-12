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
    this.props.navigator.setOnNavigatorEvent(()=>{
      alert('!!');
      this.props.navigator.toggleTabs({
        to: 'shown', // required, 'hidden' = hide navigation bar, 'shown' = show navigation bar
        animated: false // does the toggle have transition animation or does it happen immediately (optional). By default animated: true
      });
    });
  }

  componentDidMount() {

    this.fetchUserData();
  }

  fetchUserData() {
    fetch(config.rootUrl+'/user')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          data: {
            username: responseData.me.username,
            avatar: responseData.me.avatar,
          },
          loaded: true,
        });
      })
      .done();
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
                source={{uri: head_id}}
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
        <Row arrow={1}>修改头像</Row>
        <Hr/>
        <Row arrow={1}>修改资料</Row>
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

  renderLoadingView() {
    return (
      <View style={S.container}>
        <Text>
          加载中...
        </Text>
      </View>
    );
  }

  goLoginView(){
    // console.log(dialog);
    this.props.navigator.push({
      screen: 'User.Login',
      title: '用户登录',
    });
  }

  doLogout(){
    //user.logout().then(this.goLoginView.bind(this));
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
