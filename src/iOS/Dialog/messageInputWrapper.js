/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component,
} from 'react';
import {
  Image,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import Dimensions from 'Dimensions';
import naviStyle from '../../common/navigatorStyle';
import COLORS from '../../common/colors';
import ICONS from '../../common/icons';


export default class DialogSingle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      theme: {
        style: S['input_blur'],
      }
    };
  }



  render() {
    return (
      <View style={S.input_wrapper}>
        <TextInput
          {...this.state.theme}
          onFocus={this.setTheme.bind(this,'input_focus')}
          onBlur={this.setTheme.bind(this,'input_blur')}/>
        <TouchableHighlight style={S.send_btn}>
          <Text style={S.send_btn_text}>{'发送'}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={S.send_pic_btn}>
          <Image source={ICONS.Dialog.BUTTON.IMAGE} style={S.send_pic_btn_img}/>
        </TouchableHighlight>
      </View>
    );
  }

  setTheme(className){
    this.setState({theme:{
      style:S[className]
    }})
  }


}


let myStyle = {
    input_wrapper: {
      position: 'absolute',
      bottom: -10 - 45,
      left: 0,
      right: 0,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#efefef',
      borderTopWidth: 0.5,
      borderTopColor: COLORS.COMMON_GRAY,
    },
    input_blur: {
      marginLeft: 10,
      marginRight: 60 + 30,
      paddingLeft: 8,
      borderRadius: 3,
      height: 25,
      fontSize: 12,
      color : COLORS.DARK_GRAY,
      borderColor: COLORS.COMMON_GRAY,
      borderWidth: 0.5,
      backgroundColor: '#fff'
    },
    send_btn: {
      borderWidth: 0.5,
      position: 'absolute',
      right: 10 + 30,
      top: 10,
      borderColor: COLORS.COMMON_GRAY,
      borderRadius: 4,
      height: 25,
      width: 40,
    },
    send_btn_text: {
      textAlign: 'center',
      fontSize: 9,
      lineHeight: 16,
      color: COLORS.DARK_GRAY,
    },
    send_pic_btn: {
      position: 'absolute',
      width: 25,
      height: 25,
      top: 10,
      right: 10,
      overflow: 'hidden',
      borderRadius: 15,
      borderWidth: 0.5,
      borderColor: COLORS.COMMON_GRAY,
      alignItems: 'center',
    },
    send_pic_btn_img: {
      tintColor: COLORS.DARK_GRAY,
      width: 25,
      height: 25,
    }
};

myStyle.input_focus = Object.assign({}, myStyle.input_blur,{ color: '#000'});

var S = StyleSheet.create(myStyle);



// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
