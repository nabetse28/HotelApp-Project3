// 10.5276159
// -85.7491779

import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import smart from '../../HotelApp/assets/images/riu.jpg';

export default class WeatherScreen extends React.Component {
  static navigationOptions = {
    title: 'Weather in Hotel'
  };

  constructor(props) {
    super(props);
    //set value in state for initial date
    this.state = { date: '2019-06-12', summary: '', icon: '', temperature: 0 };
  }

  componentWillMount() {
    this.setState({
      summary: 'Not Searched Yet',
      icon: '03d',
      temperature: 0
    });
  }

  _onDateChange = () => {
    console.log(this.state.date);
  };

  _getWeather = () => {
    console.log(this.state.date);

    console.log(this.state.summary.toUpperCase());

    fetch(
      'https://api.darksky.net/forecast/a3a59ad6a5ccf7360892de9498110836/10.5276159,-85.7491779,' +
        this.state.date +
        'T12:00:00' +
        '?exclude=hourly,minutely,alerts,flags' +
        this.state.UserName
    )
      .then(response => response.json())
      .then(responseData => {
        // cloudy, partly-cloudy-day, clear-day, rain, wind
        console.log(responseData);
        if (responseData.daily.data[0].icon == 'rain') {
          this.setState({
            icon: '09d'
          });
        } else if (responseData.daily.data[0].icon == 'partly-cloudy-day') {
          this.setState({
            icon: '02d'
          });
        } else if (responseData.daily.data[0].icon == 'clear-day') {
          this.setState({
            icon: '01d'
          });
        } else if (responseData.daily.data[0].icon == 'wind') {
          this.setState({
            icon: '50d'
          });
        } else if (responseData.daily.data[0].icon == 'cloudy') {
          this.setState({
            icon: '04d'
          });
        } else {
          this.setState({
            icon: '03d'
          });
        }

        this.setState({
          temperature: Math.round(
            ((responseData.daily.data[0].temperatureHigh - 32) * 5) / 9
          ),
          summary: responseData.currently.summary
        });
        // console.log(responseData);
        // console.log(
        //   'This is the icon we have to use ',
        //   responseData.daily.data[0].icon
        // );
        // console.log(
        //   'This is the termperature in Celcius ',
        //   ((responseData.daily.data[0].temperatureHigh - 32) * 5) / 9
        // );
      })
      .catch(function(err) {
        alert("Data aren't correct");
        console.log(err);
      });
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
            <DatePicker
              style={{ width: 200 }}
              date={this.state.date} //initial date from state
              mode="date" //The enum of date, datetime and time
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2016-01-01"
              maxDate="2022-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={date => {
                this.setState({ date: date });
              }}
            />

            <Card containerStyle={styles.card}>
              <Text style={styles.notes}>{'Hotel Riu Palace'}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{
                    uri:
                      'http://openweathermap.org/img/w/' +
                      this.state.icon +
                      '.png'
                  }}
                />
                <Text style={styles.time}>{'12:00'}</Text>
              </View>

              <Divider
                style={{ backgroundColor: '#dfe6e9', marginVertical: 20 }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text style={styles.notes}>
                  {this.state.summary.toUpperCase()}
                </Text>
                <Text style={styles.notes}>
                  {Math.round(this.state.temperature * 10) / 10}&#8451;
                </Text>
              </View>
            </Card>
          </View>
        </ScrollView>
        <View style={styles.logoutButton}>
          <TouchableOpacity
            style={styles.buttonLogoutContainer}
            onPress={this._getWeather}
          >
            <Text style={styles.buttonText}>WEATHER</Text>
          </TouchableOpacity>
        </View>
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
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%'
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
    backgroundColor: 'rgba(56, 172, 236, 1)'
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
  },
  card: {
    backgroundColor: 'rgba(56, 172, 236, 1)',
    borderWidth: 0,
    borderRadius: 20,
    height: 230,
    width: 300,
    alignSelf: 'center',
    marginTop: '20%'
  },
  time: {
    fontSize: 38,
    color: 'white'
  },
  notes: {
    fontSize: 18,
    textTransform: 'capitalize',
    color: 'white'
  }
});
