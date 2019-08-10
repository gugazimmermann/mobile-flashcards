import React, { Component } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import * as Colors from "../utils/Colors";
import * as API from "../utils/Api";
import { setQuizDate } from "../utils/Notifications";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      answerVisible: false,
      questionsLeft: false,
      id: this.props.navigation.state.params.id,
      deck: {},
      questionToShow: {}
    };
  }

  componentWillMount() {
    API.getDeck(this.state.id).then(d => {
      let deck = JSON.parse(d);
      deck.cards.forEach(c => {
        c.answered = false;
        c.correct = false;
      });
      this.setState({
        isReady: true,
        deck: deck
      });
      this.props.navigation.setParams({ title: deck.title });
    });
  }

  restartQuiz = () => {
    const { deck } = this.state;
    this.setCorrect({ isReady: false });
    deck.cards.forEach(c => {
      c.answered = false;
      c.correct = false;
    });
    this.setState({
      isReady: true,
      answerVisible: false,
      questionsLeft: false,
      deck: deck,
      questionToShow: {}
    });
  };

  questionToShow = () => {
    const { deck, answerVisible } = this.state;
    const cardToShow = deck.cards.find(c => c.answered === false);
    return !answerVisible ? (
      <View style={{ flex: 1 }}>
        <View style={styles.deck}>
          <Text style={styles.title}>{cardToShow.card.question}</Text>
        </View>
        <View style={styles.showAnswerButtons}>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.warning]}
            onPress={() => this.setState({ answerVisible: true })}
          >
            <Text style={styles.buttonText}>Show Answer</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <View style={styles.deck}>
          <Text style={[styles.title, styles.marginBottom]}>
            {cardToShow.card.question}
          </Text>
          <Text style={styles.cards}>{cardToShow.card.answer}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.success]}
            onPress={() => this.setCorrect(cardToShow.id, true)}
          >
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.danger]}
            onPress={() => this.setCorrect(cardToShow.id, false)}
          >
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  setCorrect = (id, userAnswer) => {
    let { deck } = this.state;
    deck.cards.forEach(c => {
      if (c.id === id) {
        c.answered = true;
        c.correct = userAnswer;
      }
    });
    this.setState({
      deck: deck,
      answerVisible: false,
      questionsLeft: true
    });
  };

  questionsLeft = () => {
    let { deck } = this.state;
    let ql = deck.cards.filter(c => c.answered === true);
    if (deck.cards.length - ql.length > 0) {
      setTimeout(() => {
        this.setState({ questionsLeft: false });
      }, 1500);
      return (
        <View style={styles.showAnswerButtons}>
          <View style={styles.questionsLeft}>
            <Text style={styles.title}>
              Questions Left: {deck.cards.length - ql.length}
            </Text>
          </View>
        </View>
      );
    } else {
      return this.showScore();
    }
  };

  showScore = () => {
    const { deck } = this.state;
    const { navigate } = this.props.navigation;
    const correct = deck.cards.filter(c => c.correct === true);

    const date = new Date();
    const today =
      date.getUTCDate() +
      "/" +
      (date.getUTCMonth() + 1) +
      "/" +
      date.getUTCFullYear();
    setQuizDate(today);

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.questionsLeft}>
          <Text style={styles.title}>
            Correct Answers: {correct.length} of {deck.cards.length} Questions
          </Text>
          <Text style={[styles.title]}>
            Score: {(correct.length * 100) / deck.cards.length} %
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.success]}
            onPress={() => this.restartQuiz()}
          >
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.warning]}
            onPress={() => navigate("Deck", { id: this.state.id })}
          >
            <Text style={styles.buttonText}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        {!this.state.isReady ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : this.state.questionsLeft ? (
          this.questionsLeft()
        ) : (
          <View style={{ flex: 1 }}>{this.questionToShow()}</View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-around"
  },
  showAnswerButtons: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    borderWidth: 1,
    padding: 8,
    width: 150,
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
    flexDirection: "column",
    alignItems: "center"
  },
  questionsLeft: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.warning,
    padding: 16,
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center"
  },
  cards: {
    fontFamily: "Roboto",
    fontSize: 16,
    textAlign: "center"
  },
  marginBottom: {
    marginBottom: 8
  }
});

export default Quiz;
