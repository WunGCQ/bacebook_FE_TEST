/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component,
} from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import COLORS from '../../common/colors';

import KeyboardEvents from 'react-native-keyboardevents';
var KeyboardEventEmitter = KeyboardEvents.Emitter;

var user = {login:()=>{}};//fake import

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      typing:false,
      telephone:'',
      password:'',
    };

  }

  componentDidMount() {
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillShowEvent, (frames) => {
      this.setState({typing:true});
    });
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardDidHideEvent, (frames) => {
      this.setState({typing:false});
    });
  }


  render() {
    return (
      <View style={this.getTypingStyle()}>
        <View style={{paddingTop:50}}>
          <Text style={S.h1}>用户登录</Text>
        </View>
        <View  style={S.row} >
          <Text style={S.label} >手机号</Text>
        </View>
        <View  style={S.row} >
          <TextInput
            style={S.input}
             placeholder="输入手机号"
             onChangeText={this.setPhone.bind(this)}
             keyboardType={'default'}></TextInput>
        </View>
        <View style={S.row} >
          <Text style={S.label} >密码</Text>
        </View>
        <View  style={S.row} >
          <TextInput
            style={S.input}
            placeholder="输入密码"
            secureTextEntry={true}
            onChangeText={this.setPassword.bind(this)}
            keyboardType={'default'}
            ></TextInput>
        </View>
        <View style={S.row}>
          <TouchableHighlight
            style={{height:40,borderRadius:4, marginTop: 20,overflow:'hidden',backgroundColor:COLORS.ACTIVE_ICON_COLOR}}
             underlayColor={COLORS.ACTIVE_ICON_COLOR}
             onPress={this.doLogin.bind(this)}>
            <Text style={{lineHeight:28,fontSize:16,color: '#fff',textAlign:'center'}}>登录</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  setPhone(telephone){
    this.setState({telephone: telephone});
  }
  setPassword(password){
    this.setState({password: password});
  }

  getTypingStyle(){
    return this.state.typing? S.wrapper_typing : S.wrapper;
  }

  doLogin(){
    var self = this;
    var {telephone, password} = this.state;

    user.login(telephone, password).done((response)=>{
      self.props.navigator.push({
        screen: 'Main.List',
        title: '聊天',
      })
    });

  }




}

var S = StyleSheet.create({
  wrapper:{
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flex:1,
    alignSelf:'stretch',
    position:'absolute',
    backgroundColor: '#EFEFEF',
  },
  wrapper_typing:{
    height: Dimensions.get('window').height - 210,
    width: Dimensions.get('window').width,
    flex:1,
    alignSelf:'stretch',
    position:'absolute',
    backgroundColor: '#EFEFEF',
  },
  h1:{
    fontSize: 20,
    textAlign: 'center',
  },
  row: {
    paddingLeft: 15,
    paddingTop: 5,
    paddingRight: 15,
    paddingBottom: 5,
  },
  input: {
    height: 35,
    borderWidth: 1,
    borderColor: COLORS.COMMON_GRAY,
    borderRadius: 4,
    paddingLeft: 10,
    marginBottom:5,
    fontSize: 14,
    backgroundColor:'#fff',
  },
  label: {
    textAlign: 'left',
    color: '#666',
    fontSize: 14,
  }
});

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
