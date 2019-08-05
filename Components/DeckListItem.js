import React, { PureComponent } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import * as Colors from "../utils/Colors";

class DeckListItem extends PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.deck}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.cards}>{this.props.cards} Cards</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.primary,
    padding: 8,
    marginBottom: 16,
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 21,
    fontWeight: "bold"
  },
  cards: {
    fontFamily: "Roboto",
    fontSize: 16
  }
});

export default DeckListItem;
