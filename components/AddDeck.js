import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import * as Colors from "../utils/Colors";
import * as API from "../utils/Api";

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      deck: ""
    };
  }

  save = deck => {
    API.saveDeckTitle(deck).then(id => {
      this.props.navigation.navigate("Deck", { id: id });
    });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1, padding: 16 }}>
        <View style={styles.deck}>
          <Text style={styles.title}>Choose the name of the New Deck</Text>
        </View>
        <View
          style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
        >
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Deck Name"
            placeholderTextColor={Colors.primary}
            autoCapitalize="none"
            value={this.state.deck}
            onChangeText={deck => this.setState({ deck: deck })}
            returnKeyType="done"
            onSubmitEditing={() => this.save(this.state.deck)}
          />

          <TouchableOpacity
            style={[styles.buttonStyle, styles.warning]}
            onPress={() => this.save(this.state.deck)}
          >
            <Text style={styles.buttonText}> Submit </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 21,
    fontWeight: "bold"
  },
  input: {
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.primary,
    marginBottom: 16
  },
  buttonStyle: {
    borderWidth: 1,
    borderRadius: 10,
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
  warning: {
    backgroundColor: Colors.warning,
    borderColor: Colors.warningDark
  }
});

export default AddDeck;
