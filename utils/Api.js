import {
  _getDecks,
  _getDeck,
  _addCardToDeck,
  _saveDeckTitle,
  _deleteDeck
} from "./_DATA";

export const getDecks = () => _getDecks();
export const getDeck = id => _getDeck(id);
export const addCardToDeck = (id, card) => _addCardToDeck(id, card);
export const saveDeckTitle = deck => _saveDeckTitle(deck);
export const deleteDeck = deck => _deleteDeck(deck);
