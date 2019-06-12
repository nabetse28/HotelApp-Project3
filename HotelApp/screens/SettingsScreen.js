import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Linking,
  AsyncStorage
} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import smart from '../../HotelApp/assets/images/riu.jpg';
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: ''
  };

  state = {
    isLogged: false,
    UserName: '',
    Password: '',
    nUserName: '',
    nPassword: '',
    nAge: '',
    nName: '',
    uConfirmPassword: '',
    uPassword: ''
  };

  componentWillMount() {
    // AsyncStorage.getItem('logged').then(data => {
    //   console.log(data);
    //   this.setState({
    //     isLogged: data
    //   });
    // });
  }

  _deletData = async () => {
    try {
      // await AsyncStorage.setItem('logged', '');
      this.setState({
        isLogged: '0'
      });
    } catch (error) {
      console.log(error);
    }
  };
  _onSignup = () => {
    this.props.navigation.navigate('Register');
  };

  _onUserChange = event => {
    this.setState({
      UserName: event.nativeEvent.text
    });
  };

  _onPasswordChangeUser = event => {
    this.setState({
      uPassword: event.nativeEvent.text
    });
  };

  _onConfirmPasswordChangeUser = event => {
    this.setState({
      uConfirmPassword: event.nativeEvent.text
    });
  };

  _onLogout = () => {
    this.setState({
      nName: '',
      nAge: '',
      nPassword: '',
      nUserName: ''
    });
    this._deletData();
    this.props.navigation.navigate('Home');
  };

  _onPasswordChange = event => {
    this.setState({
      Password: event.nativeEvent.text
    });
  };

  _storeData = async () => {
    try {
      // AsyncStorage.setItem('logged', '1');
      this.setState({
        isLogged: '1'
      });
    } catch (error) {
      console.log(error);
    }
  };

  _getData = async () => {
    AsyncStorage.getItem('logged').then(data => {
      return data;
    });
  };

  _onLogin = () => {
    // console.log(this._getData());
    if (this.state.isLogged == '1') {
      this.props.navigation.navigate('Settings');
    } else {
      console.log(this.state.UserName, this.state.isLogged);

      fetch('http://192.168.1.10:3000/hotel/users/' + this.state.UserName)
        .then(response => response.json())
        .then(responseData => {
          if (responseData[0].Password == this.state.Password) {
            console.log('Password correct');
            this._storeData();
            this.setState({
              nName: responseData[0].Name,
              nAge: responseData[0].Age,
              nPassword: responseData[0].Password,
              nUserName: responseData[0].UserName
            });
            this.props.navigation.navigate('Home');
          } else {
            alert("Your password isn't correct");
          }
        })
        .catch(function(err) {
          alert("Data aren't correct");
          console.log(err);
        });
    }
  };

  _onReady = () => {
    if (this.state.confirmPassword == this.state.password) {
      // console.log(
      //   this.state.nAge,
      //   this.state.nName,
      //   this.state.nUserName,
      //   this.state.nPassword
      // );
      var object = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          UserName: this.state.nUserName,
          Age: parseInt(this.state.nAge),
          Name: this.state.nName,
          Password: this.state.uPassword
        })
      };

      fetch('http://192.168.1.10:3000/hotel/users/updatePassword/', object)
        .then(response => response.json())
        .then(responseData => {
          if (responseData) {
            alert('Password changed');
            this.setState({
              uPassword: '',
              uConfirmPassword: ''
            });
            this._onLogout();

            this.props.navigation.navigate('Home');
          }
        })
        .catch(function(err) {
          alert("Couldn't change password");
          console.log(err);
        });
    } else {
      alert("Your password doesn't match with the confirm password, try again");
    }
  };

  render() {
    // console.log(this.state.isLogged);
    if (this.state.isLogged == '1') {
      return (
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{ width: '100%' }}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={false}
          >
            <View style={styles.formContainer}>
              <Text style={styles.textUser}>{'Name: ' + this.state.nName}</Text>
              <Text style={styles.textUser}>
                {'Username: ' + this.state.nUserName}
              </Text>
              <Text style={styles.textUser}>{'Age: ' + this.state.nAge}</Text>
              <TextInput
                style={styles.input}
                onChange={this._onPasswordChangeUser}
                placeholder="Password"
                placeholderTextColor="rgba(225,225,225,0.7)"
                secureTextEntry
              />

              <TextInput
                style={styles.input}
                onChange={this._onConfirmPasswordChangeUser}
                placeholder="Confirm Password"
                placeholderTextColor="rgba(225,225,225,0.7)"
                secureTextEntry
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this._onReady}
              >
                <Text style={styles.buttonText}>READY</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.logoutButton}>
            <TouchableOpacity
              style={styles.buttonLogoutContainer}
              onPress={this._onLogout}
            >
              <Text style={styles.buttonText}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} resizeMode={'contain'} source={smart} />

            <Text style={styles.text}>Login to enjoy...</Text>
          </View>
          <ScrollView
            contentContainerStyle={{ width: '100%' }}
            keyboardShouldPersistTaps="always"
            scrollEnabled={false}
          >
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Username"
                placeholderTextColor="rgba(225,225,225,0.4)"
                onChange={this._onUserChange}
              />

              <TextInput
                style={styles.input}
                onChange={this._onPasswordChange}
                placeholder="Password"
                placeholderTextColor="rgba(225,225,225,0.4)"
                secureTextEntry
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this._onLogin}
              >
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account yet? </Text>
            <TouchableOpacity onPress={this._onSignup}>
              <Text style={styles.signupButton}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
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
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    marginTop: '2%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 40,
    color: 'black',
    fontStyle: 'italic'
  },
  title: {
    fontSize: 40,
    color: 'black',
    marginTop: 10,
    fontStyle: 'italic'
  },
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%'
  },
  logo: {
    marginTop: '2%',
    width: 400,
    height: 200
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
    paddingVertical: 20,
    flexDirection: 'row'
  },
  signupText: {
    color: 'black',
    fontSize: 16,
    fontStyle: 'italic'
  },
  signupButton: {
    color: 'royalblue',
    fontSize: 16,
    fontWeight: '500'
  },
  buttonLogoutContainer: {
    width: 300,
    borderRadius: 25,
    marginVertical: 5,
    paddingVertical: 12,
    backgroundColor: '#FF0000'
  },
  logoutButton: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 25,
    margin: 3,
    flexDirection: 'row'
  },
  textUser: {
    fontSize: 20,
    fontStyle: 'italic'
  }
});
