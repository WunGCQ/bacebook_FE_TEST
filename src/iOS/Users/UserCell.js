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
      <TouchableHighlight onPress={this.props.onSelect} underlayColor={COLORS.COMMON_GRAY}>
        <View style={this.props.lastChild?styles.lastChild:styles.container} onPress={()=>this.goDialogView}>
          <View style={styles.avatar_wrapper}>
            <Image
              source={ICONS.AVATAR[D.head_id]}
              style={styles.avatar}
            />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.username}>{D.username}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
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
    fontSize: 16,
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
  }
};
STYLE_ORIGIN.lastChild = Object.assign({},STYLE_ORIGIN.container,STYLE_ORIGIN.lastCell);

var styles = StyleSheet.create(STYLE_ORIGIN);
