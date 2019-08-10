import React, { Component } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import { withNavigationFocus } from "react-navigation";
import * as Colors from "../utils/Colors";
import * as API from "../utils/Api";
import DeckListItem from "./DeckListItem";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      decks: [{}]
    };
  }

  componentDidMount() {
    this.getDecks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.getDecks();
    }
  }

  getDecks = () => {
    this.setState({ isReady: false });
    API.getDecks().then(decks => {
      this.setState({
        isReady: true,
        decks: JSON.parse(decks)
      });
    });
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <DeckListItem
      id={item.id}
      onPressItem={this._onPressItem}
      title={item.title}
      cards={item.cards.length}
    />
  );

  _onPressItem = id => {
    this.props.navigation.navigate("Deck", { id: id });
  };

  render() {
    const { decks } = this.state;

    return (
      <View style={{ flex: 1, padding: 16 }}>
        {!this.state.isReady ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <FlatList
            style={{ flex: 1 }}
            data={decks}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        )}
      </View>
    );
  }
}

export default withNavigationFocus(Home);
