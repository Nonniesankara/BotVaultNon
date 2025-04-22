// src/components/ThemeToggle.js
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div style={{ textAlign: "right", marginBottom: "1rem" }}>
      <button onClick={toggleTheme}>
        🌗 Switch to {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}

export default ThemeToggle;
