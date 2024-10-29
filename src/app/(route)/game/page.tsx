"use client";
import { useState } from 'react';

interface Player {
  id: number;
  name: string;
  score: number;
}

const initialPlayers: Player[] = [
  { id: 1, name: 'Player 1', score: 0 },
  { id: 2, name: 'Player 2', score: 0 },
  { id: 3, name: 'Player 3', score: 0 },
  { id: 4, name: 'Player 4', score: 0 },
];

const initialBoxValues = [
  { name: 'White', value: 0, id: 1, disabled: false },
  { name: 'Play', value: 0, id: 2, disabled: false },
  { name: '3', value: 6, id: 3, disabled: false },
  { name: '4', value: 4, id: 4, disabled: false },
  { name: '5', value: 5, id: 5, disabled: false },
  { name: '6', value: 6, id: 6, disabled: false },
  { name: '7', value: 7, id: 7, disabled: false },
  { name: '8', value: 8, id: 8, disabled: false },
  { name: '9', value: 9, id: 9, disabled: false },
  { name: '10', value: 10, id: 10, disabled: false },
  { name: '11', value: 11, id: 11, disabled: false },
  { name: '12', value: 12, id: 12, disabled: false },
  { name: '13', value: 13, id: 13, disabled: false },
  { name: '14', value: 14, id: 14, disabled: false },
  { name: '15', value: 15, id: 15, disabled: false },
];

const GamePage = () => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [boxValues, setBoxValues] = useState<typeof initialBoxValues>(initialBoxValues);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [lastBoxValue, setLastBoxValue] = useState(0);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null); // Store the timeout ID

  const handleBoxClick = (value: number, index: number) => {
    // Clear any previous click timeout
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      // If the box was clicked before the timeout, it's a double click
      handleDoubleClick(value);
      return;
    }

    // Set a timeout to detect single click
    const timeout = setTimeout(() => {
      // Get the current player
      const currentPlayer = players[currentPlayerIndex];

      // Update the current player's score
      const updatedPlayers = players.map((player) =>
        player.id === currentPlayer.id ? { ...player, score: player.score + value } : player
      );

      // Disable the clicked box (except for box 1 and 2)
      setBoxValues((prev) =>
        prev.map((box, i) =>
          (i === index && i > 1) ? { ...box, disabled: true } : box
        )
      );

      // Set the last box value
      setLastBoxValue(value);

      // Update the players' state
      setPlayers(updatedPlayers);

      // If the clicked box is "White" or "Play", move to the next player
      if (index === 0 || index === 1) {
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
      }

      // Clear the timeout
      setClickTimeout(null);
    }, 300); // Timeout duration to distinguish single and double click

    // Store the timeout ID
    setClickTimeout(timeout);
  };

  const handleDoubleClick = (value: number) => {
    // Get the current player
    const currentPlayer = players[currentPlayerIndex];

    // Deduct the box value from the current player's score
    const updatedPlayers = players.map((player) =>
      player.id === currentPlayer.id ? { ...player, score: player.score - value } : player
    );

    // Update the players' state
    setPlayers(updatedPlayers);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Game Page</h1>
      <div className="grid grid-cols-5 gap-4 mb-4">
        {boxValues.map((box, index) => (
          <div
            key={box.id}
            className={`glass flex justify-center items-center border border-gray-300 rounded-full h-16 w-16 cursor-pointer transition-colors duration-300 ${box.disabled ? 'bg-gray-300 cursor-not-allowed' : 'hover:bg-gray-200'}`}
            onClick={() => !box.disabled && handleBoxClick(box.value, index)}
            style={{ backgroundColor: box.disabled ? '#e5e5e5' : 'gray-500' }}
          >
            {box.name}
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl">Player Scores:</h2>
        <ul>
          {players.map((player) => (
            <li key={player.id}>
              {player.name}: {player.score}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3>Current Player: {players[currentPlayerIndex].name}</h3>
      </div>
    </div>
  );
};

export default GamePage;
