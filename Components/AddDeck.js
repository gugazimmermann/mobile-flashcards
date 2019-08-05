import React, { Component } from 'react'
import { View, Text } from 'react-native'

class AddDeck extends Component {
    render() {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Add Deck!</Text>
        </View>
        );
    }
}

export default AddDeck