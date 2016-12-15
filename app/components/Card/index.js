import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated
} from 'react-native';


import CardSlider from 'app/stores/CardSlider';

class Card extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fullscreen : new Animated.Value(0)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.fullscreen !== this.props.fullscreen ||
      nextProps.offset !== this.props.offset
      ) {
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
        friction: 10,
      }).start();
    } else {
       Animated.spring(this.state.fullscreen, {
        toValue: 0,
        friction: 10,
      }).start();
    }
  }

  render() {
    const { title = 'hej', subtitle = 'sub', illustration, fullscreen, offset, index } = this.props;

    const animPos = this.state.fullscreen.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -45]
    });

    const animTitlePos = this.state.fullscreen.interpolate({
      inputRange: [0, .7, 1],
      outputRange: [0, 0,-25]
    });
    const animTitleHeight = this.state.fullscreen.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 42]
    });
    const animTitleMargin = this.state.fullscreen.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 5]
    });
    const animTitleOpac = this.state.fullscreen.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    const animBottomOpac = this.state.fullscreen.interpolate({
      inputRange: [0,.4, 1],
      outputRange: [1, 0 ,0]
    });


    // let realOffset = offset > 0 ? offset - this.props.index : offset;
    // console.log('offset: ',realOffset );

    return (
      <TouchableOpacity
        style={[
          styles.card,
        ]}
        activeOpacity={1}
        onPress={() => CardSlider.fullscreen = !CardSlider.fullscreen}
        >
          <View
            style={[
              styles.imageContainer,
              fullscreen ? {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0
              } : {}
            ]}
          >
            <Image
              source={{ uri: illustration }}
              style={[
                styles.image,
                {
                  transform: [{translateX: (offset - index) * 100 }]
                }
              ]}
            />
            <Animated.View
              style={[
                styles.icon, 
                {
                  transform: [{ translateY: animPos }]
                }
              ]}
            />
            <Animated.View
              style={[
                styles.imageTitle,
                {
                  marginTop: animTitleMargin,
                  opacity: animTitleOpac,
                  height: animTitleHeight,
                  transform: [{ translateY: animTitlePos }]
                }
              ]}
            >
              <Text style={[styles.title, styles.imageText]} numberOfLines={2}>{ title.toUpperCase() }</Text>
              <Text style={[styles.subtitle, styles.imageText]} numberOfLines={2}>{ subtitle }</Text>
            </Animated.View>
          </View>
          <View style={styles.textContainer}>
            <Animated.Text
              style={[
                styles.title,
                {
                  opacity: animBottomOpac,
                }
              ]}
              numberOfLines={2}
            >
              { title.toUpperCase() }
            </Animated.Text>
            <Animated.Text
              style={[
                styles.subtitle,
                {
                  opacity: animBottomOpac
                }
              ]}
              numberOfLines={2}
            >
              { subtitle }
            </Animated.Text>
          </View>
      </TouchableOpacity>
    )
  }
}

const entryBorderRadius = 10;

// styles
const styles = StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: 'transparent',
      shadowColor: 'black',
      shadowOffset : {
        width: 0,
        height: 10
      },
      shadowOpacity : .3,
      shadowRadius : 10,
    },
    imageContainer: {
      height: 320,
      backgroundColor: 'black',
      borderRadius: 0,
      borderTopLeftRadius: entryBorderRadius,
      borderTopRightRadius: entryBorderRadius,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
      opacity: .8,
      borderTopLeftRadius: entryBorderRadius,
      borderTopRightRadius: entryBorderRadius,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      left: -20,
      right: -20
    },
    icon: {
      height: 70,
      width: 70,
      backgroundColor: 'white',
      borderRadius: 8,
      shadowOpacity: .6,
      shadowRadius: 6,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 0
      }
    },
    textContainer: {
      flex: 0.2,
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: 16,
      backgroundColor: 'white',
      borderBottomLeftRadius: entryBorderRadius,
      borderBottomRightRadius: entryBorderRadius
    },
    title: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: 0.5
    },
    subtitle: {
      marginTop: 6,
      color: 'grey',
      fontSize: 12,
      fontStyle: 'italic'
    },
    imageTitle: {
    },
    imageText: {
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'transparent'
    }
});


export default Card
