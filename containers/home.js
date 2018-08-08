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
          Keyboard,
          ActivityIndicator
        } from 'react-native';

import {createStackNavigator} from 'react-navigation';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import styles from '../stylesheets/index'

class Home extends React.Component {

  static navigationOptions = {
      headerStyle: { backgroundColor: '#F2FFFF', borderBottomWidth: 0 }
  }

  constructor(props){
      super(props);
      this.state = { bottlePrice: '', bottleSize: '', pourAmount: '', liquorCostPercentage: '' , beverageCost: '', loading: false};
  }


  calculate = () => {

    const { navigate } = this.props.navigation;

    let bottlePrice = this.state.bottlePrice
    let bottleSize = this.state.bottleSize
    let liquorCostPercentage = this.state.liquorCostPercentage
    let pourAmount = this.state.pourAmount
    let beverageCost = this.state.beverageCost

    if(bottleSize === '' || bottlePrice === '' || pourAmount === '' || liquorCostPercentage === ''){
      return Alert.alert('Fill out all fields')
    }

    if(liquorCostPercentage > 100){
      return Alert.alert('Please enter a valid liquor cost percentage')
    }

    this.setState({loading: true})

    // making the POST request to the server
    return fetch('http://localhost:8080/api/calculate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bottleSize: bottleSize,
          bottlePrice: bottlePrice,
          pourAmount: pourAmount,
          liquorCostPercentage: liquorCostPercentage
        })
      })
    // returns a promise - once the promise is resolved we proceed with the rest of the
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({loading: false})
      beverageCost = responseJson.beverageCost
      navigate('Results', {beverageCost, liquorCostPercentage, bottleSize, bottlePrice, pourAmount})
      return responseJson;
    })

    .catch((error) => {
      return Alert.alert('There was an error! Try again later.')
      console.error('error! ', error);
    });

  }

  clearForm = () => {
    this.setState({bottlePrice: '', pourAmount: '', liquorCostPercentage: ''})
  }

  render() {
    var sizeOptions = [
      {label: '750ml ', value: 750 },
      {label: '1000ml', value: 1000 },
      {label: '1750ml', value: 1750 }
    ];

    if(this.state.loading){ // load an Activity Indicator while waiting for response
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
          <View style = {styles.container}>
            <KeyboardAvoidingView contentContainerStyle = {styles.container} behavior="position">
              <Image
                style = {styles.image}
                source = {require('../assets/logo.png')}/>
              <Text style={styles.plainText}>Fill the form and we can tell you how much you should be charging for any cocktail</Text>
              <RadioForm style = {styles.radioForm}
                radio_props = {sizeOptions}
                initial = {-1}
                buttonColor = '#000000'
                selectedButtonColor = '#000000'
                labelColor = '#000000'
                formHorizontal = {true}
                labelHorizontal = {false}
                labelStyle = {styles.radioText}
                onPress = { (value) => { this.setState({ bottleSize: value }) } }/>

              <View style={{flexDirection:'row', alignItems:'center'}}>
                <TextInput style = {styles.textInput}
                  onChangeText = { (bottlePrice) => this.setState({bottlePrice})  }
                  keyboardType= 'phone-pad'
                  placeholder = 'price of your bottle'
                  placeholderTextColor = '#808080'
                  value = {this.state.bottlePrice}/>
                  <Text style={styles.unitText}>$    </Text>
              </View>

              <View style={{flexDirection:'row', alignItems:'center'}}>
                <TextInput style = {styles.textInput}
                  onChangeText = { (pourAmount) => this.setState({pourAmount}) }
                  keyboardType= 'phone-pad'
                  placeholder = 'fluid oz. of alcohol per beverage'
                  placeholderTextColor = '#808080'
                  value = {this.state.pourAmount}/>
                <Text style={styles.unitText}>fl.oz</Text>
              </View>

              <View style={{flexDirection:'row', alignItems:'center'}}>
                <TextInput style = {styles.textInput}
                  onChangeText = { (liquorCostPercentage) => this.setState({liquorCostPercentage}) }
                  keyboardType= 'phone-pad'
                  placeholder = 'your liquor cost point'
                  placeholderTextColor = '#808080'
                  value = {this.state.liquorCostPercentage}/>
                <Text style={styles.unitText}>%    </Text>
              </View>

              <View style = {styles.rowContainer}>
                <TouchableOpacity
                  style = {styles.actionBttns}
                  onPress = { this.calculate }>
                  <Text style = {{ fontFamily: 'AvenirNext-Regular', fontSize: 22, color: '#000000' }}>Calculate</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style = {styles.actionBttns}
                  onPress = { this.clearForm }>
                  <Text style = {{ fontFamily: 'AvenirNext-Regular', fontSize: 22, color: '#000000' }}>Clear</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>

      );
    }
  }

module.exports = Home;
