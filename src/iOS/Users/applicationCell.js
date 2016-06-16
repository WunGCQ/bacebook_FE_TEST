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
  TouchableHighlight,
} from 'react-native';

import COLORS from '../../common/colors';
import ICONS from '../../common/icons';



export default class UserListCell extends Component {
  render(){
    const D = this.props.user;
    return (
      <View style={this.props.lastChild?S.lastChild:S.container}>
        <View style={S.avatar_wrapper}>
          <Image
            source={ICONS.AVATAR[D.head_id]}
            style={S.avatar}
          />
        </View>
        <View style={S.rightContainer}>
          <Text style={S.username}>{D.username}</Text>
        </View>
        {this.btn()}
      </View>
    )
  }

  btn(){
    const { status } = this.props.user;
    if( status == 'accepted') {
      return (
        <TouchableHighlight style={S.accepted_button}>
          <Text style={S.accepted_button_text}>已添加</Text>
        </TouchableHighlight>
      )
    } else if ( status == 'rejected') {
      return (
        <TouchableHighlight style={S.rejected_button}>
          <Text style={S.rejected_button_text}>添加</Text>
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableHighlight style={S.waiting_button}>
          <Text style={S.waiting_button_text}>接受</Text>
        </TouchableHighlight>
      )
    }
  }
}

var STYLE_ORIGIN = {
  container: {
    flex: 1,
    height: 65,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: COLORS.COMMON_GRAY,
  },
  lastCell: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.COMMON_GRAY,
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  username: {
    fontSize: 18,
    marginBottom: 2,
    marginTop: 0,
    textAlign: 'left',
  },
  overview: {
    fontSize: 14,
    textAlign: 'left',
    color: COLORS.COMMON_GRAY,
  },
  avatar_wrapper: {
    width: 45,
    height: 45,
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  avatar:{
    height: 45,
    width: 45,
  },
  btn: {
    position: 'absolute',
    right: 15,
    top: 22,
    width: 55,
    height: 28,
    borderRadius: 4,
    overflow: 'hidden',
  },
  btn_text: {
    fontSize: 12,
    textAlign:'center',
    lineHeight:20,
  }

};
STYLE_ORIGIN.lastChild = Object.assign({},STYLE_ORIGIN.container,STYLE_ORIGIN.lastCell);
STYLE_ORIGIN.accepted_button = Object.assign({},STYLE_ORIGIN.btn,{
  backgroundColor: 'transparent',
});
STYLE_ORIGIN.accepted_button_text = Object.assign({},STYLE_ORIGIN.btn_text,{
  color: COLORS.DARK_GRAY,
});
STYLE_ORIGIN.rejected_button = Object.assign({},STYLE_ORIGIN.btn,{
  backgroundColor: '#eee',
  borderWidth: 0.5,
  borderColor: COLORS.COMMON_GRAY,
});
STYLE_ORIGIN.rejected_button_text = Object.assign({},STYLE_ORIGIN.btn_text,{
  color: '#666',
});
STYLE_ORIGIN.waiting_button = Object.assign({},STYLE_ORIGIN.btn,{
  backgroundColor: COLORS.ACTIVE_ICON_COLOR,
});
STYLE_ORIGIN.waiting_button_text = Object.assign({},STYLE_ORIGIN.btn_text,{
  color: '#fff',
});
var S = StyleSheet.create(STYLE_ORIGIN);
