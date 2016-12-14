import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions
} from 'react-native';


const { height, width } = Dimensions.get('window');

import Card from 'app/components/Card';


const entries = [
  {
    title: 'Relate UI Kit',
    illustration: 'https://www.sketchappsources.com/resources/source-image/relate-ui-kit-invision.png' 
  },
  {
    title: 'Nike Running',
    illustration: 'https://static.highsnobiety.com/wp-content/uploads/2014/10/nike-winter-2014-running-collection-00.jpg' 
  },
  {
    title: 'Invision Craft',
    illustration: 'https://cdn-images-1.medium.com/max/2000/1*MSeHyxR_Zjk2-k99V7sBMg.jpeg'
  }
]
class CardSlider extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fullscreen: new Animated.Value(0)
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
        friction: 7
      }).start();
    } else {
       Animated.spring(this.state.fullscreen, {
        toValue: 0,
        friction: 10
      }).start();
    }
  }

  render() {
    const { fullscreen = false } = this.props;

    const animVertical = this.state.fullscreen.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0]
    });
    const animHorizontal = this.state.fullscreen.interpolate({
      inputRange: [0, 1],
      outputRange: [30, 0]
    })

    console.log(fullscreen);

    return (
      <View style={ styles.component }>
        <ScrollView 
          horizontal
          pagingEnabled
          style={styles.slider}
          scrollEnabled ={!fullscreen}
          showHorizontal
          showsHorizontalScrollIndicator={false}
        >
        { entries.map((entry,index) => {
          return (
            <Animated.View 
              key={index}
              style={[
                styles.card,
                {
                  paddingHorizontal: animHorizontal,
                  paddingVertical: animVertical
                }
              ]}
            >
              <Card fullscreen={fullscreen} {...entry}/>
            </Animated.View>
          )
        })}
        </ScrollView>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'transparent',
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  slider: {
    width: width, // width - 40
    overflow: 'visible',
    backgroundColor: 'transparent'
  },
  card: {
    width,
    paddingVertical: 100,
    paddingHorizontal: 20
  }
});


export default CardSlider
