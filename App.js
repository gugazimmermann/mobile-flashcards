import React, { Component } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { View, StatusBar } from "react-native";
import * as Colors from "./utils/Colors";
import Navigator from "./Navigator";

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("./assets/Roboto.ttf"),
      Roboto_medium: require("./assets/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <View style={{ flex: 1 }}>
        <AppStatusBar
          backgroundColor={Colors.primary}
          barStyle="light-content"
        />
        <Navigator />
      </View>
    );
  }
}
