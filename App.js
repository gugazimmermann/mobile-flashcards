import React, { Component } from 'react'
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
  render() {
    return (
      <View style={{flex: 1}}>
        <AppStatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <Navigator />
      </View>
    )
  }
}
