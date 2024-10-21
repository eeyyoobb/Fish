"use client";
import React from "react";
import styled from "styled-components";

interface Props {
  content: React.ReactNode;
  closeModal: () => void; // Add closeModal prop to close the modal
}

function Modal({ content, closeModal }: Props) {
  return (
    <ModalStyled>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content">{content}</div>
    </ModalStyled>
  );
}

const ModalStyled = styled.div`s
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
    filter: blur(4px);
  }

  .modal-content {
    margin: 0 1rem;
    padding: 2rem;
    position: relative;
    max-width: 630px;
    width: 100%;
    z-index: 100;
    border-radius: 1rem; /* You can customize this if needed */
    background-color:glass;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);

    @media screen and (max-width: 450px) {
      font-size: 90%;
    }
  }
`;

export default Modal;
