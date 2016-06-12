import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import COLORS from '../common/colors';

export default class Hr extends React.Component {
  render(){
    return (<View style={STYLES.hr}></View>)
  }
}

var styles_obj = {

  hr:{
    marginLeft:15,
    borderTopWidth: 0.5,
    height:0,
    borderTopColor: COLORS.COMMON_GRAY,
  },
};
var STYLES = StyleSheet.create(styles_obj);
