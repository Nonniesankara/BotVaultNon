function BotCard({ bot, onClick, onDischarge }) {
  const { name, avatar_url, bot_class, health, damage, armor, catchphrase } = bot;

  return (
    <div className="bot-card" onClick={() => onClick(bot)}>
      <img src={avatar_url} alt={name} />
      <h3>{name}</h3>
      <p>{bot_class}</p>
      <p><em>{catchphrase}</em></p>
      <p>❤️ {health} ⚔️ {damage} 🛡 {armor}</p>
      {onDischarge && (
        <button onClick={(e) => {
          e.stopPropagation();
          onDischarge(bot.id);
        }}>🗑 Discharge</button>
      )}
    </div>
  );
}

export default BotCard;
