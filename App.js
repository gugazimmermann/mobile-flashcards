import React, { Component } from 'react'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Container } from 'native-base'
import { View, StatusBar } from 'react-native'
import Constants from 'expo-constants'
import * as Colors from './utils/Colors'
import Navigator from './Navigator'

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isReady: false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    });
    this.setState({ isReady: true })
  }

  render() {

    if (!this.state.isReady) {
      return <AppLoading />
    }

    return (
      <Container>
        <AppStatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <Navigator />
      </Container>
    )
  }
}
