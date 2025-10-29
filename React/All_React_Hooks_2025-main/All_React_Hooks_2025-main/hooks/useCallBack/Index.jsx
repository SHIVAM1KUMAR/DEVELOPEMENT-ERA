import React, { useState, useCallback } from "react";
import Button from "./Button";

const Index = () => {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Function gets recreated on every render
  //   const handleClick = () => setCount(count + 1);

  // Memoizing handleClick function using useCallback
  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div
      style={{
        background: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#333",
      }}
    >
      <h1>count :{count}</h1>

      {/* rendering button component */}
      <Button onClick={handleClick} />

      <button onClick={() => setDarkMode(!darkMode)}>Toggle Theme</button>
    </div>
  );
};

export default Index;
