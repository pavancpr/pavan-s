import React from "react";
import "./App.css";
import GameCard from "./components/GameCard";

const App = () => {
  const games = [
    {
      id: 1,
      title: "Bloxd.io",
      image: "https://via.placeholder.com/300x180?text=Bloxd.io",
      description: "Build and play in an open world adventure.",
    },
    {
      id: 2,
      title: "Crazy Cars",
      image: "https://via.placeholder.com/300x180?text=Crazy+Cars",
      description: "Fast-paced car racing challenge!",
    },
    {
      id: 3,
      title: "Battle Royale",
      image: "https://via.placeholder.com/300x180?text=Battle+Royale",
      description: "Survive and become the last one standing.",
    },
    {
      id: 4,
      title: "Hole.io",
      image: "https://via.placeholder.com/300x180?text=Hole.io",
      description: "Swallow everything in sight!",
    },
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <h1>🎮 Online Gaming Platform</h1>
        <p>Play fun games instantly — no download needed!</p>
      </header>

      {/* Games Section */}
      <section className="games-section">
        <div className="games-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 GameZone | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default App;
import React from "react";

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <img src={game.image} alt={game.title} className="game-image" />
      <h3>{game.title}</h3>
      <p>{game.description}</p>
      <button className="play-button">▶ Play</button>
    </div>
  );
};

export default GameCard;
/* ========== GLOBAL RESET ========== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

/* ========== MAIN DASHBOARD ========== */
.dashboard {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #1b1b2f, #16213e);
  color: #fff;
}

/* ========== HEADER ========== */
.header {
  text-align: center;
  padding: 2rem 1rem;
  background: linear-gradient(90deg, #007bff, #00d4ff);
  color: white;
}
.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}
.header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

/* ========== GAMES GRID ========== */
.games-section {
  flex: 1;
  padding: 2rem;
}
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

/* ========== GAME CARD ========== */
.game-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}
.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
}
.game-image {
  width: 100%;
  height: 180px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 1rem;
}
.game-card h3 {
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}
.game-card p {
  font-size: 0.95rem;
  margin-bottom: 1rem;
  color: #ddd;
}

/* ========== PLAY BUTTON ========== */
.play-button {
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  transition: background 0.3s ease;
}
.play-button:hover {
  background: #45a049;
}

/* ========== FOOTER ========== */
.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .games-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .dashboard {
    padding: 1rem;
  }
}
