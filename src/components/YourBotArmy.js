import { useState } from "react";
import BotCard from "./BotCard";

function YourBotArmy({ bots, onRelease, onDischarge }) {
  const [confirmingId, setConfirmingId] = useState(null);

  const handleDischarge = (id) => {
    onDischarge(id);
    setConfirmingId(null);
  };

  // Calculate army stats
  const stats = bots.reduce((acc, bot) => ({
    health: acc.health + bot.health,
    damage: acc.damage + bot.damage,
    armor: acc.armor + bot.armor,
    count: acc.count + 1
  }), { health: 0, damage: 0, armor: 0, count: 0 });

  return (
    <div className="army-container">
      <div className="army-header">
        <h2>🛡 Your Bot Army</h2>
        {bots.length > 0 && (
          <div className="army-stats">
            <span>Bots: {stats.count}</span>
            <span>❤️ {stats.health}</span>
            <span>⚔️ {stats.damage}</span>
            <span>🛡 {stats.armor}</span>
          </div>
        )}
      </div>

      {bots.length === 0 ? (
        <div className="empty-army">
          <p>Your army is empty!</p>
          <p>Click on bots in the vault to enlist them.</p>
        </div>
      ) : (
        <div className="army-grid">
          {bots.map(bot => (
            <div key={bot.id} className="army-bot">
              <BotCard 
                bot={bot} 
                onClick={onRelease}
                isEnlisted
              />
              <button 
                className="discharge-btn"
                onClick={() => setConfirmingId(bot.id)}
              >
                Discharge
              </button>
              
              {confirmingId === bot.id && (
                <div className="confirmation-dialog">
                  <p>Remove this bot?</p>
                  <button onClick={() => handleDischarge(bot.id)}>Yes</button>
                  <button onClick={() => setConfirmingId(null)}>No</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default YourBotArmy;