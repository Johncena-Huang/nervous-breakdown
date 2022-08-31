import diamonds from "../../assets/images/diamonds.png";
import clubs from "../../assets/images/clubs.png";
import hearts from "../../assets/images/hearts.png";
import spades from "../../assets/images/spades.png";
import { getRandomNumberArray } from "../helper";
class View {
  _parentElement = document.querySelector(".card-table");
  constructor() {
    // init
    this.displayCards();
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
  _suitSelector(num) {
    const symbolTable = {
      0: clubs,
      1: diamonds,
      2: hearts,
      3: spades,
    };
    return symbolTable[num];
  }
  _numberTransformer(num) {
    const numberToSymbolTable = {
      1: "A",
      11: "J",
      12: "Q",
      13: "K",
    };
    return numberToSymbolTable[num] || num;
  }
  _generateCardMarkup(value) {
    return `
        <div class="card face-down" data-value=${(value % 13) + 1}>
            <div class="card__content"> 
            <div class="card__front">
                <p class="card__value">${this._numberTransformer(
                  (value % 13) + 1
                )}</p>
                <img class="card__suit" src=${this._suitSelector(
                  Math.floor((value - 1) / 13)
                )} alt="suit" />
                <p class="card__value">${this._numberTransformer(
                  (value % 13) + 1
                )}</p>
            </div>
            <div class="card__back"></div>
            </div>
        </div>
      `;
  }
  addHandlerFlipCard(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      if (!card) return;
      handler(card);
    });
  }
  displayCards() {
    const markup = getRandomNumberArray(52)
      .map(this._generateCardMarkup.bind(this))
      .join("");
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderCardFlipped(card) {
    card.classList.remove("face-down");
  }
  renderCardMatch(cards) {
    cards.forEach((card) => {
      card.classList.add("matched");
    });
  }
  renderCardMisMatch(cards) {
    cards.forEach((card) => {
      card.classList.add("face-down");
    });
  }
  renderWrongPair(card) {
    card.classList.toggle("wrong");
  }
}

export default new View();
