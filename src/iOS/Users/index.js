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

const REQUEST_URL = config.rootUrl+'/user/';

var lastId = null;
export default class MainList extends Component {

  static navigatorStyle = naviStyle;

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
        renderRow={this.renderDialogCell.bind(this)}
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



  renderDialogCell(user) {
    return (
      <UserCell
        onSelect={this.goDialogView.bind(this,user.id)}
        dialog={user}
        lastChild={user.isLastChild}/>
    );
  }

  goDialogView(user){
    // console.log(dialog);
    // this.props
    this.props.navigator.push({
      screen: 'Main.Dialog.Single',
      title: user.username,
    });
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
