import "../sass/main.scss";
import View from "./views/View.js";
import * as model from "./model.js";
import HeaderView from "./views/headerView.js";
const controlCards = function (card) {
  if (model.canFlipCard(card)) {
    model.compareCards(card);
    HeaderView.updateBoard(model.state.score, model.state.tryCount);
  }
};
const controlCardFlip = function (card) {
  View.renderCardFlipped(card);
};
const controlCardMatch = function (...cardPair) {
  View.renderCardMatch(cardPair);
};
const controlCardMisMatch = function (...cardPair) {
  View.renderCardMisMatch(cardPair);
};
const controlWrongPair = function (card) {
  View.renderWrongPair(card);
};
const controlVictory = function (score, tryCount) {
  HeaderView.displayVictory(score, tryCount);
};
const init = function () {
  View.addHandlerFlipCard(controlCards);
  model.bindCardFlipped(controlCardFlip);
  model.bindCardMatch(controlCardMatch);
  model.bindCardMisMatch(controlCardMisMatch);
  model.bindToggleWrongPair(controlWrongPair);
  model.bindVictory(controlVictory);
};
init();
/*
Summary
(1.) MVC structure
https://github.com/taniarascia/mvc
(2.) card-flipping game assets
https://github.com/portexe/Mix-Or-Match/tree/tutorial-code
*/
