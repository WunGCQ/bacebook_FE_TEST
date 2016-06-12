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
  Dimensions,
  Animated,
  Platform,
  PixelRatio,

} from 'react-native';

import naviStyle from '../../common/navigatorStyle';
import COLORS from '../../common/colors';
import ICONS from '../../common/icons';
import ImagePicker from 'react-native-image-picker';



const PICK_IMAGE_OPTION = {
  title: '选择图片', // specify null or empty string to remove the title
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: '从照片库选取', // specify null or empty string to remove this button
  customButtons: {
    'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  },
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  durationLimit: 10, // video recording max time in seconds
  maxWidth: 100, // photos only
  maxHeight: 100, // photos only
  aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 0.2, // 0 to 1, photos only
  angle: 0, // android only, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
    skipBackup: true, // ios only - image will NOT be backed up to icloud
    path: 'images' // ios only - will save image at /Documents/images rather than the root
  }
};

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
          onBlur={this.setTheme.bind(this,'input_blur')}
          onChangeText={this.props.setText}
          keyboardType='default'
          keyboardAppearance='default'
          onSubmitEditing={this.props.sendText}
          returnKeyType={'send'}
          value={this.props.value}
          />

        <TouchableHighlight
          style={S.send_btn}
          onPress={this.props.sendText}
          underlayColor={COLORS.COMMON_GRAY}>
          <Text style={S.send_btn_text}>{'发送'}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={S.send_pic_btn}
          onPress={this.pickImage.bind(this)}
          underlayColor={COLORS.COMMON_GRAY}>
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

  pickImage(){
    ImagePicker.showImagePicker(PICK_IMAGE_OPTION, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data:
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // uri (on iOS)
        // const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // uri (on android)
        // const source = {uri: response.uri, isStatic: true};

        this.setState({
          avatarSource: source
        });
      }
    });
  }


  sendText(){
    this.props.sendText();
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
