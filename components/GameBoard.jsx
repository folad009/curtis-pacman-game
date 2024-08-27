"use client";

import { useEffect, useState } from "react";

const GameBoard = () => {
  const [level, setLevel] = useState(1);
  const [loveSymbols, setLoveSymbols] = useState(5);
  const [collectedSymbols, setCollectedSymbols] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [ghosts, setGhosts] = useState([{ x: 9, y: 9 }]);
  const [loveSymbolPositions, setLoveSymbolPositions] = useState([]);

  const boardSize = 10;

  // Set initial love symbols and ghost positions based on level
  useEffect(() => {
    if (level === 1) {
      setLoveSymbols(5);
    } else if (level === 2) {
      setLoveSymbols(10);
    } else if (level === 3) {
      setLoveSymbols(20);
    }

    // Randomly place love symbols on the board
    const newLoveSymbolPositions = [];
    while (newLoveSymbolPositions.length < loveSymbols) {
      const position = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize),
      };
      if (
        !newLoveSymbolPositions.some(
          (symbol) => symbol.x === position.x && symbol.y === position.y
        )
      ) {
        newLoveSymbolPositions.push(position);
      }
    }
    setLoveSymbolPositions(newLoveSymbolPositions);

    setGhosts([
      { x: 9, y: 9 },
      { x: 0, y: 9 },
      { x: 9, y: 0 },
    ]);
  }, [level, loveSymbols]);

  // Handle player movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      let newPos = { ...playerPosition };

      switch (e.key) {
        case "ArrowUp":
          newPos.y = Math.max(0, playerPosition.y - 1);
          break;
        case "ArrowDown":
          newPos.y = Math.min(boardSize - 1, playerPosition.y + 1);
          break;
        case "ArrowLeft":
          newPos.x = Math.max(0, playerPosition.x - 1);
          break;
        case "ArrowRight":
          newPos.x = Math.min(boardSize - 1, playerPosition.x + 1);
          break;
        default:
          break;
      }

      setPlayerPosition(newPos);
      checkForLoveSymbol(newPos);
      checkForGhostCollision(newPos);
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      setTouchStart({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchEnd = (e) => {
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStart.x;
      const dy = touch.clientY - touchStart.y;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
          // Right swipe
          handleMove("ArrowRight");
        } else {
          // Left swipe
          handleMove("ArrowLeft");
        }
      } else {
        if (dy > 0) {
          // Down swipe
          handleMove("ArrowDown");
        } else {
          // Up swipe
          handleMove("ArrowUp");
        }
      }
    };

    const handleMove = (direction) => {
      let newPos = { ...playerPosition };

      switch (direction) {
        case "ArrowUp":
          newPos.y = Math.max(0, playerPosition.y - 1);
          break;
        case "ArrowDown":
          newPos.y = Math.min(boardSize - 1, playerPosition.y + 1);
          break;
        case "ArrowLeft":
          newPos.x = Math.max(0, playerPosition.x - 1);
          break;
        case "ArrowRight":
          newPos.x = Math.min(boardSize - 1, playerPosition.x + 1);
          break;
        default:
          break;
      }

      setPlayerPosition(newPos);
      checkForLoveSymbol(newPos);
      checkForGhostCollision(newPos);
    };

    let touchStart = { x: 0, y: 0 };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [playerPosition]);

  // Move ghosts
  useEffect(() => {
    const interval = setInterval(moveGhosts, 500);

    return () => clearInterval(interval);
  }, [ghosts]);

  const moveGhosts = () => {
    setGhosts((prevGhosts) =>
      prevGhosts.map((ghost) => {
        const directions = [
          { x: 0, y: -1 },
          { x: 0, y: 1 },
          { x: -1, y: 0 },
          { x: 1, y: 0 },
        ];
        const randomDirection =
          directions[Math.floor(Math.random() * directions.length)];
        let newGhostPos = {
          x: Math.max(0, Math.min(boardSize - 1, ghost.x + randomDirection.x)),
          y: Math.max(0, Math.min(boardSize - 1, ghost.y + randomDirection.y)),
        };

        if (
          newGhostPos.x === playerPosition.x &&
          newGhostPos.y === playerPosition.y
        ) {
          handlePlayerCaught();
          return ghost;
        }

        return newGhostPos;
      })
    );
  };

  const checkForLoveSymbol = (position) => {
    const symbolIndex = loveSymbolPositions.findIndex(
      (symbol) => symbol.x === position.x && symbol.y === position.y
    );

    if (symbolIndex !== -1) {
      setCollectedSymbols(collectedSymbols + 1);
      setLoveSymbolPositions((prev) =>
        prev.filter((_, index) => index !== symbolIndex)
      );

      if (collectedSymbols + 1 === loveSymbols) {
        if (level < 3) {
          setLevel(level + 1);
          setCollectedSymbols(0);
        } else {
          alert("You won the game!");
          setLevel(1);
          setCollectedSymbols(0);
        }
      }
    }
  };

  const checkForGhostCollision = (position) => {
    ghosts.forEach((ghost) => {
      if (ghost.x === position.x && ghost.y === position.y) {
        handlePlayerCaught();
      }
    });
  };

  const handlePlayerCaught = () => {
    alert("You are caught by a ghost! Game over!");
    setLevel(1);
    setCollectedSymbols(0);
    setPlayerPosition({ x: 0, y: 0 });
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div>
        <h1 className="text-2xl font-bold text-center mb-4">Level {level}</h1>
        <p className="text-lg text-center mb-6">
          Love Symbols Collected: {collectedSymbols} / {loveSymbols}
        </p>
      </div>

      <div className="grid grid-cols-10 gap-1 w-full max-w-xl">
        {Array.from({ length: boardSize * boardSize }).map((_, index) => {
          const x = index % boardSize;
          const y = Math.floor(index / boardSize);
          const isPlayerHere = playerPosition.x === x && playerPosition.y === y;
          const isGhostHere = ghosts.some(
            (ghost) => ghost.x === x && ghost.y === y
          );
          const isLoveSymbolHere = loveSymbolPositions.some(
            (symbol) => symbol.x === x && symbol.y === y
          );

          return (
            <div
              key={index}
              className={`w-full aspect-square flex justify-center items-center border-2 border-gray-300 ${
                isPlayerHere
                  ? "bg-blue-500"
                  : isGhostHere
                  ? "bg-red-500"
                  : isLoveSymbolHere
                  ? "bg-yellow-300"
                  : "bg-green-200"
              }`}
            >
              {isPlayerHere && <div className="text-white text-2xl">😀</div>}
              {isGhostHere && <div className="text-white text-2xl">👻</div>}
              {isLoveSymbolHere && (
                <div className="text-red-600 text-2xl">❤️</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;
