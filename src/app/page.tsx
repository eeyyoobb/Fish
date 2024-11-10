"use client";

import { useState, useEffect, useRef } from "react";
import Game from "./(route)/game/page";

function Page() {
  const [showGame, setShowGame] = useState(false); // State to manage visibility
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setShowGame((prev) => !prev); // Toggle visibility of the Game component
  };

  const closeModal = () => {
    setShowGame(false); // Function to close the modal
  };



  useEffect(() => {

    const handleOutsideClick = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          closeModal(); 
        }
      };
    // Add event listener for clicks outside the modal
    if (showGame) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showGame]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-x-4 items-center">
        <div className="pool"></div>
        <span className="burn">Game Utils</span>
      </div>
      <button 
        onClick={handleClick} 
        className="bg-gradient-to-r from-blue-400 via-yellow-500 to-red-600 rounded-md p-1 border border-white border-y-4 border-x-0 m-2 text-green-700">
        Straight Ball
      </button>

      {/* Modal for the Game component */}
      {showGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div ref={modalRef} className="glass rounded-lg p-4 relative w-3/4 md:w-1/2 lg:w-1/3">
            <button 
              onClick={closeModal} 
              className="absolute top-2 right-2 text-red-600 hover:text-red-800">
              X
            </button>
            <Game />
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
