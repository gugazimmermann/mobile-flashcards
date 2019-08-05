import { AsyncStorage } from "react-native";
import slug from "slug";

export const FIRST_RUN = "MobileFlashcards:first";
export const DECKS_STORAGE = "MobileFlashcards:decks";
export const CARDS_STORAGE = "MobileFlashcards:cards";

const mockDecks = [
  {
    id: "preparation-for-interview",
    title: "Preparation for Interview"
  },
  {
    id: "more-preparation",
    title: "More Preparation"
  }
];

const mockCards = [
  {
    deck: "preparation-for-interview",
    id: "can-you-tell-me-a-little-about-yourself",
    card: {
      question: "Can you tell me a little about yourself?",
      answer:
        "This question seems simple, so many people fail to prepare for it, but it's crucial."
    }
  },
  {
    deck: "preparation-for-interview",
    id: "how-did-you-hear-about-the-position",
    card: {
      question: "How did you hear about the position?",
      answer:
        "Another seemingly innocuous interview question, this is actually a perfect opportunity to stand out and show your passion for and connection to the company."
    }
  },
  {
    deck: "preparation-for-interview",
    id: "what-do-you-know-about-the-company",
    card: {
      question: "What do you know about the company?",
      answer:
        "Any candidate can read and regurgitate the company’s “About” page. So, when interviewers ask this, they aren't necessarily trying to gauge whether you understand the mission—they want to know whether you care about it."
    }
  },
  {
    deck: "preparation-for-interview",
    id: "why-do-you-want-this-job",
    card: {
      question: "Why do you want this job?",
      answer:
        "Again, companies want to hire people who are passionate about the job, so you should have a great answer about why you want the position."
    }
  },
  {
    deck: "more-preparation",
    id: "why-should-we-hire-you",
    card: {
      question: "Why should we hire you?",
      answer:
        "This interview question seems forward (not to mention intimidating!), but if you're asked it, you're in luck: There's no better setup for you to sell yourself and your skills to the hiring manager."
    }
  },
  {
    deck: "more-preparation",
    id: "what-are-your-greatest-professional-strengths",
    card: {
      question: "What are your greatest professional strengths?",
      answer:
        "When answering this question, interview coach Pamela Skillings recommends being accurate (share your true strengths, not those you think the interviewer wants to hear); relevant (choose your strengths that are most targeted to this particular position); and specific (for example, instead of “people skills,” choose “persuasive communication” or “relationship building”). Then, follow up with an example of how you've demonstrated these traits in a professional setting."
    }
  }
];

async function clear() {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    alert(e);
  }
}

async function getFirstRun() {
  try {
    return await AsyncStorage.getItem(FIRST_RUN);
  } catch (e) {
    alert(e);
  }
}

async function setFirstRun() {
  try {
    return await AsyncStorage.setItem(FIRST_RUN, "1");
  } catch (e) {
    alert(e);
  }
}

async function setMockDecks() {
  try {
    await AsyncStorage.setItem(DECKS_STORAGE, JSON.stringify(mockDecks));
    return mockDecks;
  } catch (e) {
    alert(e);
  }
}

async function setMockCards() {
  try {
    await AsyncStorage.setItem(CARDS_STORAGE, JSON.stringify(mockCards));
    return mockCards;
  } catch (e) {
    alert(e);
  }
}

async function getMockDecks() {
  try {
    let decks = await AsyncStorage.getItem(DECKS_STORAGE);
    return JSON.parse(decks);
  } catch (e) {
    alert(e);
  }
}

async function getMockCards() {
  try {
    let cards = await AsyncStorage.getItem(CARDS_STORAGE);
    return JSON.parse(cards);
  } catch (e) {
    alert(e);
  }
}

export async function _getDecks() {
  let firstRun = await getFirstRun();
  if (!firstRun) {
    await setMockDecks();
    await setMockCards();
    await setFirstRun();
  }
  let decks = await getMockDecks();
  let cards = await getMockCards();
  decks.map(d => (d.cards = cards.filter(c => c.deck === d.id)));
  return JSON.stringify(decks);
}

export async function _getDeck(id) {
  let decks = await getMockDecks();
  let cards = await getMockCards();
  let deck = decks.find(d => d.id === id);
  deck.cards = cards.filter(c => c.deck === deck.id);
  return JSON.stringify(deck);
}

async function addCards(cards) {
  try {
    await AsyncStorage.setItem(CARDS_STORAGE, JSON.stringify(cards));
    return true;
  } catch (e) {
    alert(e);
  }
}

async function addDecks(decks) {
  try {
    await AsyncStorage.setItem(DECKS_STORAGE, JSON.stringify(decks));
    return true;
  } catch (e) {
    alert(e);
  }
}

export async function _addCardToDeck(id, card) {
  let cards = await getMockCards();
  let newCard = {
    deck: id,
    id: slug(card.question),
    card: {
      question: card.question,
      answer: card.answer
    }
  };
  cards.push(newCard);
  return await addCards(cards);
}

export async function _saveDeckTitle(deck) {
  let decks = await getMockDecks();
  let newDeck = {
    id: slug(deck),
    title: deck
  };
  decks.push(newDeck);
  await addDecks(decks);
  return newDeck.id;
}

export async function _deleteDeck(deck) {
  let decks = await getMockDecks();
  let newDecks = decks.filter(d => d.id !== deck.id);
  return await addDecks(newDecks);
}
