/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component,
} from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import COLORS from '../../common/colors';

import ICONS from '../../common/icons';

export default class UserHead extends Component {

  constructor(props) {
    super(props);
    let arr = [];
    for(var i in ICONS.AVATAR ){
      arr.push({
        value: i,
        image: ICONS.AVATAR[i]
      });
    }
    this.state = {
      dataSource: arr,
      head_id: global.USER.head_id,
    };

  }

  componentDidMount() {

  }


  render() {
    return (
      <View style={S.wrapper}>
        <View style={{paddingTop:20}}>
          <Text style={S.h1}>点击图片选取头像</Text>
        </View>
        <View
          style={S.pick_list_view}>
          {this.headIcon()}
        </View>
      </View>
    );
  }


  headIcon(){
    return this.state.dataSource.map((head,i)=>{
      var isPicked = (head.value == this.state.head_id);
      return (
        <TouchableHighlight style={ isPicked ? S.head_wrapper_picked: S.head_wrapper} onPress={this.pick.bind(this,head.value)}>
          <Image source={head.image} style={isPicked ? S.head_icon_picked : S.head_icon}/>
        </TouchableHighlight>)
    })

  }

  pick(head_id){
    this.setState({head_id:head_id});
  }

}

var S = StyleSheet.create({
  wrapper:{
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#EFEFEF',
  },
  wrapper_typing:{
    height: Dimensions.get('window').height - 210,
    width: Dimensions.get('window').width,
    flex:1,
    alignSelf:'stretch',
    position:'absolute',
    backgroundColor: '#EFEFEF',
  },
  h1:{
    fontSize: 20,
    textAlign: 'center',
  },
  pick_list_view: {
    flex: 1,

    // HERE ARE THE STYLES
    // IF YOU REMOVE EITHER OF THESE, THINGS WORK AGAIN
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 5,
  },
  head_wrapper: { //平均分为3份，
    margin: 3,
    width: (Dimensions.get('window').width - 4 * 10) /3,
    height: (Dimensions.get('window').width - 4 * 10) /3,
  },
  head_wrapper_picked: { //平均分为3份，
    margin: 3,
    width: (Dimensions.get('window').width - 4 * 10) /3,
    height: (Dimensions.get('window').width - 4 * 10) /3,
    borderWidth: 4,
    borderColor: COLORS.ACTIVE_ICON_COLOR,
  },
  head_icon:{
    width: (Dimensions.get('window').width - 4 * 10) /3,
    height: (Dimensions.get('window').width - 4 * 10) /3,
  },
  head_icon_picked:{
    width: (Dimensions.get('window').width - 4 * 10) /3 - 8,
    height: (Dimensions.get('window').width - 4 * 10) /3 - 8,
  },

});

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
