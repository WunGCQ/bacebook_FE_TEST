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
  Dimensions,
  Animated,
  Platform,
  PixelRatio,
  AsyncStorage,
} from 'react-native';

import naviStyle from '../../common/navigatorStyle';
import bgImg from '../../common/bg';
import Message from './message';
import MessageInputWrapper from './messageInputWrapper';
import config from '../../../config';
import KeyboardEvents from 'react-native-keyboardevents';
var KeyboardEventEmitter = KeyboardEvents.Emitter;

var REQUEST_URL = config.rootUrl + '/chats/users/';
var ws = new WebSocket(config.chatHost);

var lastId = null;


export default class DialogSingle extends Component {

  static navigatorStyle = naviStyle;

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      text: '',
      image: null,
      loaded: false,
      typing: false,
      layout: null,
    };
  }

  scrollToBottom(animated = null) {
    if (this._listHeight && this._footerY && this._footerY > this._listHeight) {
      let scrollDistance = this._listHeight - this._footerY;
      if (this.props.typingMessage) {
        scrollDistance -= 44;
      }

      this.scrollResponder.scrollTo({
        y: -scrollDistance,
        x: 0,
        animated: typeof animated === 'boolean' ? animated : this.props.scrollAnimated,
      });
    }
  }

  componentDidMount() {
    this.fetchData();
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillShowEvent, (frames) => {
      this.setState({typing: true});
    });
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardDidHideEvent, (frames) => {
      this.setState({typing: false});
    });

  }

  fetchData() {
    fetch(REQUEST_URL + this.props.user_id, {
      headers: {
        Authorization: global.USER.token,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        //responseData.data = Object.keys(responseData.data).length == 0 ? [] : responseData.data;
        this.setState({
          originData: responseData.data || [],
          dataSource: this.state.dataSource.cloneWithRows(responseData.data || []),
          users: responseData.users,
          loaded: true,
        });
        console.log(this.state.originData);
      })
      .done(()=> {
        this.setHistory();
      });
  }

  setHistory() {
    AsyncStorage.getItem('dialogs', (dialogsStr)=> {
      console.log(dialogsStr);
      if (!dialogsStr || dialogsStr.length == 0) {
        dialogsStr = "[]";
      }

      var dialogs = JSON.parse(dialogsStr);

      var dialogIndex = dialogs.findIndex((dialog)=> {
        return dialog.from.id == this.props.user_id;
      });

      if (dialogIndex == -1) {
        dialogs.push({
          id: this.props.user_id,
          group: false,
          from: {
            id: this.props.user_id,
            username: this.props.username,
            head_id: this.props.head_id,
          },
          overview: this.state.originData.length == 0 ? '暂无消息' : this.state.originData[this.state.originData.length - 1].content,
          lastTime: this.state.originData.length == 0 ? new Date() : this.state.originData[this.state.originData.length - 1].created_at,
        });
      }
      else {
        dialogs[dialogIndex].overview = this.state.originData.length == 0 ? '暂无消息' : this.state.originData[this.state.originData.length - 1].content;
        dialogs[dialogIndex].lastTime = this.state.originData.length == 0 ? new Date() : this.state.originData[this.state.originData.length - 1].created_at;
      }
      console.log(dialogs);
      AsyncStorage.setItem('dialogs', JSON.stringify("123"), (res)=> {
        //alert(res);
        AsyncStorage.getItem('dialogs', (dialogsStr)=> {
          console.log(dialogsStr);
        });
      });

    })
  }

  renderLoadingView() {
    return (
      <View >
        <Image source={bgImg.DEFAULT} style={styles.bg}/>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    } else {
      return (
        <View >
          <Image source={bgImg.DEFAULT} style={styles.bg}/>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderMessage.bind(this)}
            onLayout={this.setHeight.bind(this)}
            style={!this.state.typing?styles.listView:styles.listViewTyping}
            ref='scrollView'
          />
          <MessageInputWrapper
            sendText={this.sendText.bind(this)}
            setText={this.setText.bind(this)}
            value={this.state.text}
            addImageMessage={this.addImageMessage.bind(this)}
          />
        </View>
      )
    }
  }

  setHeight(e) {
    var {x, y, width, height} = e.nativeEvent.layout;
    var h = Dimensions.get('window').height - 125 - 70 - (!this.state.typing ? 210 : 0);
    this.setState({layout: e.nativeEvent.layout});
    this.refs.scrollView.scrollTo({y: h, animated: false});
  }

  renderMessage(M) {
    return (
      <Message
        {...M}
        user={M.id==this.props.user_id? this.props : global.USER}
      />
    );
  }

  setText(text) {
    this.setState({text: text});
  }

  sendRequest(text) {
    fetch('http://m.me/message', {
      method: 'POST',
      body: JSON.stringify({text: text})
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          text: ''
        });
        this.scrollTo({y: 0});
      })
      .done();
  }

  sendText() {
    if (this.state.text.length > 0) {
      // alert(`send text : ${this.state.text}`);
      ws.send(this.state.text);
      console.log(this.props);
      fetch(config.rootUrl + '/chats/users/' + this.props.user_id, {
        method: 'POST',
        headers: {
          Authorization: global.USER.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "content": this.state.text
        })
      }).then((response) => response.json())
        .then((responseData) => {
          if (responseData.message == 'success') {
            console.log(responseData);
          } else {
            alert(responseData.message);
          }
        }).done(this.addMessage.bind(this));
    } else {
      alert('请输入内容！');
    }
    // this.sendRequest(this.state.text);
  }

  sendImage() {

  }

  addMessage(text = this.state.text) {
    var obj = {
      from: global.USER.id,
      contentType: 'text',
      content: text,
      time: new Date().getTime(),
    };
    var messages = this.state.originData.concat();
    messages.push(obj);
    this.setState({
      originData: messages,
      dataSource: this.state.dataSource.cloneWithRows(messages),
      text: '',
    });
    this.setHistory();

  }

  addImageMessage(imageURI) {
    var obj = {
      from: global.USER.id,
      contentType: 'image',
      content: imageURI,
      time: new Date().getTime(),
    };
    var messages = this.state.originData.concat();
    messages.push(obj);
    this.setState({
      originData: messages,
      dataSource: this.state.dataSource.cloneWithRows(messages),
      text: '',
    });
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
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
  listViewTyping: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',
    height: Dimensions.get('window').height - 125 - 42 - 210,
    // overflow:'hidden',
    // alignSelf: 'stretch',
  },
});

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
