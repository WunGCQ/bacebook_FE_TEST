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
  TextInput,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import naviStyle from '../../common/navigatorStyle';
import ApplicationCell from './applicationCell';

import config from '../../../config';
import ICONS from '../../common/icons';
import COLORS from '../../common/colors';

const REQUEST_URL = config.rootUrl+'/users/friendships';

var lastId = null;

export default class UserAdd extends Component {

  static navigatorStyle = naviStyle;

  constructor(props) {
    super(props);
    this.state = {
      addUser: null,
      id:'',
      loaded: true,
    };
  }

  componentDidMount() {
  }

  render() {

    return (
      <View style={S.container}>
        <View style={S.input_wrapper}>
          <TextInput
            style={S.input_blur}
            onChangeText={this.setId.bind(this)}
            keyboardType='default'
            keyboardAppearance='default'
            placeholder="请输入用户的BackBook id"
            onSubmitEditing={this.fetchData.bind(this)}
            returnKeyType={'send'}
            value={this.state.id}
            />

          <TouchableHighlight
            style={S.send_btn}
            onPress={this.fetchData.bind(this)}
            underlayColor={COLORS.COMMON_GRAY}>
            <Text style={S.send_btn_text}>{'发送'}</Text>
          </TouchableHighlight>

        </View>
        <View style={S.result_wrapper}>
            {this.result()}
        </View>

      </View>
    );
  }

  result(){
    const { addUser, loaded } = this.state;
    if(!loaded){
      return (<Text style={S.empty_result}>加载中...</Text>)
    }
    else if(!addUser){
      return (<Text style={S.empty_result}>暂无结果</Text>)
    }else{
      return (
        <ApplicationCell user={addUser} onSelect={this.doAdd.bind(this)}/>
      )
    }
  }

  setId(id){
    this.setState({id:id});
  }

  fetchData(){

    if(this.state.id == ''){
      alert('请输入用户Backbook id！');
      return;
    }

    this.setState({loaded:false});

    fetch(REQUEST_URL,{
      method:'POST',
      body: JSON.stringify({
        id:this.state.id,
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData.message == 'success'){
          this.setState({
            addUser: responseData.data,
            loaded: true,
          });
        }
      })
      .done();
  }

  doAdd(){

  }




}

var S = StyleSheet.create({
  container: {
    // flex:1,
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    backgroundColor: '#efefef',
  },
  input_wrapper: {
    // flex:1,
    alignSelf: 'stretch',
    height: 60,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#efefef',
    borderTopWidth: 0.5,
    borderTopColor: COLORS.COMMON_GRAY,
  },
  input_blur: {
    marginLeft: 10,
    marginRight: 65,
    paddingLeft: 8,
    borderRadius: 3,
    height: 30,
    fontSize: 14,
    color : "#000",
    borderColor: COLORS.COMMON_GRAY,
    borderWidth: 0.5,
    backgroundColor: '#fff'
  },
  send_btn: {
    borderWidth: 0.5,
    position: 'absolute',
    right: 10,
    top: 20,
    borderColor: COLORS.COMMON_GRAY,
    borderRadius: 4,
    height: 28,
    width: 50,
  },
  send_btn_text: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.DARK_GRAY,
  },
  result_wrapper: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.COMMON_GRAY,
    backgroundColor:'#fff'
  },
  empty_result: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
    color: COLORS.DARK_GRAY,
  }
});

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
