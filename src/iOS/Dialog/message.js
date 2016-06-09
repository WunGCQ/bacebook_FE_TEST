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
import COLORS from '../../common/colors';
import Message from './message';



var lastId = null;
export default class DialogSingle extends Component {

  static navigatorStyle = naviStyle;

  constructor(props) {
    super(props);
  }


  render() {
    let M = Object.assign({},this.props);
    return (
      <View style={S.message}>
        <View style={S.left}>
          <View style={S.avatar_wrapper}>
            <Image
              source={{uri: M.user.avatar}}
              style={S.avatar}
            />
          </View>
        </View>
        <View style={S.right}>
          {this.content(M)}
        </View>
      </View>
    )

  }

  content(M){
    if(M.contentType == 'text'){
      return (
        <View style={S.text_wrapper}>
          <Text style={S.text}>{M.content}</Text>
        </View>
      )
    }else {
      return (
        <View style={S.img_wrapper}>
          <Image
            style={S.img}
            source={{uri: M.content}}
          />
        </View>
      )
    }
  }

}

var S = StyleSheet.create({
  message: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    width: Dimensions.get('window').width,
    overflow: 'hidden',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  left: {
    // flex : 1,
    width: 55,
    alignSelf: 'flex-start',
  },
  right: {
    flex: 1,
    marginRight: 75,
    // position: 'relative',
    alignSelf: 'flex-start',
    // backgroundColor: '#000',
  },
  avatar_wrapper: {
    width : 35,
    height: 35,
    marginLeft: 10,
    overflow: 'hidden',
    borderRadius: 1,
  },
  avatar : {
    width: 35,
    height: 35,

  },
  text_wrapper: {
    flex:1,
    overflow: 'hidden',
    borderRadius: 4,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.GREEN,
  },
  text: {
    flex:1,
    fontSize: 13,
    lineHeight: 18,
    marginLeft: 10,
    marginRight: 8,
    marginTop: 7,
    marginBottom: 9,
    alignSelf: 'stretch',
  },

  img_wrapper:{
    flex:1,
    // width: 200,
    // height: 200,
    // overflow: 'hidden',
    borderRadius: 4,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.GREEN,
  },

  img: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    // height: 200,
    flex:1,
    fontSize: 13,
    lineHeight: 18,
    marginLeft: 10,
    marginRight: 8,
    marginTop: 7,
    marginBottom: 9,
    alignSelf: 'stretch',
  },
});

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
