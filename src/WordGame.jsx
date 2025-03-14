import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WORDS = ["apple", "grape", "melon", "peach", "berry"];

const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

export default function WordGame() {
  const [word, setWord] = useState(getRandomWord());
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0 && !gameOver) {
      setMessage("⏰ Time's up! Try another word.");
      setGameOver(true);
    }
  }, [timer, gameOver]);

  const handleSubmit = () => {
    if (input.toLowerCase() === word) {
      setMessage("🎉 Correct! Play again?");
      setGameOver(true);
    } else {
      setMessage("❌ Try again!");
    }
  };

  const handleNewWord = () => {
    setWord(getRandomWord());
    setInput("");
    setMessage("");
    setTimer(30);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardContent className="p-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Guess the Word!</h1>
          <p className="mb-2 text-white">Hint: {word.length} letters</p>
          <p className="mb-4 text-white">⏳ Time left: {timer}s</p>
          <input
            type="text"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={gameOver}
          />
          <div className="flex justify-center gap-2 mt-4">
            <Button onClick={handleSubmit} disabled={gameOver}>Submit</Button>
            <Button variant="outline" onClick={handleNewWord}>New Word</Button>
          </div>
          {message && <p className="mt-4 text-lg text-white">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
