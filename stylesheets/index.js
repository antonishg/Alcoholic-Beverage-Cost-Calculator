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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -20,
    backgroundColor: '#F2FFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain"
  },
  plainText: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 16,
    textAlign: 'center',
    margin: 10
  },
  unitText: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: -10
  },
  radioForm: {
    width: "100%",
    marginTop: 20,
    justifyContent: 'center',
  },
  radioText: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 15,
    padding: 10
  },
  textInput: {
    height: 40,
    width: 300,
    marginTop: 10,
    borderColor: 'black',
    color: 'black',
    fontFamily: 'AvenirNext-Regular',
    textAlign: 'center',
    borderBottomWidth: 0.5,
    fontSize: 15,
  },
  rowContainer: {
    flexDirection: 'row'
  },
  actionBttns: {
    height: 50,
    width: 150,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#F2FFFF',
    padding: 10,
  },
  rowContainer: {
    flexDirection: 'row'
  },
  resultsTextContainer: {
    marginTop: 30,
    marginBottom: 30,
    paddingLeft: 25,
    paddingRight: 25
  },
  resultsText: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  resultsTextBold: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

module.exports = styles;
