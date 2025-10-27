import { useState } from "react";

function eventDemo() {
  const [visible, setVisible] = useState(true);

  function greetUser(name) {
    alert(`Hello, ${name}!`);
  }

  function toggleImage() {
    setVisible(!visible);
  }

  return (
    <div>
      <h1>React Events Demo</h1>

      <button onClick={() => greetUser("Shivam")}>Greet</button>
      <button onDoubleClick={() => alert("Double Click Detected!")}>
        Double Click Me
      </button>

      <div style={{ marginTop: "20px" }}>
        {visible && (
          <img
            src="https://i.pravatar.cc/150?img=5"
            alt="Profile"
            style={{ width: "150px", borderRadius: "50%" }}
          />
        )}
        <br />
        <button onClick={toggleImage}>
          {visible ? "Hide" : "Show"} Image
        </button>
      </div>
    </div>
  );
}

export default eventDemo;
