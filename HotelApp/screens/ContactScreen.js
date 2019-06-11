import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Linking
} from 'react-native';
import { SocialIcon } from 'react-native-elements';

export default class ContactScreen extends React.Component {
  static navigationOptions = {
    title: 'Contact Us'
  };

  constructor(props) {
    super(props);
    this.state = {
      HotelTitle: ''
    };
  }

  componentWillMount() {}

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'stretch'
            }}
          >
            <Text
              style={{
                alignSelf: 'center',
                marginBottom: '2%',
                fontSize: 20,
                fontStyle: 'italic',
                fontWeight: 'bold'
              }}
            >
              Web:
            </Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  'https://www.riu.com/en/hotel/costa-rica/guanacaste/hotel-riu-palace-costa-rica/index.jsp?utm_source=google&utm_medium=organic&utm_campaign=my_business&utm_content=XCR#rooms-grid'
                );
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: 'royalblue',
                  fontStyle: 'italic',
                  marginBottom: '2%'
                }}
              >
                Go to our official website and see all our facilities
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 20,
                fontStyle: 'italic',
                fontWeight: 'bold',
                marginBottom: '2%'
              }}
            >
              e-mail:{' '}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 14,
                fontStyle: 'italic',
                color: 'royalblue',
                marginBottom: '2%'
              }}
            >
              crm@riu.com
            </Text>
          </View>
        </View>

        <SocialIcon
          style={{ alignSelf: 'center' }}
          type="facebook"
          onPress={() => {
            Linking.openURL(
              'https://www.facebook.com/pages/Riu-Hotel-Resort-Guanacaste/116391728461953'
            );
          }}
        />

        <SocialIcon
          style={{ alignSelf: 'center' }}
          type="twitter"
          onPress={() => {
            Linking.openURL('https://twitter.com/RiuHoteles');
          }}
        />
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
  }
});
