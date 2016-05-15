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
} from 'react-native';

import COLORS from '../../common/colors';

const avatarURL = '../../../img/intro-wifi-img-01.png';

export default class UserCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData() {
    fetch('http://m.me/user')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          data: {
            username: responseData.username,
            avatar: responseData.avatar,
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

    const { avatar, username} = this.state.data;
    return (
      <View style={STYLES.container}>
        <View style={STYLES.top_user_block}>
          <View style={STYLES.avatar_wrapper}>
            <Image
              source={{uri: avatar}}
              style={STYLES.avatar}/>
          </View>
          <View style={STYLES.user_name_wrapper}>
            <Text style={STYLES.user_name}>{username}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={STYLES.container}>
        <Text>
          加载中...
        </Text>
      </View>
    );
  }
}

var STYLES = StyleSheet.create({
  container: {
    // flex: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',

    // backgroundColor: '#F5FCFF',
  },
  top_user_block: {

    flexWrap: 'wrap',
    backgroundColor: COLORS.ACTIVE_ICON_BG_COLOR,
    // backgroundColor: '#ccc',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    // textAlign: 'center',
  },
  avatar_wrapper: {
    width: 80,
    height: 80,
    overflow: 'hidden',
    borderRadius: 50,
    backgroundColor: '#ccc',
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
    lineHeight: 24,
    fontSize: 16,
  },


});

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
