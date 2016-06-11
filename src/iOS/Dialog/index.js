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

import Dimensions from 'Dimensions';
import naviStyle from '../../common/navigatorStyle';
import bgImg from '../../common/bg';
import Message from './message';
import MessageInputWrapper from './messageInputWrapper';

var config = require('../../../config.js');

// var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
const REQUEST_URL = config.rootUrl+'/dialog';

var lastId = null;
export default class DialogSingle extends Component {

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
        console.log(responseData.messages);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.messages),
          users: responseData.users,
          loaded: true,
        });
      })
      .done();
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

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }else{
      return (
        <View>
          <Image source={bgImg.DEFAULT} style={styles.bg}/>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderMessage.bind(this)}
            style={styles.listView}
          />
          <MessageInputWrapper/>
        </View>
      )
    }
  }

  renderMessage(M) {
    return (
      <Message {...M} user={this.state.users[M.from]} ></Message>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    position:'relative',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',
  },
  bg: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
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
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',
    height: Dimensions.get('window').height - 125 - 42,
    // overflow:'hidden',
    // alignSelf: 'stretch',
  },
});

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
