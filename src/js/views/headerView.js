class HeaderView {
  _parentElement = document.querySelector(".header");
  _generateVictoryMarkup(score, tryCount) {
    return `
    <div class="game-complete">
      <p>Complete!</p>
      <p>Score: ${score}</p>
      <p>You've tried: ${tryCount} times</p>
    </div>
    `;
  }
  updateBoard(newScore, newTryCount) {
    const score = this._parentElement.querySelector(".score");
    const tryCount = this._parentElement.querySelector(".try-count");
    score.textContent = newScore;
    tryCount.textContent = newTryCount;
  }
  displayVictory(newScore, newTryCount) {
    const markup = this._generateVictoryMarkup(newScore, newTryCount);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
export default new HeaderView();
