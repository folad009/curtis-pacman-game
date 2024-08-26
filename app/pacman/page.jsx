"use client";
import { useState } from "react";
import GameBoard from "@/components/GameBoard";

// Modal component for displaying an audio prompt
const Modal = ({ showModal, handleClose }) => {
  if (!showModal) return null; // Only render the modal if showModal is true

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Listen to this audio</h2>
        <audio controls autoPlay className="w-full mb-4">
          <source src="/audio/speech_20240727192849078.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <button
          onClick={handleClose}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

const Pacman = () => {
  const [showModal, setShowModal] = useState(true); // State to control the visibility of the modal

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal showModal={showModal} handleClose={handleCloseModal} />
      <div className="flex flex-wrap w-full">
        {/* Left section for instructions and branding */}
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
            <a href="#" className="p-4 text-xl font-bold text-white bg-black">
              2020 Game Console.
            </a>
          </div>
          <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <h3 className="text-3xl text-center">Instructions</h3>
            <p className="text-center mt-4">Your game instructions go here.</p>
          </div>
        </div>

        {/* Right section for the game board */}
        <div className="w-full md:w-1/2 shadow-2xl p-10">
          <GameBoard />
        </div>
      </div>
    </>
  );
};

export default Pacman;
