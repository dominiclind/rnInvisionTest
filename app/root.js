import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { observer } from 'mobx-react/native';


// get screens
import Cards from 'app/screens/Cards'; 

@observer
class Root extends Component {
  render () {
    return (
      <Cards />
    );
  }
}

export default Root;
