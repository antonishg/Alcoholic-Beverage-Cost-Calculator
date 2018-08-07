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

class Home extends React.Component {

  static navigationOptions = {
      headerStyle: { backgroundColor: '#F2FFFF', borderBottomWidth: 0 }
  }

  constructor(props){
      super(props);
      this.state = { bottlePrice: '', bottleSize: '', pourAmount: '', liquorCostPercentage: '' , beverageCost: ''};
  }

  appendliquorPercentageField = ({liquorCostPercentage}) => {

    if(!liquorCostPercentage.includes('% ')){
      this.setState({liquorCostPercentage: '% ' + liquorCostPercentage})
    }

    if(liquorCostPercentage === '% '){
      this.setState({liquorCostPercentage: ''})
    }
  }

  calculate = () => {

    const { navigate } = this.props.navigation;

    let bottlePrice = this.state.bottlePrice
    let bottleSize = this.state.bottleSize
    let liquorCostPercentage = this.state.liquorCostPercentage
    let pourAmount = this.state.pourAmount
    let beverageCost = this.state.beverageCost

    if(bottleSize === '' || bottleSize === '' || pourAmount === '' || liquorCostPercentage === ''){
      return Alert.alert('Fill out all fields')
    }

    if(liquorCostPercentage > 100){
      return Alert.alert('Please enter a valid liquor cost percentage')
    }

    if(bottleSize === 750){
      beverageCost = ((bottlePrice/25.4)*pourAmount)/(liquorCostPercentage/100)
    }else if(bottleSize === 1000){
      beverageCost = ((bottlePrice/33.8)*pourAmount)/(liquorCostPercentage/100)
    }else if(bottleSize === 1750){
      beverageCost = ((bottlePrice/59.2)*pourAmount)/(liquorCostPercentage/100)
    }
    beverageCost = Math.round(beverageCost*100)/100 // two decimal places
    navigate('Results', {beverageCost, liquorCostPercentage, bottleSize, bottlePrice, pourAmount})
  }

  clearForm = () => {
    this.setState({bottlePrice: '', bottleSize: '', pourAmount: '', liquorCostPercentage: ''})
  }

  render() {
    var sizeOptions = [
      {label: '750ml ', value: 750 },
      {label: '1000ml', value: 1000 },
      {label: '1750ml', value: 1750 }
    ];

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
