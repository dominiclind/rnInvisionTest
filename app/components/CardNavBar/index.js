import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


class CardNavBar extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={ styles.component }>
        <Icon
          style={styles.close}
          name="ios-close"
          size={60}
          color="white"
          onPress={this.props.onClose}
        />
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    paddingHorizontal: 20,
    paddingVertical: 5 
  },
  close: {
    backgroundColor: 'transparent'
  }
});


export default CardNavBar
