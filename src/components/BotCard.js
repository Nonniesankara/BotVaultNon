function BotCard({ bot, onClick, isEnlisted }) {
  if (!bot) return null;

  return (
    <div 
      className={`bot-card ${isEnlisted ? 'enlisted' : ''}`}
      onClick={() => onClick(bot)}
      aria-label={`${bot.name} - ${bot.bot_class}`}
    >
      <img src={bot.avatar_url} alt={bot.name} />
      <h3>{bot.name}</h3>
      <p className="bot-class">{bot.bot_class}</p>
      <p className="catchphrase">"{bot.catchphrase}"</p>
      <div className="bot-stats">
        <span>🏋️‍♂️ {bot.health}</span>
        <span>⚔️ {bot.damage}</span>
        <span>🚀 {bot.armor}</span>
      </div>
    </div>
  );
}

export default BotCard;