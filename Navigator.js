import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { Animated, Easing } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as Colors from "./utils/Colors";

import Home from "./components/Home";
import AddDeck from "./components/AddDeck";
import DeckDetail from "./components/DeckDetail";
import AddCard from "./components/AddCard";

const Tab = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "Decks",
        headerTitle: "Decks",
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        title: "Add Deck",
        headerTitle: "Add Deck",
        tabBarLabel: "Add Deck",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.primary,
      style: {
        height: 56,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

Tab.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  const headerTitle = routeName === "Home" ? "Decks" : "Add Deck";
  return { headerTitle };
};

const Stack = createStackNavigator(
  {
    Decks: {
      screen: Tab
    },
    Deck: {
      screen: DeckDetail,
      path: "deck/:id",
      navigationOptions: ({ navigation }) => ({
        id: navigation.state.params.id,
        title: navigation.state.params.title
      })
    },
    AddCard: {
      screen: AddCard,
      path: "deck/addCard/:id",
      navigationOptions: ({ navigation }) => ({
        id: navigation.state.params.id,
        title: navigation.state.params.title
      })
    }
  },
  {
    initialRouteName: "Decks",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary
      },
      headerTintColor: Colors.white
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0]
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1]
        });

        return { opacity, transform: [{ translateY }] };
      }
    })
  }
);

export default createAppContainer(Stack);
