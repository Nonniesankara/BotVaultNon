function BotSpecs({ bot, onBack, onEnlist }) {
  if (!bot) return null;

  const { name, avatar_url, bot_class, health, damage, armor, catchphrase } = bot;

  return (
    <div className="bot-specs">
      <img src={avatar_url} alt={name} />
      <h2>{name}</h2>
      <p>💬 <em>{catchphrase}</em></p>
      <p><strong>Class:</strong> {bot_class}</p>
      <p><strong>Health:</strong> {health}</p>
      <p><strong>Damage:</strong> {damage}</p>
      <p><strong>Armor:</strong> {armor}</p>
      
      <div className="specs-buttons">
        <button onClick={onBack}>← Back</button>
        <button onClick={() => onEnlist(bot)}>+ Enlist</button>
      </div>
    </div>
  );
}

export default BotSpecs;
