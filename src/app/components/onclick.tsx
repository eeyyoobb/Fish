"use client"; // Ensure this is at the top of the file

import React, { useState } from "react";
import Modal from "@/components/Modal";
import Signin from "../(auth)/sign-in/signin";

function Clickme() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button 
        onClick={openModal} 
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Sign In
      </button>

      {modalOpen && (
        <Modal content={<Signin />} closeModal={closeModal} />
      )}
    </div>
  );
}

export default Clickme;
