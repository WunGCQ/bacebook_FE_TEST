

import React, {
  Component,
} from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import COLORS from '../common/colors';
import ICONS from '../common/icons';

export default class Row extends React.Component {

  render(){
    const {align,onPress,arrow} = this.props
    return (
      <TouchableHighlight style={STYLES.list_row} underlayColor={COLORS.COMMON_GRAY} onPress={onPress}>
        <View>
          <Text style={this.textStyle(align)}>{this.props.children}</Text>
          {this.arrow(arrow)}
        </View>
      </TouchableHighlight>
    )
  }

  right(){
    const {arrow} = this.props;
    return (
      <View style={{flex:2, alignSelf:'flex-end', height: 40, }}>
        {this.arrow(arrow)}
      </View>
    );
  }

  arrow(arrow){
    if(arrow){
      return (<Image style={STYLES.row_arrow} source={ICONS.Row.ARROW}/>);
    }else{
      return (<View style={{width:0,height:0}}></View>)
    }

  }

  textStyle(align){
    var obj = Object.assign({},styles_obj.row_text);
    obj.textAlign = align?align:'left';
    if(obj.textAlign == 'center'){
      obj.paddingLeft = 0;
    }
    return obj;
  }
}


var styles_obj = {
  list_row: {
    height: 40,
    backgroundColor: 'transparent',
    position: 'relative'
  },
  hr:{
    marginLeft:15,
    borderTopWidth: 0.5,
    height:0,
    borderTopColor: COLORS.COMMON_GRAY,
  },
  row_text: {
    fontSize: 16,
    color: '#000',
    textAlign:'left',
    lineHeight: 28,
    paddingLeft: 15,
  },
  row_arrow: {
    width: 40,
    height: 40,
    marginTop: 0,
    position:'absolute',
    right: 0,
    top:0,
    tintColor: COLORS.COMMON_GRAY,
  }

};
var STYLES = StyleSheet.create(styles_obj);
