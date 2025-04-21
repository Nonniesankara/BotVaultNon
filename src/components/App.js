import { useEffect, useState } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import SearchBar from "./components/SearchBar";
import SortBar from "./components/SortBar";
import FilterBar from "./components/FilterBar";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filters, setFilters] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);


  useEffect(() => {
    fetch("http://localhost:8001/bots")
      .then((res) => res.json())
      .then(setBots);
  }, []);

  const enlistBot = (bot) => {
    if (!army.find((b) => b.id === bot.id)) {
      setArmy([...army, bot]);
    }
  };

  const releaseBot = (bot) => {
    setArmy(army.filter((b) => b.id !== bot.id));
  };

  const dischargeBot = (id) => {
    fetch(`http://localhost:8001/bots/${id}`, { method: "DELETE" });
    setArmy(army.filter((b) => b.id !== id));
    setBots(bots.filter((b) => b.id !== id));
  };

  const filteredBots = bots
    .filter((bot) =>
      bot.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((bot) =>
      filters.length > 0 ? filters.includes(bot.bot_class) : true
    )
    .sort((a, b) => {
      if (!sortBy) return 0;
      return b[sortBy] - a[sortBy];
    });

    return (
      <div className="App">
        <h1>🤖 Bot Battlr</h1>
        <ThemeToggle />
        {selectedBot ? (
          <BotSpecs
            bot={selectedBot}
            onBack={() => setSelectedBot(null)}
            onEnlist={(bot) => {
              enlistBot(bot);
              setSelectedBot(null);
            }}
          />
        ) : (
          <>
            <SearchBar search={search} setSearch={setSearch} />
            <SortBar sortBy={sortBy} setSortBy={setSortBy} />
            <FilterBar filters={filters} setFilters={setFilters} />
            <YourBotArmy
              bots={army}
              onRelease={releaseBot}
              onDischarge={dischargeBot}
            />
            <BotCollection
              bots={filteredBots}
              onEnlist={(bot) => setSelectedBot(bot)}
            />
          </>
        )}
      </div>
    );
  } // Closing brace for the App function

export default App;
