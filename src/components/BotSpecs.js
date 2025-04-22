function BotSpecs({ bot, onBack, onEnlist }) {
  if (!bot) return null;

  const { name, avatar_url, bot_class, health, damage, armor, catchphrase } = bot;

  // Calculate bot power level (example calculation)
  const powerLevel = Math.round((health + damage * 2 + armor) / 3);

  // Get class-specific styling
  const getClassColor = () => {
    const classColors = {
      Support: 'support',
      Medic: 'medic',
      Assault: 'assault',
      Defender: 'defender',
      Captain: 'captain',
      Witch: 'witch'
    };
    return classColors[bot_class] || '';
  };

  return (
    <div className={`bot-specs ${getClassColor()}`}>
      <div className="specs-header">
        <button className="back-button" onClick={onBack}>
          &larr; Back to Collection
        </button>
        <h2>{name}</h2>
        <div className="bot-class">{bot_class}</div>
      </div>

      <div className="specs-body">
        <div className="specs-image">
          <img 
            src={avatar_url} 
            alt={name} 
            onError={(e) => {
              e.target.src = 'default-bot.png';
              e.target.onerror = null;
            }}
          />
          <p className="catchphrase">"{catchphrase}"</p>
        </div>

        <div className="specs-stats">
          <div className="stat-bar">
            <span className="stat-label">Health:</span>
            <progress value={health} max="100"></progress>
            <span>{health}</span>
          </div>
          <div className="stat-bar">
            <span className="stat-label">Damage:</span>
            <progress value={damage} max="100"></progress>
            <span>{damage}</span>
          </div>
          <div className="stat-bar">
            <span className="stat-label">Armor:</span>
            <progress value={armor} max="100"></progress>
            <span>{armor}</span>
          </div>
          
          <div className="power-level">
            <span>Power Level:</span>
            <div className="level-badge">{powerLevel}</div>
          </div>
        </div>
      </div>

      <div className="specs-actions">
        <button 
          className="enlist-button"
          onClick={() => onEnlist(bot)}
        >
          Enlist to Army
        </button>
      </div>
    </div>
  );
}

export default BotSpecs;