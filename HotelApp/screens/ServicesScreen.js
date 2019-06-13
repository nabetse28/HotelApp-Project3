import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';
import SanityClient from '@sanity/client';

const client = SanityClient({
  projectId: '102sza00',
  dataset: 'hotel',
  useCdn: true
});

const queryServices =
  '*[_type =="service"]{title, description, "url": photo.asset->url}';

export default class ServicesScrenn extends React.Component {
  static navigationOptions = {
    title: 'SERVICES INSIDE/OUTSIDE HOTEL'
  };
  constructor(props) {
    super(props);
    this.state = {
      services: [
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
    client.fetch(queryServices).then(services => {
      let resultServices = [];
      services.forEach(service => {
        resultServices.push(service);
      });

      this.setState({
        services: resultServices
      });
      // console.log(resultServices);
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
          <Text style={styles.welcome}>SERVICES IN THE HOTEL</Text>
          <View
            style={{
              marginTop: '2%',
              borderBottomColor: 'black',
              borderBottomWidth: 1
            }}
          />
          <Card title="Spa">
            <Image
              source={{ uri: this.state.services[1].url }}
              style={styles.image}
            />
            <Text style={styles.cardDescription}>
              {this.state.services[1].description}
            </Text>
          </Card>
          <Card title="Tours in the Hotel">
            <Image
              source={{ uri: this.state.services[3].url }}
              style={styles.image}
            />
            <Text style={styles.cardDescription}>
              {this.state.services[3].description}
            </Text>
          </Card>

          <Text style={styles.rooms}>SERVICES OUT THE HOTEL</Text>
          <View
            style={{
              marginTop: '2%',
              borderBottomColor: 'black',
              borderBottomWidth: 1
            }}
          />

          <Card title="Rincon de la Vieja Volcano">
            <Image
              source={{ uri: this.state.services[0].url }}
              style={styles.image}
            />
            <Text style={styles.cardDescription}>
              {this.state.services[0].description}
            </Text>
          </Card>
          <Card title="Rafting">
            <Image
              source={{ uri: this.state.services[2].url }}
              style={styles.image}
            />
            <Text style={styles.cardDescription}>
              {this.state.services[2].description}
            </Text>
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
