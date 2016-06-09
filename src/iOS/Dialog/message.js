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
    if(M.contentType== 'text'){
      return (
        <View style={S.text_wrapper}>
          <Text style={S.text}>{M.content}</Text>
        </View>
      )
    }else {
      <View style={S.img_wrapper}>
        <Image
          style={S.img}
          source={{uri: M.content}}
        />
      </View>
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
    flex : 1,
    width: 20,
  },
  right: {
    flex: 2,
    position: 'relative',
    alignSelf: 'stretch',
  },
  text_wrapper: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 6,
    paddingBottom: 8,
    borderRadius: 4,
    backgroundColor: COLORS.GREEN,
  },
  text: {
    fontSize: 12,
    lineHeight: 16,
  }




});

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
