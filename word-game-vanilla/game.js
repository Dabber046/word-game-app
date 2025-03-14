const WORDS = ["apple", "grape", "melon", "peach", "berry"];

let word = "";
let timer = 30;
let gameOver = false;
let score = 0;
let difficulty = "easy";
let countdown;

function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function startGame() {
  word = getRandomWord();
  timer = getTimerByDifficulty();
  gameOver = false;
  document.getElementById("message").textContent = "";
  document.getElementById("input").value = "";
  document.getElementById("hint").textContent = `Hint: ${word.length} letters`;
  document.getElementById("timer").textContent = `⏳ Time left: ${timer}s`;
  document.getElementById("score").textContent = `🏆 Score: ${score}`;
  clearInterval(countdown);
  countdown = setInterval(updateTimer, 1000);
}

function getTimerByDifficulty() {
  if (difficulty === "easy") return 30;
  if (difficulty === "medium") return 20;
  return 10;
}

function updateTimer() {
  if (timer > 0) {
    timer--;
    document.getElementById("timer").textContent = `⏳ Time left: ${timer}s`;
  } else {
    endGame("⏰ Time's up! Try another word.", "timeout");
  }
}

function submitGuess() {
  const input = document.getElementById("input").value.trim().toLowerCase();
  if (input === word) {
    score++;
    endGame("🎉 Correct! Play again?", "success");
  } else {
    showMessage("❌ Try again!", "fail");
  }
}

function endGame(message, sound) {
  clearInterval(countdown);
  gameOver = true;
  showMessage(message, sound);
}

function showMessage(message, sound) {
  document.getElementById("message").textContent = message;
  if (sound) playSound(sound);
}

function changeDifficulty(level) {
  difficulty = level;
  startGame();
}

function playSound(type) {
  const audio = new Audio(`/sounds/${type}.mp3`);
  audio.play();
}

document.getElementById("submit-btn").addEventListener("click", submitGuess);
document.getElementById("new-btn").addEventListener("click", startGame);
document.getElementById("easy-btn").addEventListener("click", () => changeDifficulty("easy"));
document.getElementById("medium-btn").addEventListener("click", () => changeDifficulty("medium"));
document.getElementById("hard-btn").addEventListener("click", () => changeDifficulty("hard"));

window.onload = startGame;
