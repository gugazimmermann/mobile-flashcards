import React, { Component } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import * as Colors from "../utils/Colors";
import * as API from "../utils/Api";

class DeckDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      modalVisible: false,
      id: this.props.navigation.state.params.id,
      deck: {}
    };
  }

  componentWillMount() {
    API.getDeck(this.state.id).then(d => {
      let deck = JSON.parse(d);
      this.setState({
        isReady: true,
        deck: deck
      });
      this.props.navigation.setParams({ title: deck.title });
    });
  }

  showAlert = () => {
    Alert.alert(
      "Delete Deck",
      `You will delete deck ${this.state.deck.title}, are you sure?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", onPress: () => this.deleteDeck() }
      ]
    );
  };

  deleteDeck = () => {
    API.deleteDeck(this.state.deck).then(res => {
      if (res === true) this.props.navigation.navigate("Decks");
    });
  };

  render() {
    const { deck } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1, padding: 16 }}>
        {!this.state.isReady ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.deck}>
              <Text style={styles.title}>{deck.title}</Text>
              <Text style={styles.cards}>{deck.cards.length} Cards</Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.buttonStyle, styles.success]}
                onPress={() => navigate("AddCard", { id: deck.id })}
              >
                <Text style={styles.buttonText}>Start Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonStyle, styles.warning]}
                onPress={() => navigate("AddCard", { id: deck.id })}
              >
                <Text style={styles.buttonText}>Add New Card</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonStyle, styles.danger]}
                onPress={() => this.showAlert()}
              >
                <Text style={styles.buttonText}>Delete Deck</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-around"
  },
  buttonStyle: {
    borderWidth: 1,
    padding: 8,
    width: 200,
    alignItems: "center"
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white
  },
  success: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryDark
  },
  warning: {
    backgroundColor: Colors.warning,
    borderColor: Colors.warningDark
  },
  danger: {
    backgroundColor: Colors.danger,
    borderColor: Colors.dangerDark
  },
  deck: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.primary,
    padding: 8,
    marginBottom: 16,
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

export default DeckDetail;
