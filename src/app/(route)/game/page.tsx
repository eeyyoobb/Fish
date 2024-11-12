"use client";
import Image from 'next/image';
import { useState } from 'react';
import {toast} from "sonner";

interface Player {
  id: number;
  name: string;
  score: number;
  balls: number[];
  isOut?: boolean;
}

const initialBoxValues = [
  { id: 3, value: 6, image: '/balls/3.png', disabled: false },
  { id: 4, value: 4, image: '/balls/4.png', disabled: false },
  { id: 5, value: 5, image: '/balls/5.png', disabled: false },
  { id: 6, value: 6, image: '/balls/6.png', disabled: false },
  { id: 7, value: 7, image: '/balls/7.png', disabled: false },
  { id: 8, value: 8, image: '/balls/8.png', disabled: false },
  { id: 9, value: 9, image: '/balls/9.png', disabled: false },
  { id: 10, value: 10, image: '/balls/10.png', disabled: false },
  { id: 11, value: 11, image: '/balls/11.png', disabled: false },
  { id: 12, value: 12, image: '/balls/12.png', disabled: false },
  { id: 13, value: 13, image: '/balls/13.png', disabled: false },
  { id: 14, value: 14, image: '/balls/14.png', disabled: false },
  { id: 15, value: 15, image: '/balls/15.png', disabled: false },
];

const GamePage = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [lastClickedBall, setLastClickedBall] = useState<number | null>(null);
  const [allBalls, setAllBalls] = useState(initialBoxValues);
  const [numPlayers, setNumPlayers] = useState(2);

  
  
  const initializePlayers = (num: number) => {
    const newPlayers = Array.from({ length: num }, (_, i) => ({
      id: i + 1,
      name: `Player ${i + 1}`,
      score: 0,
      balls: [],
      isOut: false,
    }));
    setPlayers(newPlayers);
    setCurrentPlayerIndex(0);
  };

  const handleNumPlayersChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedNum = parseInt(event.target.value);
    setNumPlayers(selectedNum);
    initializePlayers(selectedNum);
  };

  const handleBoxClick = (value: number, index: number) => {
    const currentPlayerId = players[currentPlayerIndex].id;
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === currentPlayerId
          ? {
              ...player,
              score: player.score + value,
              balls: [...player.balls, value],
            }
          : player
      )
    );

    setAllBalls((prevBalls) =>
      prevBalls.map((ball, i) =>
        i === index ? { ...ball, disabled: true } : ball
      )
    );

    setLastClickedBall(value);
    checkWinningCondition();
  };

  const handleCueClick = () => {
    if (lastClickedBall === null) return;

    const currentPlayerId = players[currentPlayerIndex].id;
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === currentPlayerId
          ? { ...player, score: player.score - 2*lastClickedBall }
          : player
      )
    );

    setLastClickedBall(null);
    handleNextPlayer();
  };

  const handleFoulClick = () => {
    if (lastClickedBall === null) return;
  
    const currentPlayerId = players[currentPlayerIndex].id;
  
    // Update the current player's score and balls array
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === currentPlayerId
          ? {
              ...player,
              score: player.score - 2 * lastClickedBall,
              balls: player.balls.slice(0, -1), // Remove the last ball
            }
          : player
      )
    );
  
    // Re-enable the last clicked ball in the allBalls array
    setAllBalls((prevBalls) =>
      prevBalls.map((ball) =>
        ball.value === lastClickedBall ? { ...ball, disabled: false } : ball
      )
    );
  
    // Clear the last clicked ball
    setLastClickedBall(null);
    
    // Move to the next player
    handleNextPlayer();
  };
  

  const handleNextPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const checkWinningCondition = () => {
    const totalRemainingPoints = allBalls
      .filter((ball) => !ball.disabled)
      .reduce((acc, ball) => acc + ball.value, 0);
    const sortedScores = [...players]
      .filter((player) => !player.isOut)
      .sort((a, b) => b.score - a.score);
    const highestScore = sortedScores[0]?.score || 0;
    const secondHighestScore = sortedScores[1]?.score || 0;

    players.forEach((player) => {
      if (!player.isOut && player.score > totalRemainingPoints + secondHighestScore) {
        toast(`${player.name} is the winner!`);
        setPlayers((prevPlayers) =>
          prevPlayers.map((p) =>
            p.id === player.id ? { ...p, isOut: true } : p
          )
        );
      }
    });
  };

  return (
    <div className="p-4 bg-gradient-to-b from-green-600/70 to-green-900/70">
      <h1 className="text-2xl mb-4">Pool Game Score Tracker</h1>

      <div className="mb-4">
        <label htmlFor="numPlayers" className="mr-2">Number of Players:</label>
        <select
          id="numPlayers"
          value={numPlayers}
          onChange={handleNumPlayersChange}
          className="p-2 border rounded"
        >
          {[2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="border-white p-4 mb-6 rounded-lg bg-teal-900/90">
        <h2 className="text-xl mb-2">All Balls</h2>
        <div className="flex gap-4 mb-2">
          {allBalls.map((ball, index) => (
            <div
              key={ball.id}
              className={`flex justify-center items-center border rounded-full cursor-pointer transition-colors duration-300 ${ball.disabled ? 'filter grayscale' : ''}`}
              onClick={() => !ball.disabled && handleBoxClick(ball.value, index)}
            >
              {ball.image && (
                <Image
                  src={ball.image}
                  alt={`${ball.value}`}
                  width={50}
                  height={50}
                  className="w-full h-full object-cover rounded-full"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center w-full h-full">
          <button onClick={handleCueClick}>
            <Image src="/balls/0.png" alt="white" width={20} height={20} className="w-full h-full object-cover rounded-full object-center" />
          </button>
          <button className="mt-2 p-2 bg-red-500/70 text-white rounded ml-2" onClick={handleFoulClick}>Foul</button>
          <button className="mt-2 p-2 bg-teal-700/70 text-white rounded ml-2" onClick={handleNextPlayer}>Next Player</button>
        </div>
      </div>

      {players.map((player, index) => (
        <div
          key={player.id}
          className={`border border-green-700 bg-teal-900/70 p-4 mb-4 rounded-lg ${player.isOut ? 'bg-red-700' : currentPlayerIndex === index ? 'border-orange-500 glow-effect' : ''}`}
        >
          <h2 className="text-xl">{player.name}</h2>
          <p>Score: {player.score}</p>
          {player.isOut && <p className="text-red-500">Out</p>}
          <div className="mt-4">
            <h2 className="text-lg mb-2">Player&apos;s Balls</h2>
            <div className="flex gap-4">
              {player.balls.map((ballValue, i) => (
                <div key={i} className="flex justify-center items-center border rounded-full">
                  <Image
                    src={`/balls/${ballValue}.png`}
                    alt={`Ball ${ballValue}`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GamePage;
