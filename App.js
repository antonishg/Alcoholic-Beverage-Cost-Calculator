
import React, {Component} from 'react';

import {createStackNavigator} from 'react-navigation';

import Home from './containers/home';
import Results from './containers/results'

const App = createStackNavigator ({
  Home: { screen: Home },
  Results: { screen: Results }
});

export default App;
