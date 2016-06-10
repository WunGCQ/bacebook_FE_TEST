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
import ICONS from '../../common/icons';



var lastId = null;
export default class DialogSingle extends Component {

  static navigatorStyle = naviStyle;

  constructor(props) {
    super(props);
  }


  render() {
    if(this.props.user.id == global.SELF.id){
        return this.me(meStyleObj);
    }
    else {
      return this.other(otherStyleObj);
    }
  }

  me(S){
    let M = Object.assign({},this.props);
    var dateObj = new Date(M.time);
    var time = dateObj.toLocaleTimeString();
    var date = dateObj.toLocaleDateString();

    return (
      <View style={{flex:1}}>
        <Text style={S.time}>{date} {time}</Text>
        <View style={S.message}>
          <View style={S.left}>
            {this.content(S,M)}
            <Image source={ICONS.Dialog.ARROW.GREEN.RIGHT} style={S.arrow}/>
          </View>
          <View style={S.right}>
            <View style={S.avatar_wrapper}>
              <Image
                source={{uri: M.user.avatar}}
                style={S.avatar}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }

  other(S){
    let M = Object.assign({},this.props);
    var dateObj = new Date(M.time);
    var time = dateObj.toLocaleTimeString();
    var date = dateObj.toLocaleDateString();

    return (
      <View style={{flex:1}}>
        <Text style={S.time}>{date} {time}</Text>
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
            <Image source={ICONS.Dialog.ARROW.WHITE.LEFT} style={S.arrow}/>
            {this.content(S,M)}
          </View>
        </View>
      </View>
    )
  }

  content(S,M){
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

var otherStyle = {
  message: {
    marginTop: 6,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    width: Dimensions.get('window').width,
    overflow: 'visible',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
  },
  time:{
    color: COLORS.COMMON_GRAY,
    fontSize: 9,
    paddingTop: 6,
    paddingBottom: 0,
    textAlign: 'center',
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
  arrow:{
    position: 'absolute',
    width: 18,
    height: 18,
    left:-10,
    top: 7,
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
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
  },

  img: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    flex:1,
    marginLeft: 10,
    marginRight: 8,
    marginTop: 7,
    marginBottom: 9,
    alignSelf: 'stretch',
  },
};

var meStyle = {
  message: {
    flex: 1,
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    width: Dimensions.get('window').width,
    overflow: 'hidden',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
  },
  time:{
    color: COLORS.COMMON_GRAY,
    fontSize: 9,
    paddingTop: 6,
    paddingBottom: 0,
    textAlign: 'center',
  },
  right: {
    // flex : 1,

    width: 55,
    alignSelf: 'flex-start',
  },
  left: {
    flex: 1,
    marginLeft:80,
    alignSelf: 'flex-start',
  },
  arrow:{
    position: 'absolute',
    width: 18,
    height: 18,
    right: -8,
    top: 7,
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
    alignSelf: 'flex-end',
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
    borderRadius: 4,
    alignSelf: 'flex-end',
    backgroundColor: COLORS.GREEN,
  },

  img: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    flex:1,
    marginLeft: 10,
    marginRight: 8,
    marginTop: 7,
    marginBottom: 9,
    alignSelf: 'stretch',
  },
};

var otherStyleObj = Object.assign({}, otherStyle);
var meStyleObj = Object.assign({}, meStyle);



// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
