const WORDS: string[] = ["apple", "grape", "melon", "peach", "berry"];

let word: string = "";
let timer: number = 30;
let gameOver: boolean = false;
let score: number = 0;
let difficulty: "easy" | "medium" | "hard" = "easy";
let countdown: ReturnType<typeof setInterval>;

function getRandomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function startGame(): void {
  word = getRandomWord();
  timer = getTimerByDifficulty();
  gameOver = false;
  updateText("message", "");
  (document.getElementById("input") as HTMLInputElement).value = "";
  updateText("hint", `Hint: ${word.length} letters`);
  updateText("timer", `⏳ Time left: ${timer}s`);
  updateText("score", `🏆 Score: ${score}`);
  clearInterval(countdown);
  countdown = setInterval(updateTimer, 1000);
}

function getTimerByDifficulty(): number {
  if (difficulty === "easy") return 30;
  if (difficulty === "medium") return 20;
  return 10;
}

function updateTimer(): void {
  if (timer > 0) {
    timer--;
    updateText("timer", `⏳ Time left: ${timer}s`);
  } else {
    endGame("⏰ Time's up! Try another word.", "timeout");
  }
}

function submitGuess(): void {
  const inputEl = document.getElementById("input") as HTMLInputElement;
  const input = inputEl.value.trim().toLowerCase();
  if (input === word) {
    score++;
    endGame("🎉 Correct! Play again?", "success");
  } else {
    showMessage("❌ Try again!", "fail");
  }
}

function endGame(message: string, sound: string): void {
  clearInterval(countdown);
  gameOver = true;
  showMessage(message, sound);
}

function showMessage(message: string, sound: string): void {
  updateText("message", message);
  if (sound) playSound(sound);
}

function updateText(id: string, text: string): void {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function changeDifficulty(level: "easy" | "medium" | "hard"): void {
  difficulty = level;
  startGame();
}

function playSound(type: string): void {
  const audio = new Audio(`/sounds/${type}.mp3`);
  audio.play();
}

document.getElementById("submit-btn")?.addEventListener("click", submitGuess);
document.getElementById("new-btn")?.addEventListener("click", startGame);
document.getElementById("easy-btn")?.addEventListener("click", () => changeDifficulty("easy"));
document.getElementById("medium-btn")?.addEventListener("click", () => changeDifficulty("medium"));
document.getElementById("hard-btn")?.addEventListener("click", () => changeDifficulty("hard"));

window.onload = startGame;
