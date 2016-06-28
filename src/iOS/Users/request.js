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
import GEVENT from '../../common/GEVENT';

const REQUEST_URL = config.rootUrl+'/users/friendships/applications?history=true';
const ACCEPT_URL = config.rootUrl+"/users/friendships/applications/"
var lastId = null;

export default class UserRequest extends Component {

  static navigatorStyle = naviStyle;

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      id:'',
      loaded: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {

    return (
      <View style={S.container}>

        <ListView
          dataSource={this.state.dataSource}
          style={S.result_wrapper}
          renderRow={this.result.bind(this)}>

        </ListView>

      </View>
    );
  }

  result(M){
      return (
        <ApplicationCell user={M} onSelect={this.doAdd.bind(this,M.id, M.user_id)}/>
      );
  }

  setId(id){
    this.setState({id:id});
  }

  fetchData(){

    this.setState({loaded:false});

    fetch(REQUEST_URL,{
      method:'GET',
      headers: {
        Authorization: global.USER.token,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if(responseData.message == 'success'){
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.data),
            loaded: true,
          });
        }
        else{
          console.log(responseData);
          alert(responseData.message);
        }
      })
      .done();
  }

  doAdd(id){
      fetch(ACCEPT_URL+id,{
        method:'PUT',
        body: JSON.stringify({
          "attitude": "accept"
        }),
        headers: {
          Authorization: global.USER.token,
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((responseData) => {
          if(responseData.message == 'success'){
            alert('添加成功~');
            this.props.navigator.pop();
            GEVENT.emit('users.freshFriendShip');
          }
          else{
            console.log(responseData);
            alert(responseData.message);
          }
        })
        .done();
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
