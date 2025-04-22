import { useEffect, useState, useCallback, useMemo } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import BotSpecs from "./components/BotSpecs";
import "./App.css";

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bots with error handling
  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch("http://localhost:8001/bots");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setBots(data);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBots();
  }, []);

  // Enlist bot with duplicate check
  const enlistBot = useCallback((bot) => {
    setArmy(prevArmy => 
      prevArmy.some(b => b.id === bot.id) 
        ? prevArmy 
        : [...prevArmy, bot]
    );
  }, []);

  // Discharge bot with API sync
  const dischargeBot = useCallback(async (id) => {
    try {
      await fetch(`http://localhost:8001/bots/${id}`, { method: "DELETE" });
      setArmy(prev => prev.filter(bot => bot.id !== id));
      setBots(prev => prev.filter(bot => bot.id !== id));
    } catch (err) {
      console.error("Discharge failed:", err);
    }
  }, []);

  return (
    <div className="App">
      <h1>🤖 Bot Battlr</h1>
      
      {loading ? (
        <div className="loading">Loading bots...</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : selectedBot ? (
        <BotSpecs 
          bot={selectedBot}
          onBack={() => setSelectedBot(null)}
          onEnlist={enlistBot}
        />
      ) : (
        <>
          <YourBotArmy
            bots={army}
            onRelease={(bot) => setArmy(prev => prev.filter(b => b.id !== bot.id))}
            onDischarge={dischargeBot}
          />
          <BotCollection
            bots={bots}
            onEnlist={(bot) => setSelectedBot(bot)}
          />
        </>
      )}
    </div>
  );
}

export default App;