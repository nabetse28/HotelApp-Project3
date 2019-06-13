import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  AsyncStorage
} from 'react-native';
import { SocialIcon } from 'react-native-elements';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register'
  };

  state = {
    Name: '',
    Age: '',
    UserName: '',
    Password: '',
    ConfirmPassword: ''
  };

  componentWillMount() {}

  _onNameChange = event => {
    this.setState({
      Name: event.nativeEvent.text
    });
  };

  _onUserNameChange = event => {
    this.setState({
      UserName: event.nativeEvent.text
    });
  };

  _onAgeChange = event => {
    this.setState({
      Age: event.nativeEvent.text
    });
  };

  _onPasswordChange = event => {
    this.setState({
      Password: event.nativeEvent.text
    });
  };

  _onConfirmPasswordChange = event => {
    this.setState({
      ConfirmPassword: event.nativeEvent.text
    });
  };

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('logged', '1');
    } catch (error) {
      console.log(error);
    }
  };

  _onSignUp = () => {
    let formdata = {
      UserName: this.state.UserName,
      Age: parseInt(this.state.Age),
      Name: this.state.Name,
      Password: this.state.Password
    };

    // console.log(formdata);
    if (
      this.state.Name &&
      this.state.Age &&
      this.state.UserName &&
      this.state.Password &&
      this.state.ConfirmPassword
    ) {
      if (this.state.Password == this.state.ConfirmPassword) {
        var object = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            UserName: this.state.UserName,
            Age: parseInt(this.state.Age),
            Name: this.state.Name,
            Password: this.state.Password
          })
        };

        fetch('http://192.168.1.11:3000/hotel/users/', object)
          .then(response => response.json())
          .then(responseData => {
            if (responseData) {
              //   this._storeData();
              alert('Put your credentials to Login');
              this.props.navigation.navigate('Settings');
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        alert(
          "Your password doesn't match with the confirm password, try again"
        );
      }
    } else {
      alert('You have to fill all spaces');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ width: '100%' }}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false}
        >
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              autoCorrect={false}
              placeholder="Full Name"
              placeholderTextColor="rgba(225,225,225,0.7)"
              onChange={this._onNameChange}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              autoCorrect={false}
              placeholder="Age"
              placeholderTextColor="rgba(225,225,225,0.7)"
              onChange={this._onAgeChange}
            />

            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Username"
              placeholderTextColor="rgba(225,225,225,0.7)"
              onChange={this._onUserNameChange}
            />

            <TextInput
              style={styles.input}
              ref={input => (this.passwordInput = input)}
              onChange={this._onPasswordChange}
              placeholder="Password"
              placeholderTextColor="rgba(225,225,225,0.7)"
              secureTextEntry
            />

            <TextInput
              style={styles.input}
              ref={input => (this.passwordInput = input)}
              onChange={this._onConfirmPasswordChange}
              placeholder="Confirm Password"
              placeholderTextColor="rgba(225,225,225,0.7)"
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this._onSignUp}
            >
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '50%'
  },
  welcome: {
    marginLeft: '2%',
    marginTop: '2%',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  textDescription: {
    marginTop: '2%',
    marginBottom: '2%',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'justify'
  },
  rooms: {
    marginLeft: '2%',
    marginTop: '15%',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  container: {
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer: {
    marginTop: '2%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%'
  },
  text: {
    fontSize: 40,
    color: 'black'
  },
  title: {
    fontSize: 40,
    color: 'black',
    marginTop: 20
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%'
  },
  logo: {
    width: 250,
    height: 150
  },
  input: {
    width: 300,
    height: 40,
    backgroundColor: 'royalblue',
    color: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 5
  },
  buttonContainer: {
    width: 300,
    borderRadius: 25,
    marginVertical: 5,
    paddingVertical: 12,
    backgroundColor: 'royalblue'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    textAlign: 'center'
  },
  signupContainer: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: 'rgba(225,225,225,0.2)',
    fontSize: 16
  },
  signupButton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500'
  }
});
