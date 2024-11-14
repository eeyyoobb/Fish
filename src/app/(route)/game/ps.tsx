import { useState, useEffect } from "react";

interface Counter {
  id: number;
  count: number;
  isRunning: boolean;
}

export default function CounterApp() {
  const [counters, setCounters] = useState<Counter[]>([
    { id: 1, count: 0, isRunning: false },
  ]);

  const handleStartStop = (id: number) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id
          ? { ...counter, isRunning: !counter.isRunning }
          : counter
      )
    );
  };

  const handleAddCounter = () => {
    const newCounter: Counter = {
      id: Date.now(),
      count: 0,
      isRunning: false,
    };
    setCounters((prevCounters) => [...prevCounters, newCounter]);
  };

  const handleSubtract = (id: number) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id && counter.count > 0
          ? { ...counter, count: counter.count - 1 }
          : counter
      )
    );
  };

  useEffect(() => {
    const intervalIds: NodeJS.Timeout[] = [];

    counters.forEach((counter) => {
      if (counter.isRunning) {
        const intervalTime = 9 * 60 * 1000; // 9 minutes

        const intervalId = setInterval(() => {
          setCounters((prevCounters) =>
            prevCounters.map((c) =>
              c.id === counter.id ? { ...c, count: c.count + 1 } : c
            )
          );
        }, intervalTime);

        intervalIds.push(intervalId);
      }
    });

    return () => {
      intervalIds.forEach((id) => clearInterval(id));
    };
  }, [counters]);

  return (
    <div className="relative flex flex-col items-center p-6 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
      <h1 className="text-3xl font-bold mb-6">Counter App</h1>
      <button
        onClick={handleAddCounter}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mb-4 shadow-lg transition duration-300"
      >
        Add Counter
      </button>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl">
        {counters.map((counter) => (
          <div
            key={counter.id}
            className="bg-white bg-opacity-10 rounded-lg p-6 flex flex-col items-center shadow-md border border-opacity-30 border-white"
          >
            <h2 className="text-xl font-semibold mb-2">Counter {counter.id}</h2>
            <p className="text-2xl font-bold mb-4">Count: {counter.count}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleStartStop(counter.id)}
                className={`px-4 py-2 font-semibold rounded shadow-md transition duration-300 ${
                  counter.isRunning
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {counter.isRunning ? "Stop" : "Start"}
              </button>
              <button
                onClick={() => handleSubtract(counter.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-300"
              >
                Subtract
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
