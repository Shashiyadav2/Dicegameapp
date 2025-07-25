import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface GameState {
  onlineUsers: number;
  totalBet: number;
  timer: string;
  currentCity: string;
  currentNumber: number;
  winAmount: number;
  isGameActive: boolean;
  gamePhase: "waiting" | "spinning" | "won" | "resetting";
}

export interface GameContextType extends GameState {
  startGame: () => void;
  resetGame: () => void;
  setGamePhase: (phase: GameState["gamePhase"]) => void;
  updateTimer: (time: string) => void;
}

const defaultState: GameState = {
  onlineUsers: 123,
  totalBet: 500,
  timer: "00:00:15",
  currentCity: "MUMBAI",
  currentNumber: 2,
  winAmount: 100,
  isGameActive: true,
  gamePhase: "spinning",
};

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(defaultState);

  const startGame = () => {
    console.log("🎲 Starting game...");
    setGameState((prev) => ({
      ...prev,
      isGameActive: true,
      gamePhase: "spinning",
    }));

    setTimeout(() => {
      setGameState((prev) => ({ ...prev, gamePhase: "won" }));
    }, 3000);
  };

  const resetGame = () => {
    console.log("🔄 Resetting game...");
    setGameState((prev) => ({
      ...prev,
      gamePhase: "resetting",
      timer: "00:00:15",
      isGameActive: false,
    }));

    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        gamePhase: "waiting",
        isGameActive: true,
      }));
      console.log("✅ Game reset complete");
    }, 2000);
  };

  const setGamePhase = (phase: GameState["gamePhase"]) => {
    console.log(`🎮 Game phase: ${gameState.gamePhase} → ${phase}`);
    setGameState((prev) => ({ ...prev, gamePhase: phase }));
  };

  const updateTimer = (time: string) => {
    setGameState((prev) => ({ ...prev, timer: time }));
  };

  useEffect(() => {
    if (
      gameState.gamePhase === "spinning" ||
      gameState.gamePhase === "won" ||
      gameState.gamePhase === "resetting"
    ) {
      return;
    }

    const interval = setInterval(() => {
      const [hours, minutes, seconds] = gameState.timer.split(":").map(Number);
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;

      if (totalSeconds > 0) {
        const newTotal = totalSeconds - 1;
        const newHours = Math.floor(newTotal / 3600);
        const newMinutes = Math.floor((newTotal % 3600) / 60);
        const newSeconds = newTotal % 60;

        updateTimer(
          `${newHours.toString().padStart(2, "0")}:${newMinutes
            .toString()
            .padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")}`
        );
      } else if (gameState.gamePhase === "waiting") {
        console.log("⏰ Timer expired, auto-starting game");
        startGame();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.timer, gameState.gamePhase]);

  useEffect(() => {
    if (gameState.gamePhase === "won") {
      console.log("🏆 Displaying win results...");
      const timeout = setTimeout(() => {
        resetGame();
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [gameState.gamePhase]);

  const contextValue: GameContextType = {
    ...gameState,
    startGame,
    resetGame,
    setGamePhase,
    updateTimer,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
