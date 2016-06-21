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

import naviStyle from '../../common/navigatorStyle';
import DialogListCell from './DialogCell';

import config from '../../../config';
import GEVENT from '../../common/GEVENT';

const REQUEST_URL = config.rootUrl+'/dialogs/';


var lastId = null;
export default class MainList extends Component {

  static navigatorStyle = naviStyle;

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };

    if(!global.USER){
      this.bindUserEvent.call(this);
    }

  }

  bindUserEvent(){
    GEVENT.on('user.hasLogin',this.fetchData.bind(this));
    GEVENT.on('user.onLogin',()=>{
      // this.props.navigator.switchToTab({
      //   tabIndex: 0 // (optional) if missing, this screen's tab will become selected
      // });
      // this.props.navigator.resetTo({
      //   screen: 'Main.List', // unique ID registered with Navigation.registerScreen
      //   passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
      //   animated: true, // does the push have transition animation or does it happen immediately (optional)
      // });
      this.props.navigator.popToRoot({
        animated: true // does the pop have transition animation or does it happen immediately (optional)
      });
    });

    GEVENT.on('user.notLogin',()=>{
      // this.props.navigator.switchToTab({
      //   tabIndex: 2 // (optional) if missing, this screen's tab will become selected
      // });
      this.props.navigator.push({
        screen: 'User.Login', // unique ID registered with Navigation.registerScreen
        passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
        animated: true, // does the push have transition animation or does it happen immediately (optional)
      });
    });
  }

  componentDidMount() {
    var self = this;

  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        lastId = responseData.dialogs[responseData.dialogs.length - 1].id;
        responseData.dialogs.forEach((d)=>{d.isLastChild = (d.id == lastId) });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.dialogs),
          loaded: true,
        });
      })
      .done();
  }

  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    console.log(this.props);
    return (
      <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderDialogCell.bind(this)}
            style={styles.listView}
          />
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          加载中，请稍后...
        </Text>
      </View>
    );
  }



  renderDialogCell(dialog) {
    return (
      <DialogListCell
        onSelect={this.goDialogView.bind(this,dialog)}
        dialog={dialog}
        lastChild={dialog.isLastChild}/>
    );
  }

  goDialogView(dialog){
    // console.log(dialog);
    this.props.navigator.push({
      screen: 'Main.Dialog.Single',
      title: dialog.from.username,
    });
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    flex: 1,
    backgroundColor: '#FFF',
    overflow:'visible',
    height: 587,
    // alignSelf: 'stretch',
  },
});

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
