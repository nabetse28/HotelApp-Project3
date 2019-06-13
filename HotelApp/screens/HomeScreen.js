import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Linking
} from 'react-native';
import { Card, ListItem, Icon, SocialIcon } from 'react-native-elements';
import SanityClient from '@sanity/client';
import Slideshow from 'react-native-image-slider-show';

const client = SanityClient({
  projectId: '102sza00',
  dataset: 'hotel',
  useCdn: true
});

const queryHotel =
  '*[_type =="hotel"]{title, description, welcome, "url": photos[0...7].asset->url}';

const queryRoom =
  '*[_type =="room"]{title, description, "url": photo.asset->url}';
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'HOTEL RIU PALACE COSTA RICA'
  };

  constructor(props) {
    super(props);
    this.state = {
      HotelTitle: '',
      HotelWelcome: '',
      HotelDescription: '',
      HotelPhotos: [
        'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiD8KzPguLiAhWStlkKHQE6BesQjRx6BAgBEAU&url=https%3A%2F%2Fwww.cvent.com%2Fvenues%2Fguanacaste%2Fresort%2Fhotel-riu-palace-costa-rica%2Fvenue-35599d5a-cd33-4a61-8b81-e2d1b7b54a0e&psig=AOvVaw1LZfugecbG02mIzOlS69Ry&ust=1560362817244608',
        'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiD8KzPguLiAhWStlkKHQE6BesQjRx6BAgBEAU&url=https%3A%2F%2Fwww.cvent.com%2Fvenues%2Fguanacaste%2Fresort%2Fhotel-riu-palace-costa-rica%2Fvenue-35599d5a-cd33-4a61-8b81-e2d1b7b54a0e&psig=AOvVaw1LZfugecbG02mIzOlS69Ry&ust=1560362817244608',
        'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiD8KzPguLiAhWStlkKHQE6BesQjRx6BAgBEAU&url=https%3A%2F%2Fwww.cvent.com%2Fvenues%2Fguanacaste%2Fresort%2Fhotel-riu-palace-costa-rica%2Fvenue-35599d5a-cd33-4a61-8b81-e2d1b7b54a0e&psig=AOvVaw1LZfugecbG02mIzOlS69Ry&ust=1560362817244608',
        'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiD8KzPguLiAhWStlkKHQE6BesQjRx6BAgBEAU&url=https%3A%2F%2Fwww.cvent.com%2Fvenues%2Fguanacaste%2Fresort%2Fhotel-riu-palace-costa-rica%2Fvenue-35599d5a-cd33-4a61-8b81-e2d1b7b54a0e&psig=AOvVaw1LZfugecbG02mIzOlS69Ry&ust=1560362817244608',
        'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiD8KzPguLiAhWStlkKHQE6BesQjRx6BAgBEAU&url=https%3A%2F%2Fwww.cvent.com%2Fvenues%2Fguanacaste%2Fresort%2Fhotel-riu-palace-costa-rica%2Fvenue-35599d5a-cd33-4a61-8b81-e2d1b7b54a0e&psig=AOvVaw1LZfugecbG02mIzOlS69Ry&ust=1560362817244608',
        'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiD8KzPguLiAhWStlkKHQE6BesQjRx6BAgBEAU&url=https%3A%2F%2Fwww.cvent.com%2Fvenues%2Fguanacaste%2Fresort%2Fhotel-riu-palace-costa-rica%2Fvenue-35599d5a-cd33-4a61-8b81-e2d1b7b54a0e&psig=AOvVaw1LZfugecbG02mIzOlS69Ry&ust=1560362817244608',
        'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiD8KzPguLiAhWStlkKHQE6BesQjRx6BAgBEAU&url=https%3A%2F%2Fwww.cvent.com%2Fvenues%2Fguanacaste%2Fresort%2Fhotel-riu-palace-costa-rica%2Fvenue-35599d5a-cd33-4a61-8b81-e2d1b7b54a0e&psig=AOvVaw1LZfugecbG02mIzOlS69Ry&ust=1560362817244608'
      ],
      rooms: [
        {
          title: '',
          description: '',
          url:
            'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiD8KzPguLiAhWStlkKHQE6BesQjRx6BAgBEAU&url=https%3A%2F%2Fwww.cvent.com%2Fvenues%2Fguanacaste%2Fresort%2Fhotel-riu-palace-costa-rica%2Fvenue-35599d5a-cd33-4a61-8b81-e2d1b7b54a0e&psig=AOvVaw1LZfugecbG02mIzOlS69Ry&ust=1560362817244608'
        },
        {
          title: '',
          description: '',
          url:
            'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiD8KzPguLiAhWStlkKHQE6BesQjRx6BAgBEAU&url=https%3A%2F%2Fwww.cvent.com%2Fvenues%2Fguanacaste%2Fresort%2Fhotel-riu-palace-costa-rica%2Fvenue-35599d5a-cd33-4a61-8b81-e2d1b7b54a0e&psig=AOvVaw1LZfugecbG02mIzOlS69Ry&ust=1560362817244608'
        },
        {
          title: '',
          description: '',
          url:
            'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiD8KzPguLiAhWStlkKHQE6BesQjRx6BAgBEAU&url=https%3A%2F%2Fwww.cvent.com%2Fvenues%2Fguanacaste%2Fresort%2Fhotel-riu-palace-costa-rica%2Fvenue-35599d5a-cd33-4a61-8b81-e2d1b7b54a0e&psig=AOvVaw1LZfugecbG02mIzOlS69Ry&ust=1560362817244608'
        },
        {
          title: '',
          description: '',
          url:
            'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiD8KzPguLiAhWStlkKHQE6BesQjRx6BAgBEAU&url=https%3A%2F%2Fwww.cvent.com%2Fvenues%2Fguanacaste%2Fresort%2Fhotel-riu-palace-costa-rica%2Fvenue-35599d5a-cd33-4a61-8b81-e2d1b7b54a0e&psig=AOvVaw1LZfugecbG02mIzOlS69Ry&ust=1560362817244608'
        },
        {
          title: '',
          description: '',
          url:
            'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiD8KzPguLiAhWStlkKHQE6BesQjRx6BAgBEAU&url=https%3A%2F%2Fwww.cvent.com%2Fvenues%2Fguanacaste%2Fresort%2Fhotel-riu-palace-costa-rica%2Fvenue-35599d5a-cd33-4a61-8b81-e2d1b7b54a0e&psig=AOvVaw1LZfugecbG02mIzOlS69Ry&ust=1560362817244608'
        }
      ]
    };
  }

  componentWillMount() {
    client.fetch(queryHotel).then(hotel => {
      let arrayPhotos = [];
      hotel[0].url.forEach(photo => {
        arrayPhotos.push(photo);
      });

      this.setState({
        HotelTitle: hotel[0].title,
        HotelDescription: hotel[0].description,
        HotelWelcome: hotel[0].welcome,
        HotelPhotos: arrayPhotos
      });
    });
    client.fetch(queryRoom).then(rooms => {
      var resultRooms = [];
      rooms.forEach(room => {
        resultRooms.push(room);
      });
      this.setState({
        rooms: resultRooms
      });
      // console.log(resultRooms);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          scrollEnabled={true}
          style={{
            marginBottom: '5%'
          }}
        >
          <Text style={styles.welcome}>{this.state.HotelWelcome}</Text>
          <View
            style={{
              marginTop: '2%',
              borderBottomColor: 'black',
              borderBottomWidth: 1
            }}
          />
          <Text style={styles.textDescription}>
            {this.state.HotelDescription}
          </Text>
          <Slideshow
            dataSource={[
              { url: this.state.HotelPhotos[0] },
              { url: this.state.HotelPhotos[1] },
              { url: this.state.HotelPhotos[2] },
              { url: this.state.HotelPhotos[3] },
              { url: this.state.HotelPhotos[4] },
              { url: this.state.HotelPhotos[5] },
              { url: this.state.HotelPhotos[6] }
            ]}
          />
          <Text style={styles.rooms}>ROOMS</Text>
          <View
            style={{
              marginTop: '2%',
              borderBottomColor: 'black',
              borderBottomWidth: 1
            }}
          />
          <Card title="Jr. Suite">
            <Image
              source={{ uri: this.state.rooms[0].url }}
              style={styles.image}
            />
            <Text style={styles.cardDescription}>
              {this.state.rooms[0].description}
            </Text>
            <Button
              title="Book Now"
              onPress={() => {
                Linking.openURL(
                  'https://www.riu.com/en/hotel/costa-rica/guanacaste/hotel-riu-palace-costa-rica/index.jsp?utm_source=google&utm_medium=organic&utm_campaign=my_business&utm_content=XCR#rooms-grid'
                );
              }}
            />
          </Card>
          <Card title="Jr. Suite with garden view">
            <Image
              source={{ uri: this.state.rooms[1].url }}
              style={styles.image}
            />
            <Text style={styles.cardDescription}>
              {this.state.rooms[1].description}
            </Text>
            <Button
              title="Book Now"
              onPress={() => {
                Linking.openURL(
                  'https://www.riu.com/en/hotel/costa-rica/guanacaste/hotel-riu-palace-costa-rica/index.jsp?utm_source=google&utm_medium=organic&utm_campaign=my_business&utm_content=XCR#rooms-grid'
                );
              }}
            />
          </Card>
          <Card title="Family Suite (2 Bedrooms)">
            <Image
              source={{ uri: this.state.rooms[2].url }}
              style={styles.image}
            />
            <Text style={styles.cardDescription}>
              {this.state.rooms[2].description}
            </Text>
            <Button
              title="Book Now"
              onPress={() => {
                Linking.openURL(
                  'https://www.riu.com/en/hotel/costa-rica/guanacaste/hotel-riu-palace-costa-rica/index.jsp?utm_source=google&utm_medium=organic&utm_campaign=my_business&utm_content=XCR#rooms-grid'
                );
              }}
            />
          </Card>
          <Card title="Jr. Suite with sea view">
            <Image
              source={{ uri: this.state.rooms[3].url }}
              style={styles.image}
            />
            <Text style={styles.cardDescription}>
              {this.state.rooms[3].description}
            </Text>
            <Button
              title="Book Now"
              onPress={() => {
                Linking.openURL(
                  'https://www.riu.com/en/hotel/costa-rica/guanacaste/hotel-riu-palace-costa-rica/index.jsp?utm_source=google&utm_medium=organic&utm_campaign=my_business&utm_content=XCR#rooms-grid'
                );
              }}
            />
          </Card>
          <Card title="Suite Jacuzzi with sea view">
            <Image
              source={{ uri: this.state.rooms[4].url }}
              style={styles.image}
            />
            <Text style={styles.cardDescription}>
              {this.state.rooms[4].description}
            </Text>
            <Button
              title="Book Now"
              onPress={() => {
                Linking.openURL(
                  'https://www.riu.com/en/hotel/costa-rica/guanacaste/hotel-riu-palace-costa-rica/index.jsp?utm_source=google&utm_medium=organic&utm_campaign=my_business&utm_content=XCR#rooms-grid'
                );
              }}
            />
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
  image: {
    height: 150,
    width: 320,
    alignSelf: 'center'
  },
  cardDescription: {
    marginBottom: '2%',
    marginTop: '2%',
    textAlign: 'justify'
  }
});
