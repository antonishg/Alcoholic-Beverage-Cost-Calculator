import React from 'react';
import {  StyleSheet,
          Text,
          View,
          Image,
          TextInput,
          TouchableOpacity,
          Picker,
          Alert,
          KeyboardAvoidingView,
          TouchableWithoutFeedback,
          Keyboard
        } from 'react-native';

import {createStackNavigator} from 'react-navigation';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import styles from '../stylesheets/index'

export default class Results extends React.Component {

  static navigationOptions = {
      headerStyle: { backgroundColor: '#F2FFFF', borderBottomWidth: 0 }
  }

  render(){
    return (
        <View style = {styles.container}>
            <Image
              style = {styles.image}
              source = {require('../assets/logo.png')}/>

            <Text style={styles.resultsTextContainer}>
              <Text style={styles.resultsText}>For a </Text>
              <Text style={styles.resultsTextBold}> {this.props.navigation.getParam('pourAmount', '000')} fl.oz </Text>
              <Text style={styles.resultsText}> pour from a </Text>
              <Text style={styles.resultsTextBold}> {this.props.navigation.getParam('bottleSize', '000')}ml </Text>
              <Text style={styles.resultsText}> bottle that costs</Text>
              <Text style={styles.resultsTextBold}> ${this.props.navigation.getParam('bottlePrice', '000')} </Text>
              <Text style={styles.resultsTextBold}> at {this.props.navigation.getParam('liquorCostPercentage', '000')}%</Text>
              <Text style={styles.resultsText}> liquor cost, </Text>
            </Text>
            <Text style={styles.resultsTextBold}> you should be charging ${this.props.navigation.getParam('beverageCost', '000')} for that cocktail</Text>
        </View>
      );
  }
}
