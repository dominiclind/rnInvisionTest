import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Animated
} from 'react-native';


class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fullscreen : new Animated.Value(0)
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.fullscreen !== this.props.fullscreen) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { fullscreen = false } = this.props;

    if (fullscreen) {
      Animated.spring(this.state.fullscreen, {
        toValue: 1,
        friction: 6,
        tension: 10
      }).start();
    } else {
       Animated.spring(this.state.fullscreen, {
        toValue: 0,
        friction: 6,
        tension: 10
      }).start();
    }
  }

  render() {
   const { fullscreen = false } = this.props;

    const anim = this.state.fullscreen.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -40]
    });
    const animOpacity = this.state.fullscreen.interpolate({
      inputRange: [0, .6, 1],
      outputRange: [1, 0, 0]
    });

    return (
      <Animated.View
        style={[
          styles.component,
          {
            opacity: animOpacity,
            transform: [
              {
                translateY: anim
              }
            ]
          },
          !fullscreen ? { zIndex: 10 } : {}
        ]}
      >
        <Text style={styles.item}>SPACES</Text>
        <Text style={styles.item}>PROTOTYPES</Text>
        <Text style={styles.item}>BOARDS</Text>
        <Text style={styles.item}>FAVORITES</Text>
      </Animated.View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'white',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20
  },
  item: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Menlo',
    padding: 10,
  }
});


export default Header
