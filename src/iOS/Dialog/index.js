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
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Dimensions from 'Dimensions';
import naviStyle from '../../common/navigatorStyle';
import bgImg from '../../common/bg';
import Message from './message';
import MessageInputWrapper from './messageInputWrapper';


// var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
const REQUEST_URL = 'http://m.me/dialog/';

var lastId = null;
export default class DialogSingle extends Component {

  static navigatorStyle = naviStyle;

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      text:'',
      image: null,
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

        this.refs.scrollView.scrollTo({y:200});
        // console.log(this.refs.scrollView);
        // alert(this.refs.scrollView.scrollProperties.contentLength);
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
            ref='scrollView'
          />
          <MessageInputWrapper/>
        </View>
      )
    }
  }

  renderMessage(M) {
    return (
      <Message
        {...M}
        user={this.state.users[M.from]}
        sendText={this.sendText.bind(this)}
        />
    );
  }

  setText(text){
    this.setState({text:text});
  }

  sendRequest(text){
    fetch('http://m.me/message',{
      method:'POST',
      body:JSON.stringify({text:text})
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          text:''
        });
        this.scrollTo({y:0});
      })
      .done();
  }

  sendText(){
    this.sendRequest(this.state.text);
  }

  sendImage(){

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
