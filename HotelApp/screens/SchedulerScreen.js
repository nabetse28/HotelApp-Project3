import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import SanityClient from '@sanity/client';

const client = SanityClient({
  projectId: '102sza00',
  dataset: 'hotel',
  useCdn: true
});

const queryActivities = '*[_type == "itinerary"]{title,description,hour}';

export default class SchedulerScreen extends React.Component {
  static navigationOptions = {
    title: 'ITINERARY'
  };

  constructor(props) {
    super(props);
    this.state = {
      hotelActivities: ''
    };
  }

  componentWillMount() {
    client.fetch(queryActivities).then(activities => {
      console.log(activities);

      // console.log(activitiesResult);
      this.setState({
        hotelActivities: activities
      });

      // console.log(this.state.hotelActivities);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{'Enjoy the days with us'}</Text>
        <View
          style={{
            marginTop: '2%',
            borderBottomColor: 'black',
            borderBottomWidth: 1
          }}
        />
        <ScrollView
          scrollEnabled={true}
          style={{
            marginBottom: '5%'
          }}
        >
          <FlatList
            data={this.state.hotelActivities}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.flatview}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                  }}
                >
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.text}>{item.hour}</Text>
                </View>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            )}
            keyExtractor={item => {
              return item.description, item.title, item.hour;
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '2%'
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
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
    backgroundColor: 'ghostwhite'
  },
  title: {
    fontFamily: 'Verdana',
    fontSize: 18
  },
  text: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 16
  },
  description: {
    fontStyle: 'italic',
    fontSize: 12,
    textAlign: 'center'
  }
});
