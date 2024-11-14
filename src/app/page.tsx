"use client";

import { useState, useEffect, useRef } from "react";
import Pool from "./(route)/game/pool";
import Ps from "./(route)/game/ps";

function Page() {
  const [activeModal, setActiveModal] = useState<string | null>(null); // 'pool' or 'ps' or null
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleOpenModal = (modalType: string) => {
    setActiveModal(modalType); // Set modal type to display (pool or ps)
  };

  const closeModal = () => {
    setActiveModal(null); // Close any open modal
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    // Add event listener for clicks outside the modal
    if (activeModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [activeModal]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-x-4 items-center">
        <div className="pool"></div>
        <span className="burn">Game Utils</span>
      </div>

      {/* Open modal buttons */}
      <button 
        onClick={() => handleOpenModal("pool")} 
        className="bg-gradient-to-r from-blue-400 via-yellow-500 to-red-600 rounded-md p-1 border border-white border-y-4 border-x-0 m-2 text-green-700">
        Straight Ball
      </button>
      <button 
        onClick={() => handleOpenModal("ps")}
        className="bg-gradient-to-r from-blue-400 via-yellow-500 to-red-600 rounded-md p-1 border border-white border-y-4 border-x-0 m-2 text-green-700">
        Countor
      </button>

      {/* Modal for the selected Game component */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div ref={modalRef} className="glass rounded-lg p-4 relative w-3/4 md:w-1/2 lg:w-1/3">
            <button 
              onClick={closeModal} 
              className="absolute top-2 right-2 text-red-600 hover:text-red-800">
              X
            </button>
            
            {/* Conditionally render either Pool or Ps based on activeModal */}
            {activeModal === "pool" && <Pool />}
            {activeModal === "ps" && <Ps />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
