
import React from 'react-native';
const {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    NativeModules,
    NavigatorIOS,
} = React;

export default class RootNav extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style={styles.container}>
          <TouchableHighlight style={styles.button} onPress={()=> this.goDeeper()} underlayColor = "#1b1d9d">
              <Text style={styles.btnText}>We must go deeper</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems : 'center',
    backgroundColor: '#5151f4',
    padding: 10
  },

  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#123456",
    color: "#fff"
  },

  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6,
    textAlign: 'center',
  }
})
