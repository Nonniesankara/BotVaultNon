import BotCard from "./BotCard";
import { useState } from "react";

function BotCollection({ bots, onEnlist }) {
  const [hoveredBot, setHoveredBot] = useState(null);

  // Handle empty state
  if (bots.length === 0) {
    return (
      <div className="bot-collection">
        <h2>🤖 Bot Vault</h2>
        <div className="empty-state">
          <p>No bots found matching your criteria!</p>
          <button onClick={() => window.location.reload()}>Reset Filters</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bot-collection">
      <div className="collection-header">
        <h2>🤖 Bot Vault</h2>
        <p className="bot-count">{bots.length} {bots.length === 1 ? 'bot' : 'bots'} available</p>
      </div>
      
      <div className="grid">
        {bots.map(bot => (
          <div 
            key={bot.id} 
            className={`grid-item ${hoveredBot === bot.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredBot(bot.id)}
            onMouseLeave={() => setHoveredBot(null)}
          >
            <BotCard 
              bot={bot} 
              onClick={onEnlist} 
              isHighlighted={hoveredBot === bot.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BotCollection;