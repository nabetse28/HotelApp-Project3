import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ContactScreen from '../screens/ContactScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WeatherScreen from '../screens/WeatherScreen';
import SchedulerScreen from '../screens/SchedulerScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Hotel',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'md-bed'} />
};

const ServicesStack = createStackNavigator({
  Services: ServicesScreen
});

ServicesStack.navigationOptions = {
  tabBarLabel: 'Services',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-walk'} />
  )
};

const WeatherStack = createStackNavigator({
  Contact: WeatherScreen
});

WeatherStack.navigationOptions = {
  tabBarLabel: 'Weather',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-cloud-outline'} />
  )
};

// ios-list-box
const SchedulerStack = createStackNavigator({
  Contact: SchedulerScreen
});

SchedulerStack.navigationOptions = {
  tabBarLabel: 'Itinerary',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-list-box'} />
  )
};

const ContactStack = createStackNavigator({
  Contact: ContactScreen
});

ContactStack.navigationOptions = {
  tabBarLabel: 'Contact',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-call'} />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Register: RegisterScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-settings'} />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  ServicesStack,
  WeatherStack,
  SchedulerStack,
  ContactStack,
  SettingsStack
});
