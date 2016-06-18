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

export default class ModifyUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      typing:false,
      telephone: global.USER.telephone,
      password: '',
      confirm_password: '',
      username: global.USER.username,
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
               editable={false}
               value={this.state.telephone}
               keyboardType={'default'}></TextInput>
          </View>
          <View  style={S.row} >
            <Text style={S.label} >昵称</Text>
          </View>
          <View  style={S.row} >
            <TextInput
              style={S.input}
               placeholder="输入昵称"
               value={this.state.username}
               onChangeText={this.setVal.bind(this,'username')}
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
              value={this.state.password}
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
              value={this.state.confirm_password}
              secureTextEntry={true}
              onChangeText={this.setVal.bind(this,'confirm_password')}
              keyboardType={'default'}
              ></TextInput>
          </View>
          <View style={S.row}>
            <TouchableHighlight
              style={{height:40,borderRadius:4, marginTop: 5,overflow:'hidden',backgroundColor:COLORS.ACTIVE_ICON_COLOR}}
               underlayColor={COLORS.ACTIVE_ICON_COLOR}
               onPress={this.doModify.bind(this)}>
              <Text style={{lineHeight:28,fontSize:16,color: '#fff',textAlign:'center'}}>修改资料</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={{height:40,borderRadius:4, marginTop: 10,overflow:'hidden',backgroundColor:COLORS.COMMON_GRAY}}
               underlayColor={COLORS.ACTIVE_ICON_COLOR}
               onPress={this.giveUpModify.bind(this)}>
              <Text style={{lineHeight:28,fontSize:16,color: '#fff',textAlign:'center'}}>放弃修改</Text>
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

  doModify(){
    var {telephone,username, password, confirm_password} = this.state;
    var modifyArg = Object.assign({},{
      telephone: telephone,
      username: username,
    });
    if(password.length > 0){
      modifyArg = Object.assign({},modifyArg,{password: password,confirm_password: confirm_password});
    }
    fetch(config.rootUrl+'/users',{
      method: 'POST',
      body:JSON.stringify(modifyArg),
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.message == 'success'){
        alert('修改信息成功~');
        this.props.navigator.pop();
        //user.login() 调用user单例
      } else {
        alert(responseData.message);
        //错误信息
      }
    })
  }

  giveUpModify(){
    this.props.navigator.pop();
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
