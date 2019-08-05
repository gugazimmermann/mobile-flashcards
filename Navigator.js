import React from 'react'
import { Animated, Easing } from 'react-native'
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import * as Colors from './utils/Colors'

import Home from './Components/Home'
import AddDeck from './Components/AddDeck'
import DeckDetail from './Components/DeckDetail'

const Tab = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Colors.primary,
    style: {
      height: 56,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const Stack = createStackNavigator({
  Decks: {
    screen: Tab,
  },
  Deck: {
    screen: DeckDetail,
    path: 'deck/:id',
    navigationOptions: ({ navigation }) => ({
      id: navigation.state.params.id,
    })
  }
},
{
  headerMode: 'none',
  defaultNavigationOptions: {
    gesturesEnabled: false,
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      const height = layout.initHeight;
      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return { opacity, transform: [{ translateY }] };
    },
  }),
})

  
export default createAppContainer(Stack)
