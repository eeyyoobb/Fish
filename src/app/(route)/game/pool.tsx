"use client";
import Image from 'next/image';
import { useState } from 'react';
import { toast } from "sonner";

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
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Player 1", score: 0, balls: [], isOut: false },
    { id: 2, name: "Player 2", score: 0, balls: [], isOut: false }
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [lastClickedBall, setLastClickedBall] = useState<number | null>(null);
  const [allBalls, setAllBalls] = useState(initialBoxValues);

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
          ? { ...player, score: player.score - 2 * lastClickedBall }
          : player
      )
    );

    setLastClickedBall(null);
    handleNextPlayer();
  };

  const handleFoulClick = () => {
    if (lastClickedBall === null) return;

    const currentPlayerId = players[currentPlayerIndex].id;

    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === currentPlayerId
          ? {
              ...player,
              score: player.score - 2 * lastClickedBall,
              balls: player.balls.slice(0, -1),
            }
          : player
      )
    );

    setAllBalls((prevBalls) =>
      prevBalls.map((ball) =>
        ball.value === lastClickedBall ? { ...ball, disabled: false } : ball
      )
    );

    setLastClickedBall(null);
    handleNextPlayer();
  };

  const handleNextPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const addPlayer = () => {
    const newPlayerId = players.length + 1;
    const newPlayer: Player = {
      id: newPlayerId,
      name: `Player ${newPlayerId}`,
      score: 0,
      balls: [],
      isOut: false,
    };
    setPlayers([...players, newPlayer]);
  };

  const resetGame = () => {
    setPlayers([
      { id: 1, name: "Player 1", score: 0, balls: [], isOut: false },
      { id: 2, name: "Player 2", score: 0, balls: [], isOut: false }
    ]);
    setCurrentPlayerIndex(0);
    setLastClickedBall(null);
    setAllBalls(initialBoxValues);
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
        <button onClick={resetGame} className="mt-2 p-2 bg-yellow-500 text-white rounded">Restart Game</button>
      </div>

      <div className="flex w-full">
        <div className="relative w-1/4 border-white p-2 mb-6 rounded-lg bg-teal-900/90">
          <h2 className="text-xl mb-2">All Balls</h2>
          <div className="flex flex-col gap-4 mb-2">
            {allBalls.map((ball, index) => (
              <div
                key={ball.id}
                className={`flex justify-center items-center border rounded-full cursor-pointer transition-colors duration-300 ${ball.disabled ? 'hidden' : ''}`}
                onClick={() => !ball.disabled && handleBoxClick(ball.value, index)}
                style={{ maxHeight: '35px' }}
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
        </div>

        <div className='flex flex-col items-center justify-center w-full h-full m-3'>
          <div className="flex justify-center items-center w-full h-full m-2">
            <button onClick={handleCueClick}>
              <Image src="/balls/0.png" alt="white" width={20} height={20} className="w-full h-full object-cover rounded-full object-center" />
            </button>
            <button className="mt-2 p-2 bg-red-500/70 text-white rounded ml-2" onClick={handleFoulClick}>Foul</button>
            <button className="mt-2 p-2 bg-teal-700/70 text-white rounded ml-2" onClick={handleNextPlayer}>Next Player</button>
          </div>
          {players.map((player, index) => (
            <div
              key={player.id}
              className={`border border-green-700 bg-teal-900/70 p-4 mb-4 rounded-lg ${player.isOut ? 'bg-red-700' : currentPlayerIndex === index ? 'border-orange-500 glow-effect' : ''}`}
              style={{maxHeight: '200px' }}
            >
              <h2 className="text-xl">{player.name}</h2>
              <p>Score: {player.score}</p>
              {player.isOut && <p className="text-red-500">Out</p>}
              <div className="mt-4">
                <h2 className="text-lg mb-2">Player&apos;s Balls</h2>
                <div className="flex gap-4">
                  {player.balls.map((ball, ballIndex) => (
                    <span
                      key={ballIndex}
                      className="border border-white rounded-full px-2 py-1"
                    >
                      {ball}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <button className="mt-2 p-2 bg-teal-700 text-white rounded"  onClick={addPlayer} >Add Player</button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
