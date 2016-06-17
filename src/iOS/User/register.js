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
  ScrollView,
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
    this.props.navigator.setOnNavigatorEvent(()=>{
      this.props.navigator.toggleTabs({
        to: 'shown', // required, 'hidden' = hide navigation bar, 'shown' = show navigation bar
        animated: false // does the toggle have transition animation or does it happen immediately (optional). By default animated: true
      });
    });
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
      <ScrollView style={this.getTypingStyle()}>
        <View>
          <View style={{paddingTop:20}}>
            <Text style={S.h1}>用户注册</Text>
          </View>
          <View  style={S.row} >
            <Text style={S.label} >手机号</Text>
          </View>
          <View  style={S.row} >
            <TextInput
              style={S.input}
               placeholder="输入手机号"
               onChangeText={this.setVal.bind(this,'telephone')}
               keyboardType={'default'}></TextInput>
          </View>
          <View  style={S.row} >
            <Text style={S.label} >昵称</Text>
          </View>
          <View  style={S.row} >
            <TextInput
              style={S.input}
               placeholder="输入昵称"
               onChangeText={this.setVal.bind(this,'nickname')}
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
              onChangeText={this.setVal.bind(this,'password')}
              keyboardType={'default'}
              ></TextInput>
          </View>
          <View style={S.row} >
            <Text style={S.label} >确认密码</Text>
          </View>
          <View  style={S.row} >
            <TextInput
              style={S.input}
              placeholder="确认密码"
              secureTextEntry={true}
              onChangeText={this.setVal.bind(this,'confirm_password')}
              keyboardType={'default'}
              ></TextInput>
          </View>
          <View style={S.row}>
            <TouchableHighlight
              style={{height:40,borderRadius:4, marginTop: 5,overflow:'hidden',backgroundColor:COLORS.ACTIVE_ICON_COLOR}}
               underlayColor={COLORS.ACTIVE_ICON_COLOR}
               onPress={this.doRegsiter.bind(this)}>
              <Text style={{lineHeight:28,fontSize:16,color: '#fff',textAlign:'center'}}>登录</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }

  setVal(key,val){
    var newState= Object.assign({},this.state);
    newState[key] = val;
    this.setState(newState);
  }

  getTypingStyle(){
    return this.state.typing? S.wrapper_typing : S.wrapper;
  }

  doRegsiter(){
    var {telephone,username, password,confirm_password} = this.state;
    alert(telephone);
    fetch(config.rootUrl+'/register',{
      method: 'POST',
      body:JSON.stringify({
        telephone: telephone,
        username: username,
        password: password,
        confirm_password: confirm_password
      }),
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.status == 0){
        alert('注册成功！');
        //user.login() 调用user单例
      } else {
        alert(responseData.message);
        //错误信息
      }
    })
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
