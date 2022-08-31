import AudioPlayer from "./helper.js";

export let state = {
  score: 0,
  cardToCheck: null,
  matchedCards: [],
  busy: false,
  tryCount: 0,
};
let onCardFlipped;
let onCardMatch;
let onCardMisMatch;
let toggleWrongPair;
let onVictory;
export const bindCardFlipped = function (handler) {
  onCardFlipped = handler;
};
export const bindCardMatch = function (handler) {
  onCardMatch = handler;
};
export const bindCardMisMatch = function (handler) {
  onCardMisMatch = handler;
};
export const bindToggleWrongPair = function (handler) {
  toggleWrongPair = handler;
};
export const bindVictory = function (handler) {
  onVictory = handler;
};
// conditional statement as guard clause
export const canFlipCard = function (card) {
  // There are three conditions to exclude
  //(1.) during the downtime
  //(2.) when the card to flip doesn't lie in the matched card deck
  //(3.) when the card to flip isn't the one to check
  return (
    !state.busy &&
    !state.matchedCards.includes(card) &&
    card !== state.cardToCheck
  );
};
export const compareCards = function (card) {
  state.cardToCheck
    ? (checkForCardMatch(card), onCardFlipped(card), AudioPlayer.flip())
    : ((state.cardToCheck = card),
      onCardFlipped(state.cardToCheck),
      AudioPlayer.flip());
};

export const checkForCardMatch = function (card) {
  if (getCardValue(card) === getCardValue(state.cardToCheck)) {
    cardMatch(state.cardToCheck, card);
  } else {
    cardMisMatch(state.cardToCheck, card);
  }
  state.tryCount++;
  state.cardToCheck = null;
  if (state.matchedCards.length === 52) {
    setTimeout(() => {
      onVictory(state.score, state.tryCount);
      AudioPlayer.victory();
    }, 1500);
  }
};
const getCardValue = function (card) {
  return card.dataset.value;
};

const cardMatch = function (card1, card2) {
  state.matchedCards.push(card1, card2);
  setTimeout(() => {
    onCardMatch(card1, card2);
    AudioPlayer.match();
  }, 1000);
  state.score += 10;
};
const cardMisMatch = function (card1, card2) {
  state.busy = true;
  appendWrongAnimation(card1, card2);
  setTimeout(() => {
    state.busy = false;
    onCardMisMatch(card1, card2);
  }, 1500);
};
const appendWrongAnimation = function (...cards) {
  cards.forEach((card) => {
    toggleWrongPair(card);
    card.addEventListener(
      "animationend",
      () => {
        toggleWrongPair(card);
      },
      { once: true }
    );
  });
};
