import BotCard from "./BotCard";

function BotCollection({ bots, onEnlist }) {
  return (
    <div className="bot-collection">
      <h2>🤖 Bot Vault</h2>
      <div className="grid">
        {bots.map(bot => (
          <BotCard key={bot.id} bot={bot} onClick={onEnlist} />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
