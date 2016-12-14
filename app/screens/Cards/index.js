import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

// get components
import Header from 'app/components/Header';
import TabBar from 'app/components/TabBar';
import CardSlider from 'app/components/CardSlider';


import CardSliderStore from 'app/stores/CardSlider';

@observer
class Cards extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { index, fullscreen } = CardSliderStore;

    return (
      <View style={styles.screen}>
        <Header fullscreen={fullscreen}/>
        <TabBar fullscreen={fullscreen}/>
        <CardSlider fullscreen={fullscreen} />
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  screen : {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch'
  }
});


export default Cards
