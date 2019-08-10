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

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      id: this.props.navigation.state.params.id,
      deck: {},
      question: "",
      answer: ""
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

  save = (question, answer) => {
    API.addCardToDeck(this.state.deck.id, { question, answer }).then(res => {
      if (res === true) this.props.navigation.navigate("Decks");
    });
  };

  render() {
    return !this.state.isReady ? (
      <ActivityIndicator size="large" color={Colors.primary} />
    ) : (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1, padding: 16 }}>
        <View style={styles.deck}>
          <Text style={styles.title}>Add New Card</Text>
        </View>
        <View
          style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
        >
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Question"
            placeholderTextColor={Colors.primary}
            autoCapitalize="none"
            value={this.state.question}
            onChangeText={question => this.setState({ question: question })}
            returnKeyType="next"
            onSubmitEditing={() => {
              this.answerTextInput.focus();
            }}
          />

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Answer"
            placeholderTextColor={Colors.primary}
            autoCapitalize="none"
            value={this.state.answer}
            onChangeText={answer => this.setState({ answer: answer })}
            returnKeyType="done"
            ref={input => {
              this.answerTextInput = input;
            }}
            onSubmitEditing={() =>
              this.save(this.state.question, this.state.answer)
            }
          />

          <TouchableOpacity
            style={[styles.buttonStyle, styles.warning]}
            onPress={() => this.save(this.state.question, this.state.answer)}
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

export default AddCard;
