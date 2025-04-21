import BotCard from "./BotCard";

function YourBotArmy({ bots, onRelease, onDischarge }) {
  return (
    <div className="your-army">
      <h2>🛡 Your Bot Army</h2>
      <div className="grid">
        {bots.map(bot => (
          <BotCard
            key={bot.id}
            bot={bot}
            onClick={onRelease}
            onDischarge={onDischarge}
          />
        ))}
      </div>
    </div>
  );
}

export default YourBotArmy;
