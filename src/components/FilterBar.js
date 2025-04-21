const classes = ["Support", "Medic", "Assault", "Defender", "Captain", "Witch"];

function FilterBar({ filters, setFilters }) {
  const toggleClass = (cls) => {
    if (filters.includes(cls)) {
      setFilters(filters.filter((f) => f !== cls));
    } else {
      setFilters([...filters, cls]);
    }
  };

  return (
    <div className="filter-bar">
      <label>Filter by class:</label>
      {classes.map((cls) => (
        <label key={cls}>
          <input
            type="checkbox"
            checked={filters.includes(cls)}
            onChange={() => toggleClass(cls)}
          />
          {cls}
        </label>
      ))}
    </div>
  );
}

export default FilterBar;
