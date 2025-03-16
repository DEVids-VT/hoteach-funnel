import React from "react";

const FlameButton: React.FC = () => {
  const handleClick = () => {
    window.location.href = "https://app.hoteach.com";
  };

  return (
    <button
      onClick={handleClick}
      className="bg-hotteach-yellow text-hotteach-dark hover:shadow-lg hover:brightness-105 px-4 py-2 rounded-lg transition-all duration-300 ease-out"
    >
      Go to Dashboard
    </button>
  );
};

export default FlameButton;
