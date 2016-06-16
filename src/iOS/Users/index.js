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

import naviStyle from '../../common/navigatorStyle';
import UserCell from './UserCell';

import config from '../../../config';
import ICONS from '../../common/icons';

const REQUEST_URL = config.rootUrl+'/users/friendships/';

var lastId = null;

const newUserCell = {
  id: -1,
  head_id: 'newUser',
  username: '好友申请',
};
export default class MainList extends Component {

  static navigatorStyle = naviStyle;
  static navigatorButtons = {
    rightButtons: [
      {
        // title: '添加新朋友', // for a textual button, provide the button title (label)
        icon: ICONS.Navigation.ADD,
        id: 'add_friend', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
        style:{
          width: 30,
          height: 30,
        },
      },
    ]
  };

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
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        responseData.users.splice(0,-1,newUserCell);
        lastId = responseData.users[responseData.users.length - 1].id;
        responseData.users.forEach((d)=>{d.isLastChild = (d.id == lastId) });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.users),
          loaded: true,
        });
      })
      .done();
  }

  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    console.log(this.props);
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderUserCell.bind(this)}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          加载中，请稍后...
        </Text>
      </View>
    );
  }



  renderUserCell(user) {

    return (
      <UserCell
        onSelect={this.goDialogView.bind(this,user)}
        user={user}
        lastChild={user.isLastChild}/>
    );
  }

  goDialogView(user){
    if(user.id == -1){ //
      this.props.navigator.push({
        screen: 'Users.Add',
        title: '新的朋友',
      });
    }else { //regular
      this.props.navigator.push({
        screen: 'Main.Dialog.Single',
        title: user.username,
      });
    }


  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    flex: 1,
    backgroundColor: '#FFF',
    overflow:'visible',
    height: 587,
    // alignSelf: 'stretch',
  },
});

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
